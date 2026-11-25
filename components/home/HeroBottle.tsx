"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function HeroBottle() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovering, setHovering] = useState(false);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    // Position of cursor within the frame, from -1 (left/top) to 1 (right/bottom)
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const nx = px * 2 - 1;
    const ny = py * 2 - 1;

    const MAX_DEG = 16;
    setTilt({
      rx: -ny * MAX_DEG, // vertical cursor movement -> tilt forward/back
      ry: nx * MAX_DEG, // horizontal cursor movement -> tilt left/right
    });
  }

  function handlePointerEnter() {
    setHovering(true);
  }

  function handlePointerLeave() {
    setHovering(false);
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <div
      ref={frameRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      {/* Soft contact shadow that scales/fades with hover for depth cueing */}
      <div
        aria-hidden
        className="absolute bottom-[8%] w-40 sm:w-52 lg:w-60 h-6 sm:h-8 rounded-full bg-ink/15 blur-xl transition-all duration-500 ease-out"
        style={{
          transform: hovering ? "scale(1.15)" : "scale(1)",
          opacity: hovering ? 0.22 : 0.14,
        }}
      />

      <div
        id="hero-bottle-visual"
        className={`relative w-72 sm:w-[22rem] lg:w-[27rem] h-[90%] -mt-12 sm:-mt-16 lg:-mt-20 transition-transform duration-300 ease-out ${hovering ? "" : "animate-bottle-float"
          }`}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotate(30deg) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${hovering ? 1.04 : 1
            })`,
          willChange: "transform",
        }}
      >
        <Image
          src="/Images/Bottle.png"
          alt="MOD Wellness hero product bottle"
          fill
          priority
          className="object-contain drop-shadow-2xl"
          sizes="(max-width: 1024px) 352px, 432px"
        />
      </div>
    </div>
  );
}