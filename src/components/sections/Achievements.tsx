// src/components/sections/Achievements.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ACHIEVEMENTS } from '@/lib/data';
import { TechLogo } from '@/components/ui/TechLogo';

export function Achievements() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    new Array(ACHIEVEMENTS.length).fill(0)
  );

  // Trigger metric count-up when section scrolls into viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          ACHIEVEMENTS.forEach((item, idx) => {
            const startTime = performance.now();
            const duration = 1500;
            const target = item.metric;

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const t = Math.min(1, elapsed / duration);
              // Quartic ease out curve for smooth settling
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

            // Stagger animation slightly for each card
            setTimeout(() => {
              requestAnimationFrame(animate);
            }, idx * 120);
          });
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="section-spacing relative bg-[var(--paper)]"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="section-tag">05 — Milestones &amp; Ranks</div>
            <h2 className="section-heading !mb-2">
              Recognition &amp; <span className="heading-accent">milestones.</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--mute)] max-w-xl">
              Quantifiable benchmarks from cybersecurity competitions, national hackathons, and algorithmic problem-solving.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[var(--mute)] bg-white/70 backdrop-blur-sm border border-[var(--line)] px-4 py-2 rounded-full self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>3 Benchmarks · Verified from Résumé</span>
          </div>
        </div>

        {/* 3-Card Responsive Grid: 3 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ACHIEVEMENTS.map((card, idx) => {
            return (
              <div
                key={card.id}
                className="card-surface p-7 sm:p-9 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-black/15"
                style={{ borderRadius: '24px' }}
              >
                {/* Card Top Row: Logo Tile + Monospace Index + Link */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center p-2.5 relative group-hover:border-[var(--ink)]/30 transition-colors">
                    <TechLogo name={card.logo} size={36} glow />
                  </div>

                  <div className="flex items-center gap-3">
                    {card.url && (
                      <a
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-[var(--mute)] hover:text-[var(--ink)] transition-colors py-1 px-2.5 rounded-full border border-[var(--line)] hover:border-[var(--ink)]/40"
                        aria-label={`Open ${card.platform} profile`}
                      >
                        Profile ↗
                      </a>
                    )}
                    <span className="font-mono text-xs font-semibold text-[var(--mute)]">
                      {card.index}
                    </span>
                  </div>
                </div>

                {/* Card Middle: Kicker + Title + Detail */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[11px] font-semibold text-[var(--mute)] uppercase tracking-wider">
                      {card.label}
                    </span>
                    <span className="text-[var(--line)]">•</span>
                    <span className="font-mono text-[11px] text-[var(--mute)]">
                      {card.platform}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] mb-3">
                    {card.caption}
                  </h3>

                  <p className="text-sm text-[var(--mute)] leading-relaxed">
                    {card.detail}
                  </p>
                </div>

                {/* Card Bottom: Metric Count-up Banner */}
                <div className="pt-6 border-t border-[var(--line)] flex items-end justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[var(--mute)] uppercase tracking-widest block mb-1">
                      KEY METRIC
                    </span>
                    <span className="font-mono text-xs font-medium text-[var(--ink)]">
                      {card.metricLabel}
                    </span>
                  </div>

                  {/* Huge Animated Number */}
                  <div className="text-right">
                    <div className="font-mono text-4xl sm:text-5xl font-extrabold text-[var(--ink)] tracking-tighter leading-none">
                      {animatedValues[idx]}
                      <span className="text-2xl sm:text-3xl text-[var(--mute)] font-normal ml-0.5">
                        {card.metricSuffix}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continuous Progress Footer Banner */}
        <div className="mt-10 sm:mt-12 rounded-2xl border border-dashed border-[var(--line)] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/40">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--mute)] bg-[var(--paper)] px-3 py-1 rounded-full border border-[var(--line)]">
              CONTINUOUS PROGRESS
            </span>
            <span className="font-serif italic text-xl text-[var(--ink)]">
              and counting →
            </span>
          </div>
          <p className="font-mono text-xs text-[var(--mute)] max-w-md sm:text-right">
            Actively engineering new RAG pipelines, autonomous agents, and algorithmic problem-solving daily.
          </p>
        </div>
      </div>
    </section>
  );
}
