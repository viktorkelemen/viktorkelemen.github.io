'use client';

interface FlowerProps {
  size?: number;
  className?: string;
}

export default function Flower({ size = 120, className = '' }: FlowerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      {/* Five petals */}
      <circle cx="50" cy="22" r="22" fill="black" />
      <circle cx="76" cy="40" r="22" fill="black" />
      <circle cx="66" cy="72" r="22" fill="black" />
      <circle cx="34" cy="72" r="22" fill="black" />
      <circle cx="24" cy="40" r="22" fill="black" />
      {/* Center hole */}
      <circle cx="50" cy="50" r="14" fill="white" />
    </svg>
  );
}
