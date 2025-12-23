'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Traditional colors of Japan (as RGB normalized)
const COLORS = [
  [0.996, 0.933, 0.929], // Sakurairo - Cherry blossom
  [0.965, 0.612, 0.624], // Koubaiiro - Red plum
  [0.878, 0.525, 0.102], // Kincha - Golden brown
  [0.718, 0.729, 0.420], // Matcha tea
  [0.851, 0.227, 0.286], // Beniaka - Pure crimson
  [0.698, 0.824, 0.208], // Kimidori - Yellowish green
  [0.957, 0.478, 0.333], // Ouni - Ochre
  [0.569, 0.553, 0.251], // Uguisuiro - Olive green
  [0.961, 0.561, 0.596], // Momoiro - Peach
  [1.000, 0.831, 0.000], // Kiiro - Yellow
];

const NUM_BLOBS = 20;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uBlobPositions[${NUM_BLOBS}];
  uniform vec3 uBlobColors[${NUM_BLOBS}];
  uniform float uBlobSizes[${NUM_BLOBS}];

  void main() {
    vec2 uv = vUv;
    uv.x *= uResolution.x / uResolution.y;

    float totalInfluence = 0.0;
    vec3 totalColor = vec3(0.0);
    float colorWeight = 0.0;

    for (int i = 0; i < ${NUM_BLOBS}; i++) {
      vec2 blobPos = uBlobPositions[i].xy;
      blobPos.x *= uResolution.x / uResolution.y;

      float dist = distance(uv, blobPos);
      float radius = uBlobSizes[i];

      // Metaball influence function
      float influence = radius * radius / (dist * dist + 0.001);
      totalInfluence += influence;

      // Color blending weighted by influence
      float weight = influence * influence;
      totalColor += uBlobColors[i] * weight;
      colorWeight += weight;
    }

    // Threshold for blob visibility
    float threshold = 1.0;
    float edge = smoothstep(threshold - 0.3, threshold + 0.1, totalInfluence);

    // Normalize color
    vec3 color = totalColor / (colorWeight + 0.001);

    // Output with transparency
    float alpha = edge * 0.5;
    gl_FragColor = vec4(color, alpha);
  }
`;

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: number[];
}

function createBlobs(): Blob[] {
  return Array.from({ length: NUM_BLOBS }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.001,
    vy: (Math.random() - 0.5) * 0.001,
    size: 0.03 + Math.random() * 0.05,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<Blob[]>(createBlobs());

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create uniforms
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uBlobPositions: { value: blobsRef.current.map(b => new THREE.Vector3(b.x, b.y, 0)) },
      uBlobColors: { value: blobsRef.current.map(b => new THREE.Vector3(...b.color)) },
      uBlobSizes: { value: blobsRef.current.map(b => b.size) },
    };

    // Fullscreen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Update blob positions
      blobsRef.current.forEach((blob, i) => {
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce off edges
        if (blob.x < 0 || blob.x > 1) blob.vx *= -1;
        if (blob.y < 0 || blob.y > 1) blob.vy *= -1;

        // Keep in bounds
        blob.x = Math.max(0, Math.min(1, blob.x));
        blob.y = Math.max(0, Math.min(1, blob.y));

        // Update uniform
        uniforms.uBlobPositions.value[i].set(blob.x, blob.y, 0);
      });

      uniforms.uTime.value += 0.016;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}
