/* eslint-disable react/no-unknown-property */
import { useMemo, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { shaderMaterial, useTrailTexture, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

import './PixelTrail.css';

const GooeyFilter = ({ id = 'goo-filter', strength = 10 }) => {
  return (
    <svg className="goo-filter-container">
      <defs>
        <filter id={id} color-interpolation-filters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          {/** 使用 operator="in" 将模糊后的溢出限制在原始图形的alpha范围内，避免在亮背景（如视频）下产生巨大的外扩影像 */}
          <feComposite in="goo" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
};

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color('#ffffff'),
    alphaScale: 1.0,
    caOffset: 1.0,      // 色散偏移（相对于每个网格像素尺寸）
    caIntensity: 0.85    // 色散强度（0-1）
  },
  `
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  `
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;
    uniform float alphaScale;
    uniform float caOffset;
    uniform float caIntensity;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUv = fract(uv * gridSize);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      // 计算基于网格的微小偏移，用于RGB色散采样
      float px = 1.0 / gridSize;
      vec2 o = vec2(px * caOffset);
      float tR = texture2D(mouseTrail, gridUvCenter + o).r;
      float tG = trail;
      float tB = texture2D(mouseTrail, gridUvCenter - o).r;
      float tMax = max(tR, max(tG, tB));

      // 基础颜色与RGB分离颜色混合，制造玻璃反光的彩边效果
      vec3 rgbSplit = vec3(tR, tG, tB);
      vec3 baseCol = pixelColor * tMax;
      vec3 caCol = mix(baseCol, rgbSplit, clamp(caIntensity, 0.0, 1.0));

      gl_FragColor = vec4(caCol, tMax * alphaScale);
    }
  `
);

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor, alphaScale, caOffset, caIntensity }) {
  const size = useThree(s => s.size);
  const viewport = useThree(s => s.viewport);
  const invalidate = useThree(s => s.invalidate);
  const lastMoveTime = useRef(0);

  const dotMaterial = useMemo(() => {
    const mat = new DotMaterial();
    return mat;
  }, []);
  
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);
  dotMaterial.uniforms.alphaScale.value = typeof alphaScale === 'number' ? alphaScale : 1.0;
  dotMaterial.uniforms.caOffset.value = typeof caOffset === 'number' ? caOffset : 1.0;
  dotMaterial.uniforms.caIntensity.value = typeof caIntensity === 'number' ? caIntensity : 0.85;

  const [trail, onMove] = useTrailTexture({
    size: 192, // 进一步降低纹理分辨率以提升性能（视觉差异极小）
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || (x => x)
  });

  if (trail) {
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }

  const scale = Math.max(viewport.width, viewport.height) / 2;

  // 优化：鼠标移动时标记时间并触发渲染
  const handlePointerMove = (e) => {
    onMove(e);
    lastMoveTime.current = Date.now();
    invalidate();
  };

  // 优化：在trail衰减期间持续渲染，之后停止
  useFrame(() => {
    const timeSinceMove = Date.now() - lastMoveTime.current;
    // 在maxAge时间内持续渲染以显示trail衰减效果
    if (timeSinceMove < maxAge + 100) {
      invalidate();
    }
    // 超过衰减时间后，停止渲染直到下次鼠标移动
  });

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={handlePointerMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = x => x,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: 'high-performance',
    alpha: true,
    preserveDrawingBuffer: false,
    depth: false,
    stencil: false
  },
  gooeyFilter,
  color = '#ffffff',
  className = '',
  alphaScale = 1.0,
  caOffset = 1.0,
  caIntensity = 0.85
}) {
  return (
    <>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={`pixel-canvas ${className}`}
        style={gooeyFilter ? { filter: `url(#${gooeyFilter.id})` } : {}}
        eventSource={document} /* 从document读取指针事件，不依赖canvas捕获 */
        eventPrefix="client" /* 使用clientX/Y匹配document事件 */
        dpr={[1, 1.15]} /* 限制像素比，降低GPU负载 */
        frameloop="demand" /* 优化：按需渲染，大幅降低GPU消耗 */
      >
        <AdaptiveDpr pixelated />
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
          alphaScale={alphaScale}
          caOffset={caOffset}
          caIntensity={caIntensity}
        />
      </Canvas>
    </>
  );
}