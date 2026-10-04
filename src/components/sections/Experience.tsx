// src/components/sections/Experience.tsx
'use client';

import React, { useRef } from 'react';
import { useScrollProgress } from '@/lib/hooks';
import { EXPERIENCE, EDUCATION } from '@/lib/data';

interface TimelineStop {
  id: string;
  year: string;
  period: string;
  title: string;
  place: string;
  category: 'Education' | 'Experience' | 'Next';
  details: string[];
  stack?: string[];
  isNext?: boolean;
}

const TIMELINE_STOPS: TimelineStop[] = [
  {
    id: 'jnnce',
    year: '2024',
    period: EDUCATION[0].period,
    title: EDUCATION[0].degree,
    place: EDUCATION[0].institution + ' — ' + EDUCATION[0].location,
    category: 'Education',
    details: [
      EDUCATION[0].details,
      'Active developer focusing on Data Structures, Algorithms, and production software architectures.',
    ],
  },
  {
    id: 'indalnova',
    year: '2025',
    period: EXPERIENCE[0].period,
    title: EXPERIENCE[0].role + ' — ' + EXPERIENCE[0].company,
    place: EXPERIENCE[0].location,
    category: 'Experience',
    details: EXPERIENCE[0].bullets,
    stack: EXPERIENCE[0].stack,
  },
  {
    id: 'agentic-ai',
    year: '2026',
    period: '08/2026 – Present',
    title: 'Agentic AI & Systems Engineering',
    place: 'Git RAG & AI Commander Initiatives',
    category: 'Experience',
    details: [
      'Built Git RAG: an Agentic AI repository assistant with LangGraph, Hybrid RAG (Qdrant + BM25), and GitHub MCP.',
      'Developed AI Commander: TypeScript VS Code extension capturing terminal error streams for automated debugging.',
      'Cut database fetch latency by ~85% with Redis query caching for 1,000+ concurrent users on EventHub.',
    ],
    stack: ['Python', 'FastAPI', 'LangGraph', 'TypeScript', 'Docker', 'Redis'],
  },
  {
    id: 'next',
    year: 'Next',
    period: 'Immediate / Forward',
    title: 'Your Team?',
    place: 'Worldwide (Remote / Onsite)',
    category: 'Next',
    details: [
      'Open to backend engineering and Generative & Agentic AI roles.',
      'Ready to architect resilient production APIs, autonomous agent workflows, and scalable data layers.',
    ],
    isNext: true,
  },
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollProgress = useScrollProgress(containerRef);

  return (
    <section id="experience" className="section-spacing relative bg-[var(--paper)]">
      <div className="section-container" ref={containerRef}>
        {/* Section tag & heading */}
        <div className="rv mb-16">
          <div className="section-tag">04 — Experience &amp; Path</div>
          <h2 className="section-heading">
            Education and experience as one <span className="heading-accent">path.</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10">
          {/* Vertical Spine Base */}
          <div
            className="absolute left-[11px] sm:left-[19px] top-0 bottom-0 w-[2px] bg-[var(--line)]"
            aria-hidden="true"
          />

          {/* Vertical Spine Drawn by Scroll Progress */}
          <div
            className="absolute left-[11px] sm:left-[19px] top-0 w-[2px] bg-[var(--ink)] origin-top transition-transform duration-75 pointer-events-none"
            style={{
              height: '100%',
              transform: `scaleY(${Math.min(1, Math.max(0, scrollProgress * 1.15))})`,
            }}
            aria-hidden="true"
          />

          {/* Timeline Stops */}
          <div className="space-y-12 sm:space-y-16">
            {TIMELINE_STOPS.map((stop, idx) => {
              const threshold = (idx + 0.3) / TIMELINE_STOPS.length;
              const isLit = scrollProgress >= threshold;

              if (stop.isNext) {
                return (
                  <div key={stop.id} className="relative flex items-start gap-6 group">
                    {/* Node Dot */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center -ml-[35px] sm:-ml-[43px] z-10 transition-all duration-300 ${
                        isLit
                          ? 'bg-[var(--ink)] text-white shadow-md'
                          : 'bg-white border-2 border-dashed border-[var(--mute)] text-[var(--mute)]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current" />
                    </div>

                    {/* Dashed Card: Next - Your team? */}
                    <div
                      className={`flex-1 p-8 rounded-[26px] border-2 border-dashed transition-all duration-400 ${
                        isLit
                          ? 'border-[var(--ink)] bg-white shadow-md'
                          : 'border-[var(--line)] bg-transparent hover:border-[var(--mute)]'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--mute)] mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[var(--soft)] text-[var(--ink)] font-semibold">
                          NEXT STEP
                        </span>
                        <span>{stop.period}</span>
                      </div>

                      <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)] mb-2">
                        Next — {stop.title}
                      </h3>
                      <p className="font-mono text-xs text-[var(--mute)] mb-4">{stop.place}</p>

                      <div className="space-y-1.5 text-sm text-[var(--ink-2)] mb-6">
                        {stop.details.map((d, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="font-mono text-[var(--ink)]">•</span>
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>

                      <a
                        href="#contact"
                        className="btn-pill-primary text-xs"
                      >
                        Let&apos;s build together ↗
                      </a>
                    </div>
                  </div>
                );
              }

              return (
                <div key={stop.id} className="relative flex items-start gap-6 group">
                  {/* Node Dot */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center -ml-[35px] sm:-ml-[43px] z-10 transition-all duration-300 ${
                      isLit
                        ? 'bg-[var(--ink)] ring-4 ring-black/10'
                        : 'bg-white border-2 border-[var(--line)]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isLit ? 'bg-white' : 'bg-transparent'
                      }`}
                    />
                  </div>

                  {/* Stop Card */}
                  <div
                    className={`flex-1 card-surface p-6 sm:p-8 transition-all duration-400 ${
                      isLit ? 'border-l-4 border-l-[var(--ink)]' : 'border-l-4 border-l-transparent'
                    }`}
                  >
                    {/* Meta line: Year badge, Category, Period */}
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--mute)] mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[var(--ink)] text-white font-semibold">
                          {stop.year}
                        </span>
                        <span className="uppercase tracking-wider">{stop.category}</span>
                      </div>
                      <span>{stop.period}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] mb-1">
                      {stop.title}
                    </h3>
                    <p className="font-mono text-xs text-[var(--mute)] mb-4">{stop.place}</p>

                    {/* Bullets */}
                    <div className="space-y-2 text-sm text-[var(--ink-2)] mb-4">
                      {stop.details.map((d, i) => (
                        <div key={i} className="flex items-start gap-2 leading-relaxed">
                          <span className="font-mono text-[var(--ink)] mt-0.5">•</span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack tags */}
                    {stop.stack && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--line)]">
                        {stop.stack.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--paper)] text-[var(--mute)]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
