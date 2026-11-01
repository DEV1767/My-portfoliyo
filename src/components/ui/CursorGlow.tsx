// src/components/ui/CursorGlow.tsx
'use client';

import React, { useEffect, useState } from 'react';

export function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let rafId: number;
    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const render = () => {
      // Smooth interpolation (lerp)
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setPosition({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '420px',
        height: '420px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(255, 42, 95, 0.08) 35%, transparent 70%)',
        opacity: visible ? 1 : 0,
      }}
      aria-hidden="true"
    />
  );
}

