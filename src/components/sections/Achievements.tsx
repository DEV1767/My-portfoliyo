// src/components/sections/Achievements.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ACHIEVEMENTS, AchievementItem } from '@/lib/data';
import { TechLogo } from '@/components/ui/TechLogo';

export function Achievements() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasStartedCount, setHasStartedCount] = useState<boolean[]>(
    new Array(ACHIEVEMENTS.length).fill(false)
  );
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    new Array(ACHIEVEMENTS.length).fill(0)
  );

  // Track scroll through the 300vh sticky container
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        if (total <= 0) return;

        const current = -rect.top;
        const progress = Math.max(0, Math.min(1, current / total));
        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Trigger metric count-up with easeOutQuart over 1.4s
  useEffect(() => {
    ACHIEVEMENTS.forEach((item, idx) => {
      // Trigger card when scroll progress passes its index bracket
      const threshold = idx * 0.2;
      if (scrollProgress >= threshold && !hasStartedCount[idx]) {
        setHasStartedCount((prev) => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });

        // Run count up
        const startTime = performance.now();
        const duration = 1400; // 1.4s
        const target = item.metric;

        const animate = (now: number) => {
          const elapsed = now - startTime;
          const t = Math.min(1, elapsed / duration);
          // easeOutQuart
          const eased = 1 - Math.pow(1 - t, 4);
          const currentVal = Math.round(eased * target);

          setAnimatedValues((prev) => {
            const next = [...prev];
            next[idx] = currentVal;
            return next;
          });

          if (t < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }
    });
  }, [scrollProgress, hasStartedCount]);

  // Horizontal travel distance calculation
  const totalTravelPct = (ACHIEVEMENTS.length + 0.8) * 45; // percentage travel

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative bg-[var(--paper)]"
      style={{ height: '320vh' }}
    >
      {/* Pinned Sticky Viewport (100svh) */}
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-between py-10 select-none">
        {/* Header with Title and Thin Progress Bar */}
        <div className="section-container w-full">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="section-tag">05 — Milestones &amp; Ranks</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--ink)]">
                Recognition &amp; <span className="heading-accent">milestones.</span>
              </h2>
            </div>

            <div className="font-mono text-xs text-[var(--mute)] hidden sm:block">
              {Math.round(scrollProgress * 100)}% SCROLLED
            </div>
          </div>

          {/* Thin progress bar */}
          <div className="w-full h-[2px] bg-[var(--line)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--ink)] transition-all duration-75 origin-left"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Horizontal Card Track */}
        <div className="w-full overflow-visible my-auto py-6">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 px-6 sm:px-16 transition-transform duration-100 ease-out will-change-transform"
            style={{
              transform: `translateX(-${scrollProgress * totalTravelPct}vw)`,
            }}
          >
            {ACHIEVEMENTS.map((card, idx) => {
              // Check if card is near centre of viewport for 12px lift
              const cardOffset = (idx / ACHIEVEMENTS.length);
              const distFromCenter = Math.abs(scrollProgress - cardOffset);
              const isCenter = distFromCenter < 0.18;

              return (
                <div
                  key={card.id}
                  className={`flex-shrink-0 w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,320px)] card-surface p-7 sm:p-9 flex flex-col justify-between transition-all duration-400 ease-[var(--ease)] ${
                    isCenter
                      ? '-translate-y-3 shadow-2xl shadow-black/10'
                      : 'translate-y-0 shadow-md'
                  }`}
                  style={{
                    borderRadius: '28px',
                  }}
                >
                  {/* Top row: 72px Logo Tile + Index */}
                  <div className="flex items-center justify-between">
                    <div className="w-[72px] h-[72px] rounded-2xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center p-3 relative group">
                      <div className="absolute inset-0 rounded-2xl bg-black/5 opacity-50 blur-md pointer-events-none" />
                      <TechLogo name={card.logo} size={42} glow />
                    </div>

                    <span className="font-mono text-xs font-semibold text-[var(--mute)]">
                      {card.index}
                    </span>
                  </div>

                  {/* Bottom row: Left info + Right big counting number */}
                  <div className="flex items-end justify-between gap-4 pt-4 border-t border-[var(--line)]">
                    <div className="max-w-[60%]">
                      <span className="font-mono text-[10px] text-[var(--mute)] uppercase tracking-wider block mb-1">
                        {card.label}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--ink)] mb-1">
                        {card.caption}
                      </h3>
                      <p className="text-xs text-[var(--mute)] leading-snug line-clamp-2">
                        {card.detail}
                      </p>
                    </div>

                    {/* Huge Count-up Number */}
                    <div className="text-right">
                      <div className="font-mono text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--ink)] tracking-tighter leading-none">
                        {animatedValues[idx]}
                        <span className="text-2xl sm:text-3xl text-[var(--mute)] font-normal ml-0.5">
                          {card.metricSuffix}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--mute)] uppercase tracking-wider block mt-1">
                        {card.metricLabel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* End Track Card: "and counting →" */}
            <div className="flex-shrink-0 w-[clamp(280px,30vw,360px)] h-[clamp(260px,36vh,320px)] rounded-[28px] border-2 border-dashed border-[var(--line)] p-8 flex flex-col justify-center items-center text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--mute)] mb-2">
                CONTINUOUS PROGRESS
              </span>
              <div className="font-serif italic text-2xl sm:text-3xl text-[var(--ink)] mb-4">
                and counting →
              </div>
              <p className="font-mono text-xs text-[var(--mute)] max-w-xs">
                Actively engineering new RAG pipelines and autonomous agents every day.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="section-container flex items-center justify-between text-xs font-mono text-[var(--mute)]">
          <span>Scroll to travel horizontally</span>
          <span>Verified from Résumé</span>
        </div>
      </div>
    </section>
  );
}
