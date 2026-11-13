"use client";
import { useEffect, useRef, useState } from "react";
import {
  STATIONS,
  START,
  moveOnDeck,
  nearestStation,
} from "@/lib/station-state";
import { usePrefersReducedMotion } from "@/hooks/useReveal";
import { teleportTo } from "@/lib/teleport";
import * as THREE from "three";

export default function WalkableStation() {
  const host = useRef<HTMLDivElement>(null),
    keys = useRef(new Set<string>()),
    target = useRef<number | null>(null),
    jump = useRef(false),
    reset = useRef(false),
    paused = useRef(false);
  const [position, setPosition] = useState({ x: 0, z: 5 }),
    [near, setNear] = useState(-1),
    [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false),
    [still, setStill] = useState(false);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      const failure = requestAnimationFrame(() => setFailed(true));
      return () => cancelAnimationFrame(failure);
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(48, 1, 0.1, 180);
    const ivory = new THREE.MeshStandardMaterial({
        color: 0xf6f5f1,
        metalness: 0.35,
        roughness: 0.3,
      }),
      dark = new THREE.MeshStandardMaterial({
        color: 0x172137,
        metalness: 0.8,
        roughness: 0.28,
      }),
      gold = new THREE.MeshStandardMaterial({
        color: 0xffc83d,
        metalness: 0.65,
        roughness: 0.3,
      }),
      glow = new THREE.MeshStandardMaterial({
        color: 0xffc83d,
        emissive: 0xffaa22,
        emissiveIntensity: 3,
      }),
      glass = new THREE.MeshStandardMaterial({
        color: 0x07132b,
        metalness: 1,
        roughness: 0.08,
      });
    function mesh(
      g: THREE.BufferGeometry,
      m: THREE.Material,
      p: THREE.Object3D,
      x = 0,
      y = 0,
      z = 0,
    ) {
      const o = new THREE.Mesh(g, m);
      o.position.set(x, y, z);
      o.castShadow = true;
      o.receiveShadow = true;
      p.add(o);
      return o;
    }
    function box(
      p: THREE.Object3D,
      m: THREE.Material,
      x: number,
      y: number,
      z: number,
      w: number,
      h: number,
      d: number,
    ) {
      return mesh(new THREE.BoxGeometry(w, h, d), m, p, x, y, z);
    }
    function ring(p: THREE.Object3D, r: number, y: number, m = glow) {
      const o = mesh(new THREE.TorusGeometry(r, 0.035, 8, 96), m, p, 0, y, 0);
      o.rotation.x = Math.PI / 2;
      return o;
    }
    scene.add(new THREE.HemisphereLight(0xb6d5ff, 0x302044, 3));
    const sun = new THREE.DirectionalLight(0xffe2ba, 4);
    sun.position.set(-6, 12, 9);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, {
      left: -15,
      right: 15,
      top: 15,
      bottom: -15,
    });
    scene.add(sun);
    const blue = new THREE.DirectionalLight(0x628fff, 3);
    blue.position.set(8, 6, -8);
    scene.add(blue);
    mesh(
      new THREE.CylinderGeometry(13, 13.6, 0.7, 96),
      dark,
      scene,
      0,
      -0.4,
      0,
    );
    [2.8, 6, 10, 12.7].forEach((r) => ring(scene, r, 0.02));
    for (let i = 0; i < 48; i++) {
      const a = (i * Math.PI) / 24;
      const panel = box(
        scene,
        i % 3 === 0 ? gold : ivory,
        Math.sin(a) * 12.8,
        0.18,
        Math.cos(a) * 12.8,
        0.4,
        0.3,
        1.2,
      );
      panel.rotation.y = a;
      const seam = box(
        scene,
        dark,
        Math.sin(a) * 8,
        0.015,
        Math.cos(a) * 8,
        0.035,
        0.03,
        8,
      );
      seam.rotation.y = a;
    }
    const portalSurfaces: THREE.Mesh[] = [];
    STATIONS.forEach((s, i) => {
      const g = new THREE.Group();
      g.position.set(s.x, 0, s.z);
      scene.add(g);
      mesh(new THREE.CylinderGeometry(1.4, 1.6, 0.16, 32), gold, g, 0, 0.03, 0);
      ring(g, 1.25, 0.14);
      const color = [0x57d9ff, 0xffba57, 0xb28aff, 0x6dffba][i];
      const rim = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 2,
      });
      mesh(new THREE.TorusGeometry(1.35, 0.12, 12, 64), gold, g, 0, 1.5, 0);
      mesh(new THREE.TorusGeometry(1.2, 0.045, 8, 64), rim, g, 0, 1.5, 0.03);
      const surface = mesh(
        new THREE.CircleGeometry(1.17, 64),
        new THREE.ShaderMaterial({
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
          uniforms: {
            time: { value: 0 },
            tint: { value: new THREE.Color(color) },
          },
          vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
          fragmentShader: `varying vec2 vUv; uniform float time; uniform vec3 tint;
        void main(){vec2 p=vUv-.5;float r=length(p);float a=atan(p.y,p.x);float swirl=.5+.5*sin(r*42.-a*3.-time*2.);float edge=smoothstep(.28,.5,r);gl_FragColor=vec4(tint*(.35+swirl*.65+edge),.65+edge*.3);}`,
        }),
        g,
        0,
        1.5,
        0,
      );
      surface.castShadow = false;
      portalSurfaces.push(surface);
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 128;
      const c = canvas.getContext("2d")!;

      c.fillStyle = "#ffc83d";
      c.font = "bold 58px sans-serif";
      c.textAlign = "center";
      c.fillText(s.name, 256, 83);
      const tex = new THREE.CanvasTexture(canvas);
      const sign = mesh(
        new THREE.PlaneGeometry(2.5, 0.625),
        new THREE.MeshBasicMaterial({
          map: tex,
          side: THREE.DoubleSide,
          transparent: true,
        }),
        g,
        0,
        3.2,
        0,
      );
      sign.name = `station-${i}`;
    });
    const astronaut = new THREE.Group();
    scene.add(astronaut);
    mesh(
      new THREE.CapsuleGeometry(0.36, 0.55, 6, 16),
      ivory,
      astronaut,
      0,
      1,
      0,
    );
    mesh(new THREE.SphereGeometry(0.57, 32, 24), ivory, astronaut, 0, 1.9, 0);
    const visor = mesh(
      new THREE.SphereGeometry(0.48, 32, 24),
      glass,
      astronaut,
      0,
      1.92,
      0.23,
    );
    visor.scale.set(1, 0.78, 0.75);
    box(astronaut, gold, 0, 1.1, -0.4, 0.66, 0.8, 0.3);
    const legs = [-1, 1].map((side) => {
      const g = new THREE.Group();
      g.position.set(side * 0.21, 0.75, 0);
      astronaut.add(g);
      mesh(new THREE.CapsuleGeometry(0.16, 0.32, 4, 12), ivory, g, 0, -0.25, 0);
      box(g, dark, 0, -0.62, 0.1, 0.34, 0.2, 0.5);
      return g;
    });
    const arms = [-1, 1].map((side) => {
      const g = new THREE.Group();
      g.position.set(side * 0.43, 1.35, 0);
      astronaut.add(g);
      mesh(new THREE.CapsuleGeometry(0.13, 0.35, 4, 12), ivory, g, 0, -0.22, 0);
      mesh(new THREE.SphereGeometry(0.14, 12, 8), gold, g, 0, -0.5, 0);
      mesh(
        new THREE.CylinderGeometry(0.16, 0.16, 0.1, 16),
        gold,
        astronaut,
        side * 0.57,
        1.9,
        0,
      ).rotation.z = Math.PI / 2;
      return g;
    });
    const planet = mesh(
      new THREE.SphereGeometry(2.5, 48, 32),
      new THREE.MeshStandardMaterial({
        color: 0x4388ba,
        metalness: 0.9,
        roughness: 0.18,
      }),
      scene,
      -10,
      6,
      -10,
    );
    const orbit = mesh(
      new THREE.TorusGeometry(3.5, 0.035, 8, 96),
      glow,
      scene,
      -10,
      6,
      -10,
    );
    orbit.rotation.x = 1.1;
    const portal = mesh(
      new THREE.TorusGeometry(3, 0.24, 12, 64),
      gold,
      scene,
      10,
      4,
      -9,
    );
    mesh(new THREE.TorusGeometry(2.7, 0.06, 8, 64), glow, scene, 10, 4, -8.9);
    let disposed = false;
    const skyWorld = new THREE.Group();
    scene.add(skyWorld);
    const sky = new THREE.TextureLoader().load("/orbital/nebula.png", (t) => {
      if (disposed) {
        t.dispose();
        return;
      }
      t.colorSpace = THREE.SRGBColorSpace;
      const skyMesh = new THREE.Mesh(
        new THREE.SphereGeometry(85, 48, 32),
        new THREE.MeshBasicMaterial({ map: t, side: THREE.BackSide }),
      );
      skyWorld.add(skyMesh);
    });
    let x = START.x,
      z = START.z,
      height = 0,
      velocity = 0,
      frame = 0,
      last = 0,
      tick = 0,
      visible = true,
      yaw = 0,
      dragX: number | null = null;
    let portalArmed = true;
    const look = new THREE.Vector3(),
      desired = new THREE.Vector3();
    function size() {
      const w = el!.clientWidth,
        h = el!.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    const resize = new ResizeObserver(size);
    resize.observe(el);
    size();
    function down(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLElement &&
        e.target.closest("input,textarea,button,a")
      )
        return;
      if (
        [
          "KeyW",
          "KeyA",
          "KeyS",
          "KeyD",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "Space",
        ].includes(e.code)
      ) {
        e.preventDefault();
        keys.current.add(e.code);
        if (e.code === "Space" && !e.repeat) jump.current = true;
      }
    }
    const up = (e: KeyboardEvent) => keys.current.delete(e.code),
      clear = () => {
        keys.current.clear();
        dragX = null;
      };
    el.addEventListener("keydown", down);
    el.addEventListener("keyup", up);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    const drag = (e: PointerEvent) => {
      if (dragX !== null) {
        yaw += (e.clientX - dragX) * 0.004;
        dragX = e.clientX;
      }
    };
    const start = (e: PointerEvent) => {
      el.focus();
      dragX = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    el.addEventListener("pointerdown", start);
    el.addEventListener("pointermove", drag);
    el.addEventListener("pointerup", clear);
    el.addEventListener("pointercancel", clear);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) clear();
    });
    observer.observe(el);
    const lost = (e: Event) => {
      e.preventDefault();
      setFailed(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    function animate(now: number) {
      frame = requestAnimationFrame(animate);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden) return;
      if (reset.current) {
        x = START.x;
        z = START.z;
        height = 0;
        velocity = 0;
        yaw = 0;
        target.current = null;
        reset.current = false;
      }
      let dx = 0,
        dz = 0;
      if (!paused.current) {
        dx =
          Number(keys.current.has("KeyD") || keys.current.has("ArrowRight")) -
          Number(keys.current.has("KeyA") || keys.current.has("ArrowLeft"));
        dz =
          Number(keys.current.has("KeyS") || keys.current.has("ArrowDown")) -
          Number(keys.current.has("KeyW") || keys.current.has("ArrowUp"));
        if (dx || dz) target.current = null;
        if (target.current !== null) {
          const s = STATIONS[target.current],
            distance = Math.hypot(s.x - x, s.z - z);
          if (distance < 0.12) target.current = null;
          else {
            dx = (s.x - x) / distance;
            dz = (s.z - z) / distance;
          }
        }
        const next = moveOnDeck(x, z, dx, dz, dt);
        x = next.x;
        z = next.z;
        if (jump.current && height === 0) velocity = 5;
        jump.current = false;
        velocity -= 12 * dt;
        height = Math.max(0, height + velocity * dt);
        if (height === 0) velocity = 0;
      }
      const entered = STATIONS.findIndex(
        (s) => Math.hypot(s.x - x, s.z - z) < 0.8,
      );
      if (entered < 0) portalArmed = true;
      if (entered >= 0 && portalArmed && !paused.current) {
        portalArmed = false;
        target.current = null;
        keys.current.clear();
        void teleportTo(STATIONS[entered].id);
        x = START.x;
        z = START.z;
        height = 0;
        velocity = 0;
      }
      astronaut.position.set(x, height, z);
      if (dx || dz) astronaut.rotation.y = Math.atan2(dx, dz);
      const stride = (dx || dz) && !reduced ? Math.sin(now * 0.012) * 0.5 : 0;
      legs.forEach((l, i) => (l.rotation.x = stride * (i ? 1 : -1)));
      arms.forEach((l, i) => (l.rotation.x = stride * (i ? -1 : 1)));
      if (!reduced && !paused.current) {
        planet.rotation.y += dt * 0.08;
        skyWorld.rotation.y += dt * 0.018;
        skyWorld.rotation.z += dt * 0.002;
        portalSurfaces.forEach((p) => {
          (p.material as THREE.ShaderMaterial).uniforms.time.value += dt;
        });
        portal.rotation.z += dt * 0.05;
      }
      desired.set(
        x * 0.5 + Math.sin(yaw) * 18,
        8,
        z * 0.35 + Math.cos(yaw) * 18,
      );
      if (reduced || !tick) camera.position.copy(desired);
      else camera.position.lerp(desired, 1 - Math.exp(-dt * 4));
      look.set(x * 0.4, 2, z * 0.3 - 2);
      camera.lookAt(look);
      renderer.render(scene, camera);
      if (now - tick > 100) {
        setPosition({ x, z });
        setNear(nearestStation(x, z));
        tick = now;
      }
    }
    frame = requestAnimationFrame((t) => {
      setReady(true);
      animate(t);
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      el.removeEventListener("keydown", down);
      el.removeEventListener("keyup", up);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
      el.removeEventListener("pointerdown", start);
      el.removeEventListener("pointermove", drag);
      el.removeEventListener("pointerup", clear);
      el.removeEventListener("pointercancel", clear);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      const materials = new Set<THREE.Material>();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const ms = Array.isArray(o.material) ? o.material : [o.material];
          ms.forEach((m) => materials.add(m));
        }
      });
      materials.forEach((m) => {
        if ("map" in m) (m.map as THREE.Texture | null)?.dispose();
        m.dispose();
      });
      sky.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      clear();
    };
  }, [reduced]);
  return (
    <div className="station-experience">
      <div
        ref={host}
        className="station-canvas"
        tabIndex={0}
        role="region"
        aria-label="Explore the space station. Use W A S D or arrow keys to walk, Space to jump. Drag to rotate the camera."
      />
      <div className="station-title">
        <h1 id="hero-title">
          Jaymer <span>Mirabuenos</span>
        </h1>
        <p>Jaymer Mirabuenos · Frontend developer. IT student.</p>
      </div>
      {(!ready || failed) && (
        <p className="station-message">
          {failed
            ? "3D view unavailable. Explore the sections below."
            : "Preparing your space station…"}
        </p>
      )}
      <div className="station-map">
        <span>MINI MAP</span>
        <div className="station-map-disc">
          {STATIONS.map((s, i) => (
            <button
              key={s.id}
              style={{ left: `${50 + s.x * 3}%`, top: `${50 + s.z * 3}%` }}
              aria-label={`Walk to ${s.name}`}
              onClick={() => {
                target.current = i;
              }}
              title={s.name}
            >
              {s.name}
            </button>
          ))}
          <i
            style={{
              left: `${50 + position.x * 3}%`,
              top: `${50 + position.z * 3}%`,
            }}
            aria-label="Your position"
          />
        </div>
      </div>
      <div className="station-tools">
        <button
          onClick={() => {
            paused.current = !still;
            setStill(!still);
          }}
        >
          {still ? "Resume" : "Pause"} motion
        </button>
        <button onClick={() => (reset.current = true)}>Reset view</button>
      </div>
      <div className="station-pad" aria-label="Movement controls">
        {[
          ["W", "KeyW"],
          ["A", "KeyA"],
          ["S", "KeyS"],
          ["D", "KeyD"],
        ].map(([label, key]) => (
          <button
            key={key}
            aria-label={`Move ${label === "W" ? "forward" : label === "S" ? "backward" : label === "A" ? "left" : "right"}`}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              keys.current.add(key);
            }}
            onPointerUp={() => keys.current.delete(key)}
            onPointerCancel={() => keys.current.delete(key)}
            onLostPointerCapture={() => keys.current.delete(key)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                keys.current.add(key);
              }
            }}
            onKeyUp={() => keys.current.delete(key)}
            onBlur={() => keys.current.delete(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <button className="station-jump" onClick={() => (jump.current = true)}>
        Space / Jump
      </button>
      <div className="station-destinations">
        <p aria-live="polite">
          {near >= 0
            ? STATIONS[near].detail
            : "Enter a portal to teleport to its contents."}
        </p>
        <nav aria-label="Explore portfolio">
          {STATIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(event) => {
                if (
                  event.ctrlKey ||
                  event.metaKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                target.current = null;
                keys.current.clear();
                void teleportTo(s.id);
              }}
              aria-current={near === i ? "location" : undefined}
            >
              {s.name} ↗
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
