'use client';

import { FC, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const VERTEX_SHADER = `
uniform float uTime;
uniform float uTaperStrength;
uniform float uWaveSpeed;
uniform float uDistortionIntensity;
uniform float uSwirlIntensity;
uniform float uWaveScale;
uniform float uPulseAmount;
uniform vec2 uMouse;
uniform float uMouseRadius;
uniform float uMouseStrength;
varying vec2 vUv;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

#define OCTAVES 4
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.4;
  float frequency = 0.8;
  float lacunarity = 2.3;
  float persistence = 0.5;
  vec2 shift = vec2(uTime * uWaveSpeed);
  for (int i = 0; i < OCTAVES; ++i) {
    value += amplitude * noise(st * frequency + shift);
    shift *= 1.4;
    frequency *= lacunarity;
    amplitude *= persistence;
  }
  return value;
}

void main() {
  vec3 transformed = position;
  float waveScale = uWaveScale * 0.1;
  float primaryWave = fbm(vec2(transformed.x * waveScale + uTime * uWaveSpeed, transformed.y * (waveScale * 0.7) + uTime * (uWaveSpeed * 0.6)));
  float secondaryWave = fbm(vec2(transformed.x * (waveScale * 2.0) - uTime * (uWaveSpeed * 0.8), transformed.y * waveScale - uTime * (uWaveSpeed * 0.4)));
  float tertiaryWave = fbm(vec2(transformed.x * (waveScale * 1.5) + uTime * (uWaveSpeed * 1.2), transformed.y * (waveScale * 1.2) - uTime * (uWaveSpeed * 0.8)));
  float timeWeight = sin(uTime * 0.2) * 0.2 * uPulseAmount + (1.0 - 0.2 * uPulseAmount);
  float distortion = (primaryWave * 1.6 * timeWeight + secondaryWave * 1.1 * (1.0 - timeWeight * uPulseAmount) + tertiaryWave * 0.8) * uDistortionIntensity;
  float swirlTime = sin(uTime * 0.15) * 0.3 * uPulseAmount + (1.0 - 0.3 * uPulseAmount);
  float swirl = sin(transformed.y * (waveScale * 1.2) + uTime * (uWaveSpeed * 1.6)) * cos(transformed.x * waveScale + uTime * (uWaveSpeed * 1.2)) * 0.7 * swirlTime * uSwirlIntensity;
  transformed.z += distortion * 1.3 + swirl * 0.5;
  transformed.x += cos(transformed.y * 0.15 + uTime * 0.1) * 0.5 * (1.0 + sin(uTime * 0.2) * 0.2);
  float normalizedY = abs(transformed.y / 20.0);
  float smoothCurve = smoothstep(0.0, 1.0, normalizedY);
  float taperFactor = 1.0 - (uTaperStrength * pow(smoothCurve, 1.5));
  transformed.x *= max(taperFactor, 0.15);

  // Mouse bend effect - attract vertices toward mouse position
  vec2 mouseWorld = uMouse * vec2(50.0, 12.5); // scale to plane size
  vec2 toMouse = mouseWorld - transformed.xy;
  float dist = length(toMouse);
  float influence = exp(-dist * dist / (uMouseRadius * uMouseRadius));
  transformed.xy += toMouse * influence * uMouseStrength;
  transformed.z += influence * uMouseStrength * 3.0; // lift toward camera

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  vUv = uv;
}
`;

const FRAGMENT_SHADER = `
uniform vec2 resolution;
uniform float uHorizontalFade;
uniform float uVerticalFade;
uniform float uTime;
uniform vec3 uAuroraGreen;
uniform vec3 uAuroraBlue;
uniform vec3 uAuroraTeal;
uniform vec3 uAuroraTop;
uniform float uRayDensity;
uniform float uRayIntensity;
uniform float uShimmerSpeed;
uniform float uRayWidth;
uniform float uRayVariance;
uniform float uRayDistance;
uniform float uRayHeightCurve;
uniform float uRayCurveDistortion;
uniform float uShimmerPulse;
uniform float uVerticalColorShift;
uniform float uEdgeSoftness;
uniform float uCoreBrightness;
uniform float uGlowSpread;
uniform float uSecondaryLayer;
uniform float uRayBlur;
uniform float uRayHeight;
varying vec2 vUv;

float hash(float n) { return fract(sin(n) * 43758.5453123); }
float hash2D(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash2D(i);
  float b = hash2D(i + vec2(1.0, 0.0));
  float c = hash2D(i + vec2(0.0, 1.0));
  float d = hash2D(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 4; i++) {
    if (i >= octaves) break;
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

float verticalRays(vec2 uv, float time, float layerOffset) {
  float rays = 0.0;
  float rayX = (uv.x + layerOffset) * uRayDensity;
  float varianceNoise = noise(vec2(floor(rayX) * 0.1, layerOffset));
  float varianceOffset = (varianceNoise - 0.5) * uRayVariance * 2.0;
  rayX += varianceOffset;
  float spacingVariance = noise(vec2(floor(rayX * 0.5), layerOffset)) * uRayVariance;
  rayX *= 1.0 + spacingVariance * 0.5;
  float rayNoise = fbm(vec2(rayX, time * 0.1), 3);
  float rayOffset = sin(rayX * 3.14159 + rayNoise * 2.0 + time * uShimmerSpeed * 0.5) * 0.5 + 0.5;
  float rayPattern = pow(rayOffset, max(uRayWidth, 0.01));
  if (uRayBlur > 0.0) {
    float blurredRay = 0.0;
    float blurWeight = 0.0;
    for (float b = -1.0; b <= 1.0; b += 1.0) {
      float sampleX = rayX + b * uRayBlur * 0.7;
      float sampleNoise = fbm(vec2(sampleX, time * 0.1), 3);
      float sampleOffset = sin(sampleX * 3.14159 + sampleNoise * 2.0 + time * uShimmerSpeed * 0.5) * 0.5 + 0.5;
      float samplePattern = pow(sampleOffset, max(uRayWidth, 0.01));
      float weight = exp(-abs(b) * 0.5);
      blurredRay += samplePattern * weight;
      blurWeight += weight;
    }
    blurredRay /= blurWeight;
    rayPattern = mix(rayPattern, blurredRay, uRayBlur);
  }
  float coreIntensity = pow(rayPattern, 1.0 / (uCoreBrightness + 0.1));
  rayPattern = mix(rayPattern, coreIntensity, uCoreBrightness);
  float bottomFade = smoothstep(0.0, 0.15 + uEdgeSoftness * 0.1, uv.y);
  float curveDistortion = fbm(vec2((uv.x + layerOffset) * 3.0, time * 0.1), 3) * uRayCurveDistortion;
  float sineWave = sin((uv.x + layerOffset) * 3.14159 * 2.0 + curveDistortion * 3.0);
  float heightCurve = 1.0 - (sineWave * 0.5 + 0.5) * uRayHeightCurve;
  float heightVariance = noise(vec2(floor(rayX), 0.5 + layerOffset)) * uRayVariance;
  float heightVarianceFactor = 1.0 + (heightVariance - 0.5) * 0.3;
  float rayMaxHeight = uRayHeight * heightCurve * heightVarianceFactor;
  float topFade = smoothstep(rayMaxHeight, rayMaxHeight * 0.7, uv.y);
  float verticalGradient = bottomFade * topFade;
  float shimmer = noise(vec2((uv.x + layerOffset) * uRayDensity * 2.0, uv.y * 3.0 + time * uShimmerSpeed));
  shimmer = pow(shimmer, 1.5);
  rays = rayPattern * verticalGradient;
  rays += shimmer * 0.3 * verticalGradient;
  float flicker = noise(vec2(rayX * 0.5, time * uShimmerSpeed * 2.0));
  float flickerAmount = mix(1.0, 0.7 + flicker * 0.5, uShimmerPulse);
  rays *= flickerAmount;
  float widthVariance = 1.0 + uRayVariance * (noise(vec2(floor(rayX) * 0.3, layerOffset)) - 0.5);
  rays *= widthVariance;
  return rays * uRayIntensity;
}

float curtainWave(vec2 uv, float time) {
  float wave = 0.0;
  wave += sin(uv.x * 8.0 + time * 0.3 + fbm(uv * 2.0, 3) * 2.0) * 0.5 + 0.5;
  wave += sin(uv.x * 12.0 - time * 0.2 + fbm(uv * 3.0, 3) * 1.5) * 0.3 + 0.3;
  wave += sin(uv.x * 20.0 + time * 0.5) * 0.15 + 0.15;
  return wave * 0.5;
}

void main() {
  vec2 uv = vUv;
  float rays = verticalRays(uv, uTime, 0.0);
  float secondaryRays = verticalRays(uv, uTime * 0.8, 0.15) * uSecondaryLayer;
  rays = max(rays, secondaryRays * 0.7);
  rays += secondaryRays * 0.3;
  float curtain = curtainWave(uv, uTime);
  float combinedEffect = rays + curtain * 0.4;
  float glow = 0.0;
  if (uGlowSpread > 0.01) {
    float glowNoise = fbm(uv * 3.0 + uTime * 0.05, 3);
    glow = combinedEffect * uGlowSpread * (0.5 + glowNoise * 0.5);
  }
  float noise1 = fbm(uv * 2.0 + uTime * 0.1, 4);
  float noise2 = fbm(uv * 3.0 - uTime * 0.15, 4);
  float colorMix1 = smoothstep(0.0, 0.5, uv.x + noise1 * 0.3);
  float colorMix2 = smoothstep(0.3, 0.8, uv.x + noise2 * 0.3);
  float colorMix3 = smoothstep(0.5, 1.0, uv.x - noise1 * 0.2);
  float timeShift = sin(uTime * 0.2) * 0.5 + 0.5;
  vec3 baseColor = mix(uAuroraGreen, uAuroraTeal, colorMix1);
  baseColor = mix(baseColor, uAuroraBlue, colorMix2 * (0.5 + timeShift * 0.5));
  baseColor = mix(baseColor, uAuroraGreen, colorMix3 * timeShift * 0.5);
  float scaledY = uv.y / uRayHeight;
  float verticalGradientColor = smoothstep(0.0, 0.8, scaledY);
  verticalGradientColor = pow(verticalGradientColor, 1.5);
  vec3 color = mix(baseColor, uAuroraTop, verticalGradientColor * uVerticalColorShift);
  float bottomBoost = smoothstep(0.4 * uRayHeight, 0.0, uv.y);
  color = mix(color, uAuroraGreen * 1.2, bottomBoost * uVerticalColorShift * 0.5);
  float rayBrightness = 0.5 + combinedEffect * 0.7;
  color *= rayBrightness;
  color += color * glow * 0.5;
  float brightSpots = pow(rays, 2.0) * uCoreBrightness;
  vec3 coreColor = mix(uAuroraGreen, vec3(0.8, 1.0, 0.9), 0.5);
  color += coreColor * brightSpots * 0.4;
  float baseAlpha = 0.9;
  float hFadeIn = smoothstep(0.0, 0.1 + uEdgeSoftness * 0.1, uv.x);
  float hFadeOut = smoothstep(1.0, 0.9 - uEdgeSoftness * 0.1, uv.x);
  float horizontalFade = hFadeIn * hFadeOut;
  horizontalFade = pow(horizontalFade, 1.0 / uHorizontalFade);
  float vFadeIn = smoothstep(0.0, 0.1, uv.y);
  float vFadeOut = smoothstep(uRayHeight, uRayHeight * 0.7, uv.y);
  float verticalFade = vFadeIn * vFadeOut;
  verticalFade = pow(verticalFade, 1.0 / uVerticalFade);
  float pulseWave = sin(uTime * 0.25 + uv.x * 1.5) * 0.1 + 0.9;
  float pulse = mix(1.0, pulseWave, uShimmerPulse);
  float rayAlpha = 0.4 + rays * 0.6;
  rayAlpha = mix(rayAlpha, smoothstep(0.0, 0.5, rayAlpha), uEdgeSoftness);
  float alpha = baseAlpha * horizontalFade * verticalFade * pulse * rayAlpha;
  alpha += glow * 0.3;
  alpha = clamp(alpha, 0.0, 1.0);
  color *= 1.0 + combinedEffect * 0.3;
  gl_FragColor = vec4(color, alpha);
}
`;

const Aurora: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    scene.background = new THREE.Color(0xffffff);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Aurora shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0.0 },
        resolution: {
          value: new THREE.Vector2(
            container.clientWidth,
            container.clientHeight,
          ),
        },
        uTaperStrength: { value: 0.0 },
        uHorizontalFade: { value: 2.88 },
        uVerticalFade: { value: 0.99 },
        uWaveSpeed: { value: 0.10702 },
        uDistortionIntensity: { value: 0.448 },
        uSwirlIntensity: { value: 16.56 },
        uWaveScale: { value: 2.0 },
        uPulseAmount: { value: 1.0 },
        uAuroraGreen: { value: new THREE.Vector3(0.157, 0.627, 0.6) },
        uAuroraBlue: { value: new THREE.Vector3(0.22, 0.6, 0.486) },
        uAuroraTeal: { value: new THREE.Vector3(0.663, 0.082, 0.357) },
        uAuroraTop: { value: new THREE.Vector3(0.333, 0.0, 0.588) },
        uRayDensity: { value: 67.865 },
        uRayIntensity: { value: 0.778 },
        uShimmerSpeed: { value: 0.74 },
        uRayWidth: { value: 0.629 },
        uRayVariance: { value: 2.0 },
        uRayDistance: { value: 0.27 },
        uRayHeightCurve: { value: 0.0 },
        uRayCurveDistortion: { value: 0.1 },
        uShimmerPulse: { value: 0.593 },
        uVerticalColorShift: { value: 0.606 },
        uEdgeSoftness: { value: 0.6 },
        uCoreBrightness: { value: 0.778 },
        uGlowSpread: { value: 0.567 },
        uSecondaryLayer: { value: 0.44 },
        uRayBlur: { value: 1.0 },
        uRayHeight: { value: 0.3817 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseRadius: { value: 25.0 },
        uMouseStrength: { value: 0.05 },
      },
    });

    const planeGeometry = new THREE.PlaneGeometry(100, 25, 128, 48);
    const plane = new THREE.Mesh(planeGeometry, shaderMaterial);
    const isMobile = container.clientWidth < 640;
    plane.rotation.x = 0.439822971502571;
    plane.rotation.y = 0.282743338823082;
    plane.rotation.z = isMobile ? 0.91734505484822 : 0.439822971502571;
    plane.position.y = isMobile ? 9.9 : 7.7;
    scene.add(plane);

    // Mouse tracking with spring physics
    const mouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0, vx: 0, vy: 0 };
    const stiffness = 0.012;
    const damping = 0.35;

    function onMouseMove(e: MouseEvent) {
      // Normalize to -1..1 from viewport center
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1); // flip Y for GL coords
    }

    window.addEventListener('mousemove', onMouseMove);

    // Animation
    let time = 0;
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      time += 0.01;
      shaderMaterial.uniforms.uTime!.value = time;

      // Spring physics for smooth mouse following
      const forceX = (mouse.x - smoothMouse.x) * stiffness;
      const forceY = (mouse.y - smoothMouse.y) * stiffness;
      smoothMouse.vx = smoothMouse.vx * (1 - damping) + forceX;
      smoothMouse.vy = smoothMouse.vy * (1 - damping) + forceY;
      smoothMouse.x += smoothMouse.vx;
      smoothMouse.y += smoothMouse.vy;

      // Pass smoothed mouse position to shader
      (shaderMaterial.uniforms.uMouse!.value as THREE.Vector2).set(
        smoothMouse.x,
        smoothMouse.y,
      );

      renderer.render(scene, camera);

      // Fade in after first frame
      if (!hasRendered) {
        hasRendered = true;
        requestAnimationFrame(() => setVisible(true));
      }
    }
    let hasRendered = false;
    animate();

    // Resize handler
    function handleResize() {
      if (!container) {
        return;
      }
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      shaderMaterial.uniforms.resolution!.value.set(width, height);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      shaderMaterial.dispose();
      planeGeometry.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        opacity: visible ? 0.85 : 0,
        transition: 'opacity 0.8s ease-in',
      }}
    />
  );
};

export default Aurora;
