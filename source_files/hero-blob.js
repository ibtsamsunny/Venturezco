// Hero background: organic glass blob — noise displacement + honeycomb emissive
// overlay + bloom. Rendered with three.js into a supplied <canvas>.
import * as THREE from "https://esm.sh/three@0.161.0";
import { EffectComposer } from "https://esm.sh/three@0.161.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://esm.sh/three@0.161.0/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://esm.sh/three@0.161.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "https://esm.sh/three@0.161.0/examples/jsm/postprocessing/OutputPass.js";

const SIMPLEX = `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }`;
const VERT_COMMON = `
  #include <common>
  uniform float uTime, uNoiseAmp, uNoiseFreq, uNoiseSpeed, uBreatheAmp, uBreatheSpeed, uMouse;
  varying vec3 vObjPos;
  ${SIMPLEX}
  float fbm(vec3 p){ float v=0.0,a=0.5; for(int i=0;i<4;i++){ v+=a*snoise(p); p*=2.02; a*=0.5; } return v; }
  vec3 distort(vec3 p){
    float n = fbm(p*uNoiseFreq + vec3(0.0, uTime*uNoiseSpeed, uTime*uNoiseSpeed*0.5));
    float breathe = sin(uTime*uBreatheSpeed)*uBreatheAmp;
    return p*(1.0 + n*uNoiseAmp + breathe);
  }`;
const VERT_NORMAL = `
  vec3 dP = distort(position);
  vec3 tgt = normalize(cross(position, vec3(0.0,1.0,0.0)+0.0001));
  vec3 bit = normalize(cross(position, tgt));
  float e = 0.04;
  vec3 dPt = distort(position + tgt*e);
  vec3 dPb = distort(position + bit*e);
  vec3 objectNormal = normalize(cross(dPt - dP, dPb - dP));
  #ifdef USE_TANGENT
    vec3 objectTangent = vec3(tangent.xyz);
  #endif`;
const VERT_BEGIN = `
  vec3 transformed = dP;
  vObjPos = dP;`;
const FRAG_COMMON = `
  #include <common>
  uniform vec2 uHexScale;
  uniform float uHexWidth, uHexIntensity, uRimIntensity;
  uniform vec3 uHexColorA, uHexColorB, uRimColor;
  varying vec3 vObjPos;
  const vec2 HS = vec2(1.0, 1.7320508);
  float hexMetric(vec2 p){ p=abs(p); return max(p.x*0.5 + p.y*0.8660254, p.x); }
  vec4 hexGrid(vec2 uv){
    vec4 hC = floor(vec4(uv, uv - vec2(0.5,1.0)) / HS.xyxy);
    vec4 h  = vec4(uv - hC.xy*HS, uv - (hC.zw + 0.5)*HS);
    return dot(h.xy,h.xy) < dot(h.zw,h.zw) ? vec4(h.xy, hC.xy) : vec4(h.zw, hC.zw+0.5);
  }`;
const FRAG_EMISSIVE = `
  #include <emissivemap_fragment>
  vec3 dir = normalize(vObjPos);
  vec2 huv = vec2(atan(dir.z, dir.x)/6.2831853 + 0.5, acos(clamp(dir.y,-1.0,1.0))/3.1415926);
  huv *= uHexScale;
  vec4 hg = hexGrid(huv);
  float ed = hexMetric(hg.xy);
  float d = 0.5 - ed;
  float fres = pow(1.0 - clamp(dot(normalize(vNormal), normalize(vViewPosition)), 0.0, 1.0), 2.4);
  float wall = 1.0 - smoothstep(uHexWidth, uHexWidth + 0.028, d);
  float cell = smoothstep(uHexWidth, 0.5, d);
  vec3 wallGlow = mix(uHexColorA, uHexColorB, fres * 0.7 + 0.3);
  totalEmissiveRadiance += wall * wallGlow * uHexIntensity * (0.55 + 0.85 * fres);
  totalEmissiveRadiance += fres * uRimColor * uRimIntensity;
  diffuseColor.rgb *= (1.0 - 0.42 * cell);`;

export function initHeroBlob(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  function buildEnvironment() {
    const w = 1024, h = 512;
    const cvs = document.createElement("canvas"); cvs.width = w; cvs.height = h;
    const ctx = cvs.getContext("2d");
    ctx.fillStyle = "#05060f"; ctx.fillRect(0, 0, w, h);
    const glow = (x, y, r, col) => { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); };
    glow(w * 0.30, h * 0.30, 460, "rgba(38,68,180,0.95)");
    glow(w * 0.72, h * 0.40, 380, "rgba(24,50,150,0.9)");
    glow(w * 0.55, h * 0.85, 320, "rgba(30,58,160,0.55)");
    glow(w * 0.90, h * 0.18, 300, "rgba(150,178,240,0.8)");
    glow(w * 0.12, h * 0.72, 280, "rgba(16,30,100,0.7)");
    glow(w * 0.45, h * 0.10, 200, "rgba(210,224,255,0.7)");
    const tex = new THREE.CanvasTexture(cvs);
    tex.mapping = THREE.EquirectangularReflectionMapping; tex.colorSpace = THREE.SRGBColorSpace;
    const pmrem = new THREE.PMREMGenerator(renderer); pmrem.compileEquirectangularShader();
    const target = pmrem.fromEquirectangular(tex); tex.dispose(); pmrem.dispose();
    return target.texture;
  }
  scene.environment = buildEnvironment();
  scene.add(new THREE.AmbientLight(0xffffff, 0.18));
  const key = new THREE.DirectionalLight(0x9fb0ff, 1.1); key.position.set(3, 5, 4); scene.add(key);
  const rimLight = new THREE.DirectionalLight(0x2f5bff, 0.5); rimLight.position.set(-4, -2, -3); scene.add(rimLight);

  const uniforms = {};
  const detail = window.innerWidth < 760 ? 42 : 72;
  const geometry = new THREE.IcosahedronGeometry(1.45, detail);
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#050d38"), metalness: 0, roughness: 0.14,
    transmission: 1, thickness: 0.85, ior: 1.4,
    attenuationColor: new THREE.Color("#0a1f66"), attenuationDistance: 2.6,
    clearcoat: 1, clearcoatRoughness: 0.2, envMapIntensity: 1.5,
    emissive: new THREE.Color("#040a26"), emissiveIntensity: 0.4, transparent: true,
  });
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, {
      uTime: { value: 0 }, uNoiseAmp: { value: 0.30 }, uNoiseFreq: { value: 0.95 },
      uNoiseSpeed: { value: 0.22 }, uBreatheAmp: { value: 0.055 }, uBreatheSpeed: { value: 0.75 }, uMouse: { value: 0 },
      uHexScale: { value: new THREE.Vector2(26.0, 14.0) }, uHexWidth: { value: 0.085 },
      uHexIntensity: { value: 1.1 }, uRimIntensity: { value: 0.5 },
      uHexColorA: { value: new THREE.Color("#0f2c7a") }, uHexColorB: { value: new THREE.Color("#2d58c8") },
      uRimColor: { value: new THREE.Color("#1e46c0") },
    });
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", VERT_COMMON)
      .replace("#include <beginnormal_vertex>", VERT_NORMAL)
      .replace("#include <begin_vertex>", VERT_BEGIN);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", FRAG_COMMON)
      .replace("#include <emissivemap_fragment>", FRAG_EMISSIVE);
    Object.assign(uniforms, shader.uniforms);
  };

  const tiltGroup = new THREE.Group();
  const floatGroup = new THREE.Group();
  const spinGroup = new THREE.Group();
  spinGroup.add(new THREE.Mesh(geometry, material));
  floatGroup.add(spinGroup); tiltGroup.add(floatGroup); scene.add(tiltGroup);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.55, 0.72, 0.3);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const size = () => {
    const r = canvas.getBoundingClientRect();
    const w = Math.max(2, r.width), h = Math.max(2, r.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    composer.setSize(w, h); bloom.setSize(w, h);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  size();
  const ro = new ResizeObserver(size); ro.observe(canvas);

  const pointer = { x: 0, y: 0 };
  const onPointer = (e) => { const t = e.touches ? e.touches[0] : e; pointer.x = (t.clientX / window.innerWidth) * 2 - 1; pointer.y = -((t.clientY / window.innerHeight) * 2 - 1); };
  window.addEventListener("pointermove", onPointer);

  const clock = new THREE.Clock();
  let mouseEase = 0, raf = 0, disposed = false;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function tick() {
    if (disposed) return;
    const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
    if (uniforms.uTime) { uniforms.uTime.value += dt; mouseEase += (pointer.x * 0.5 - mouseEase) * 0.05; uniforms.uMouse.value = mouseEase; }
    spinGroup.rotation.y += dt * 0.09;
    floatGroup.position.y = Math.sin(t * 1.1) * 0.12;
    floatGroup.rotation.z = Math.sin(t * 0.6) * 0.04;
    tiltGroup.rotation.x += (pointer.y * 0.28 - tiltGroup.rotation.x) * 0.045;
    tiltGroup.rotation.y += (pointer.x * 0.40 - tiltGroup.rotation.y) * 0.045;
    composer.render();
    if (!reduce) raf = requestAnimationFrame(tick);
  }
  composer.render();
  if (!reduce) raf = requestAnimationFrame(tick);

  return {
    dispose() {
      disposed = true; cancelAnimationFrame(raf); ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      geometry.dispose(); material.dispose(); renderer.dispose();
    },
  };
}
