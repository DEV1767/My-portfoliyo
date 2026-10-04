// src/lib/scroll.tsx
'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface ScrollContextValue {
  lenis: Lenis | null;
  scrollToTarget: (targetId: string) => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  lenis: null,
  scrollToTarget: () => {},
});

// Singleton reference for external non-React calls if needed
let globalLenisInstance: Lenis | null = null;

export function scrollToTarget(targetId: string) {
  const cleanId = targetId.replace(/^#/, '');
  const element = document.getElementById(cleanId);
  if (!element) return;

  if (globalLenisInstance) {
    globalLenisInstance.scrollTo(element, {
      offset: 0,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    globalLenisInstance = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      globalLenisInstance = null;
    };
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        lenis: lenisRef.current,
        scrollToTarget,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  return useContext(ScrollContext);
}
