'use client';

import { useEffect, useState } from 'react';

// Traditional colors of Japan
const colors = [
  '#FEEEED', // Sakurairo - Cherry blossom
  '#F69C9F', // Koubaiiro - Red plum
  '#E0861A', // Kincha - Golden brown
  '#B7BA6B', // Matcha tea
  '#D93A49', // Beniaka - Pure crimson
  '#B2D235', // Kimidori - Yellowish green
  '#F47A55', // Ouni - Ochre
  '#918D40', // Uguisuiro - Olive green
  '#F58F98', // Momoiro - Peach
  '#FFD400', // Kiiro - Yellow
];

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: number;
}

function generateShapes(count: number): Shape[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 60 + Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 0.015 + Math.random() * 0.025,
    direction: Math.random() * Math.PI * 2,
  }));
}

export default function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setShapes(generateShapes(10));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setShapes(prev =>
        prev.map(shape => ({
          ...shape,
          x: (shape.x + Math.cos(shape.direction) * shape.speed + 100) % 100,
          y: (shape.y + Math.sin(shape.direction) * shape.speed + 100) % 100,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* SVG filter for gooey blob effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{
          zIndex: -1,
          filter: 'url(#goo)',
        }}
        aria-hidden="true"
      >
        {shapes.map(shape => (
          <div
            key={shape.id}
            style={{
              position: 'absolute',
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
              borderRadius: '50%',
              backgroundColor: shape.color,
              opacity: 0.5,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    </>
  );
}
