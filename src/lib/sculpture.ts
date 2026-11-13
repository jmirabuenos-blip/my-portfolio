// A bounded, dependency-free WebGL sculpture. All geometry is generated locally.
export type SculptureOptions = {
  tone: number;
  paused: boolean;
  reduced: boolean;
};
const vertex = `attribute vec3 position;attribute vec3 normal;uniform mat4 rotation;uniform float aspect;varying vec3 vNormal;varying vec3 vPosition;void main(){vec4 p=rotation*vec4(position,1.);vNormal=mat3(rotation)*normal;vPosition=p.xyz;float z=5.8-p.z;gl_Position=vec4(p.x*1.9/aspect,p.y*1.9,(z-2.)*.5,z);}`;
const fragment = `precision mediump float;varying vec3 vNormal;varying vec3 vPosition;uniform vec3 metal;void main(){vec3 n=normalize(vNormal);vec3 v=normalize(vec3(0.,0.,5.8)-vPosition);vec3 l1=normalize(vec3(-3.,4.,5.));vec3 l2=normalize(vec3(4.,1.,2.));vec3 l3=normalize(vec3(-1.,-3.,1.));float d=max(dot(n,l1),0.);float rim=pow(1.-max(dot(n,v),0.),3.);float spec=pow(max(dot(n,normalize(l1+v)),0.),65.);float spec2=pow(max(dot(n,normalize(l2+v)),0.),24.);float spec3=pow(max(dot(n,normalize(l3+v)),0.),45.);float band=pow(max(0.,1.-abs(dot(n,normalize(vec3(.3,1.,1.))))),15.);vec3 col=metal*(.13+d*.65)+vec3(1.,.88,.7)*spec*1.6+metal*spec2*1.3+vec3(.68,.76,.78)*spec3*.65+metal*rim*.55+vec3(.8,.7,.57)*band*.16;col=col/(col+.7);col=pow(col,vec3(.85));gl_FragColor=vec4(col,1.);}`;
function point(t: number) {
  return [
    (1.12 + 0.43 * Math.cos(3 * t)) * Math.cos(2 * t),
    (1.12 + 0.43 * Math.cos(3 * t)) * Math.sin(2 * t),
    0.43 * Math.sin(3 * t),
  ];
}
function unit(v: number[]) {
  const l = Math.hypot(...v);
  return v.map((x) => x / l);
}
function cross(a: number[], b: number[]) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}
function geometry() {
  const p: number[] = [],
    n: number[] = [],
    idx: number[] = [];
  const segments = 220,
    sides = 24;
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2,
      c = point(t),
      next = point(t + 0.001),
      tangent = unit(next.map((x, j) => x - c[j])),
      b = unit(cross(tangent, [0, 0, 1])),
      a = unit(cross(b, tangent));
    for (let j = 0; j <= sides; j++) {
      const angle = (j / sides) * Math.PI * 2;
      const normal = a.map(
        (x, k) => x * Math.cos(angle) + b[k] * Math.sin(angle),
      );
      n.push(...normal);
      p.push(...c.map((x, k) => x + normal[k] * 0.255));
      if (i < segments && j < sides) {
        const k = i * (sides + 1) + j;
        idx.push(k, k + sides + 1, k + 1, k + 1, k + sides + 1, k + sides + 2);
      }
    }
  }
  return {
    p: new Float32Array(p),
    n: new Float32Array(n),
    idx: new Uint16Array(idx),
  };
}
function matrix(x: number, y: number, z: number) {
  const cx = Math.cos(x),
    sx = Math.sin(x),
    cy = Math.cos(y),
    sy = Math.sin(y),
    cz = Math.cos(z),
    sz = Math.sin(z);
  return new Float32Array([
    cy * cz,
    cx * sz + sx * sy * cz,
    sx * sz - cx * sy * cz,
    0,
    -cy * sz,
    cx * cz - sx * sy * sz,
    sx * cz + cx * sy * sz,
    0,
    sy,
    -sx * cy,
    cx * cy,
    0,
    0,
    0,
    0,
    1,
  ]);
}
export function createSculpture(
  canvas: HTMLCanvasElement,
  options: () => SculptureOptions,
) {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
    preserveDrawingBuffer: true,
  });
  if (!gl) throw new Error("WebGL unavailable");
  const shaders: WebGLShader[] = [];
  const buffers: WebGLBuffer[] = [];
  const program = gl.createProgram()!;
  for (const [type, source] of [
    [gl.VERTEX_SHADER, vertex],
    [gl.FRAGMENT_SHADER, fragment],
  ] as const) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw new Error(gl.getShaderInfoLog(shader) || "Shader failed");
    gl.attachShader(program, shader);
    shaders.push(shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error("Shader linking failed");
  gl.useProgram(program);
  const mesh = geometry();
  for (const [name, data] of [
    ["position", mesh.p],
    ["normal", mesh.n],
  ] as const) {
    const buffer = gl.createBuffer()!;
    buffers.push(buffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
  }
  const index = gl.createBuffer()!;
  buffers.push(index);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.idx, gl.STATIC_DRAW);
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 0);
  const rotation = gl.getUniformLocation(program, "rotation"),
    aspect = gl.getUniformLocation(program, "aspect"),
    metal = gl.getUniformLocation(program, "metal");
  let frame = 0,
    last = 0,
    turn = 0,
    dragX = 0,
    dragY = 0,
    px = 0,
    py = 0,
    dragging = false,
    visible = true,
    disposed = false,
    dirty = true,
    scroll = 0;
  const colors = [
    [0.88, 0.4, 0.19],
    [0.64, 0.73, 0.8],
    [0.58, 0.62, 0.3],
  ];
  function render(now: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const opt = options();
    const active = !opt.paused && !opt.reduced;
    const dt = Math.min((now - last) / 1000, 0.05);
    if (active) turn += dt * 0.13;
    last = now;
    if (active || dirty) {
      dirty = false;
      const dpr = Math.min(devicePixelRatio, 1.5);
      const w = Math.round(canvas.clientWidth * dpr),
        h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl!.viewport(0, 0, w, h);
      }
      gl!.clear(gl!.COLOR_BUFFER_BIT | gl!.DEPTH_BUFFER_BIT);
      gl!.uniformMatrix4fv(
        rotation,
        false,
        matrix(
          0.55 + dragY,
          turn + dragX + 0.35 + (opt.reduced ? 0 : scroll * 0.3),
          -0.35,
        ),
      );
      gl!.uniform1f(aspect, w / Math.max(h, 1));
      gl!.uniform3fv(metal, colors[opt.tone]);
      gl!.drawElements(gl!.TRIANGLES, mesh.idx.length, gl!.UNSIGNED_SHORT, 0);
    }
    if (active) frame = requestAnimationFrame(render);
  }
  function invalidate() {
    dirty = true;
    if (!frame && !disposed && visible && !document.hidden)
      frame = requestAnimationFrame(render);
  }
  function down(e: PointerEvent) {
    if (options().reduced) return;
    dragging = true;
    px = e.clientX;
    py = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  }
  function move(e: PointerEvent) {
    if (!dragging) return;
    dragX += (e.clientX - px) * 0.008;
    dragY += (e.clientY - py) * 0.008;
    px = e.clientX;
    py = e.clientY;
    invalidate();
  }
  function up() {
    dragging = false;
  }
  function key(e: KeyboardEvent) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key))
      return;
    e.preventDefault();
    if (e.key === "ArrowLeft") dragX -= 0.2;
    if (e.key === "ArrowRight") dragX += 0.2;
    if (e.key === "ArrowUp") dragY -= 0.2;
    if (e.key === "ArrowDown") dragY += 0.2;
    invalidate();
  }
  function visibility() {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else {
      last = performance.now();
      invalidate();
    }
  }
  function onScroll() {
    scroll = Math.min(window.scrollY / 800, 1);
    invalidate();
  }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) {
      last = performance.now();
      invalidate();
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  observer.observe(canvas);
  const resize = new ResizeObserver(invalidate);
  resize.observe(canvas);
  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("pointercancel", up);
  canvas.addEventListener("keydown", key);
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("scroll", onScroll, { passive: true });
  invalidate();
  return {
    invalidate,
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("keydown", key);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("scroll", onScroll);
      buffers.forEach((b) => gl.deleteBuffer(b));
      shaders.forEach((s) => gl.deleteShader(s));
      gl.deleteProgram(program);
    },
  };
}
