"use client";
import {
  Canvas,
  useFrame,
  useThree,
  type ThreeEvent,
} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlType } from "three-stdlib";
type Props = {
  selected: number;
  onSelect: (n: number) => void;
  active: boolean;
  reduced: boolean;
  reset: number;
  onReady: () => void;
  onFailure: () => void;
  onSecret: () => void;
};
const positions: [number, number, number][] = [
  [-3.7, -1, 1.1],
  [3.3, -0.7, 0.4],
  [2.4, 0.2, -2.8],
  [-2.5, 0.6, -2.7],
];
const planetVertex = `varying vec3 vNormal; varying vec3 vPosition; void main(){vNormal=normalize(normalMatrix*normal);vPosition=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const planetFragment = `varying vec3 vNormal; varying vec3 vPosition;
void main(){ vec3 p=vPosition; float terrain=sin(p.x*9.+sin(p.z*11.))*sin(p.y*12.+cos(p.x*7.))+sin(p.z*19.+p.y*7.)*.35; float land=smoothstep(.12,.48,terrain); float light=max(dot(normalize(vNormal),normalize(vec3(-.7,.7,1.))),0.); float rim=pow(1.-max(dot(normalize(vNormal),vec3(0.,0.,1.)),0.),3.); vec3 sea=vec3(.018,.07,.13); vec3 ground=vec3(.13,.25,.31); vec3 color=mix(sea,ground,land)*(.25+light*1.5); float lines=pow(.5+.5*sin(terrain*27.),18.); color+=vec3(.19,.46,.57)*lines*land*.3; color+=vec3(.29,.67,1.)*rim*.9; gl_FragColor=vec4(color,1.);}`;
function World(props: Props) {
  const globe = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const controls = useRef<OrbitControlType>(null);
  const { camera, gl, invalidate } = useThree();
  const transition = useRef(0);
  const cameraTarget = useRef(new THREE.Vector3(0, 2.2, 10.5));
  const starPositions = useMemo(() => {
    const array = new Float32Array(600 * 3);
    let seed = 73;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 600; i++) {
      array[i * 3] = (random() - 0.5) * 65;
      array[i * 3 + 1] = (random() - 0.2) * 35;
      array[i * 3 + 2] = -8 - random() * 30;
    }
    return array;
  }, []);
  useEffect(() => {
    const angle = [0.12, -0.22, -0.55, 0.5][props.selected];
    cameraTarget.current.set(
      Math.sin(angle) * 10.5,
      2.2,
      Math.cos(angle) * 10.5,
    );
    transition.current = props.reduced ? 0 : 1;
    if (props.reduced) {
      camera.position.copy(cameraTarget.current);
      controls.current?.update();
    }
    invalidate();
  }, [props.selected, props.reset, props.reduced, camera, invalidate]);
  useEffect(() => {
    props.onReady();
    const canvas = gl.domElement;
    const lost = (e: Event) => {
      e.preventDefault();
      props.onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
    // The callbacks report the initial renderer lifecycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl]);
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (props.active) {
      if (globe.current) globe.current.rotation.y += dt * 0.065;
      if (rings.current) rings.current.rotation.z += dt * 0.035;
    }
    if (transition.current > 0.005) {
      camera.position.lerp(cameraTarget.current, 1 - Math.exp(-dt * 3));
      transition.current *= Math.exp(-dt * 3);
      controls.current?.update();
      invalidate();
    }
  });
  function select(e: ThreeEvent<MouseEvent>, index: number) {
    e.stopPropagation();
    props.onSelect(index);
  }
  return (
    <>
      <color attach="background" args={["#080e19"]} />
      <fog attach="fog" args={["#080e19", 18, 45]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[-5, 8, 5]} intensity={3} color="#a4d8ff" />
      <pointLight position={[3, 2, 4]} intensity={35} color="#b9e7ff" />
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#c7dbed"
          size={0.035}
          transparent
          opacity={0.75}
          sizeAttenuation
        />
      </points>
      <group position={[0.5, 0.35, 0]}>
        <group ref={globe}>
          <mesh>
            <sphereGeometry args={[1.65, 64, 40]} />
            <shaderMaterial
              vertexShader={planetVertex}
              fragmentShader={planetFragment}
            />
          </mesh>
          <mesh rotation={[0.1, 0.2, 0.4]}>
            <sphereGeometry args={[1.68, 24, 16]} />
            <meshBasicMaterial
              color="#92ceff"
              wireframe
              transparent
              opacity={0.035}
            />
          </mesh>
        </group>
        <group ref={rings} rotation={[0.45, 0, -0.25]}>
          {[0, 1, 2].map((i) => (
            <group key={i} rotation={[Math.PI / 2 + i * 0.35, i * 0.5, 0]}>
              <mesh>
                <torusGeometry args={[2.15 + i * 0.27, 0.012, 8, 160]} />
                <meshBasicMaterial color={i === 1 ? "#d5f575" : "#99d9ff"} />
              </mesh>
              <mesh>
                <torusGeometry args={[2.15 + i * 0.27, 0.05, 8, 160]} />
                <meshBasicMaterial color="#7fc7ff" transparent opacity={0.07} />
              </mesh>
            </group>
          ))}
        </group>
        <mesh position={[2.1, 1.7, -1.5]} onClick={props.onSecret}>
          <icosahedronGeometry args={[0.32, 2]} />
          <meshStandardMaterial
            color="#b3cbd9"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      </group>
      <group position={[0, -2.2, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[8, 96]} />
          <meshStandardMaterial
            color="#101e2d"
            metalness={0.8}
            roughness={0.4}
          />
        </mesh>
        {[2.4, 3.4, 5.3, 7].map((r, i) => (
          <mesh
            key={r}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.015, 0]}
          >
            <torusGeometry args={[r, i === 2 ? 0.018 : 0.008, 6, 128]} />
            <meshBasicMaterial color={i === 2 ? "#b8d969" : "#29445b"} />
          </mesh>
        ))}
        <mesh position={[0.5, 0.12, 0]}>
          <cylinderGeometry args={[1.35, 1.6, 0.24, 64]} />
          <meshStandardMaterial
            color="#233448"
            metalness={0.75}
            roughness={0.3}
          />
        </mesh>
      </group>
      {positions.map((position, i) => (
        <group
          key={i}
          position={position}
          onClick={(e) => select(e, i)}
          onPointerOver={() => {
            gl.domElement.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            gl.domElement.style.cursor = "grab";
          }}
        >
          <mesh>
            <cylinderGeometry args={[0.55, 0.7, 0.18, 6]} />
            <meshStandardMaterial
              color={props.selected === i ? "#b6d36a" : "#31465b"}
              metalness={0.65}
              roughness={0.35}
            />
          </mesh>
          <mesh position={[0, 0.48, 0]} rotation={[0, Math.PI / 4, 0]}>
            <octahedronGeometry args={[props.selected === i ? 0.32 : 0.23]} />
            <meshStandardMaterial
              color={props.selected === i ? "#d5f575" : "#9bd4f8"}
              emissive={props.selected === i ? "#b5e65a" : "#38759c"}
              emissiveIntensity={0.65}
              metalness={0.4}
              roughness={0.25}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}>
            <ringGeometry args={[0.7, 0.72, 48]} />
            <meshBasicMaterial
              color={props.selected === i ? "#d5f575" : "#53758c"}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
      <OrbitControls
        ref={controls}
        makeDefault
        target={[0.3, -0.15, 0]}
        enableZoom={false}
        enablePan={false}
        enableDamping={!props.reduced}
        dampingFactor={0.07}
        rotateSpeed={0.45}
        minPolarAngle={0.8}
        maxPolarAngle={1.65}
        minAzimuthAngle={-0.85}
        maxAzimuthAngle={0.85}
        onStart={() => {
          transition.current = 0;
        }}
      />
    </>
  );
}
export default function Observatory(props: Props) {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 10.5], fov: 43 }}
      dpr={[1, 1.5]}
      frameloop={props.active ? "always" : "demand"}
      gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}
      fallback={null}
    >
      <World {...props} />
    </Canvas>
  );
}
