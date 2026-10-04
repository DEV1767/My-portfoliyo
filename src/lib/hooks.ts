// src/lib/hooks.ts
'use client';

import { useEffect, useState, useRef, RefObject } from 'react';

/**
 * Hook to detect whether an element is visible in the viewport.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options: {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
} = {}): [RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = '0px', once = true } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isInView];
}

/**
 * Hook to calculate scroll progress (0 to 1) through a container element.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  containerRef: RefObject<T | null>
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) {
        setProgress(rect.top < 0 ? 1 : 0);
        return;
      }

      // 0 when top of element hits top of viewport, 1 when bottom hits bottom of viewport
      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollable;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setProgress(clamped);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    update();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  return progress;
}

/**
 * Hook to check if the user prefers reduced motion.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
