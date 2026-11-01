// src/components/sections/About.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PROFILE } from '@/lib/data';

export function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const lanyardRef = useRef<HTMLDivElement | null>(null);

  // Pendulum swing with damped spring physics
  useEffect(() => {
    const el = lanyardRef.current;
    if (!el) return;

    let angle = 0;
    let velocity = 0;
    let lastX = 0;
    let rafId: number;
    let lastTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - lastX;
      lastX = e.clientX;
      // Add impulse based on horizontal mouse movement
      velocity += deltaX * 0.015;
    };

    const updatePhysics = (now: number) => {
      const dt = Math.min(32, now - lastTime) / 16;
      lastTime = now;

      // Idle gentle sway
      const idleSway = Math.sin(now * 0.0018) * 0.8;

      // Spring force returning to 0 + idle sway
      const springK = 0.04;
      const damping = 0.95;

      const force = -(angle - idleSway) * springK;
      velocity = (velocity + force * dt) * Math.pow(damping, dt);
      angle += velocity * dt;

      // Clamp max swing
      angle = Math.max(-12, Math.min(12, angle));

      if (el) {
        el.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      }

      rafId = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="about" className="section-spacing relative bg-[var(--paper)]">
      <div className="section-container">
        {/* Section tag & heading */}
        <div className="rv mb-12">
          <div className="section-tag">01 — About</div>
          <h2 className="section-heading">
            Engineering scalable systems <span className="heading-accent">&amp; agents.</span>
          </h2>
        </div>

        {/* 3-Column Equal Height Grid: minmax(0,1fr) 320px minmax(0,1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 items-stretch">
          {/* LEFT COLUMN */}
          <div className="card-surface p-8 sm:p-10 flex flex-col justify-between rv" style={{ '--i': 1 } as React.CSSProperties}>
            <div>
              <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-3">
                Bio &amp; Summary
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mb-6">
                Hi, I&apos;m {PROFILE.name.split(' ')[0]}.
              </h3>

              <p className="text-base text-[var(--ink-2)] leading-relaxed mb-4">
                {PROFILE.resumeSummary}
              </p>

              <p className="text-sm text-[var(--mute)] leading-relaxed mb-8">
                Experienced in designing end-to-end full-stack architectures, Joi-validated REST APIs, and containerized microservices.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--line)]">
              <a
                href={PROFILE.resumePath}
                download="Shivam_Chaudhary_Resume.pdf"
                className="btn-pill-primary text-xs"
              >
                Résumé ↓
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="btn-pill-secondary text-xs"
              >
                GitHub ↗
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-pill-secondary text-xs"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* CENTRE COLUMN: Hanging Lanyard ID Card */}
          <div className="flex flex-col items-center justify-start relative pt-2 rv" style={{ '--i': 2 } as React.CSSProperties}>
            {/* Hanging Pendulum Assembly */}
            <div
              ref={lanyardRef}
              className="origin-top flex flex-col items-center select-none"
              style={{ transition: 'transform 0.05s linear' }}
            >
              {/* Lanyard Strap (30x56px) with scrolling text */}
              <div className="relative w-[30px] h-[56px] bg-[#1a1a1a] rounded-t-sm overflow-hidden shadow-inner flex flex-col items-center border border-black/20">
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
                <div className="animate-marquee-vertical text-[8px] font-mono tracking-widest text-[#a9a6a0] uppercase whitespace-nowrap py-1 [writing-mode:vertical-rl]">
                  {PROFILE.name} · {PROFILE.dept} · {PROFILE.name} ·
                </div>
              </div>

              {/* Metal Buckle & Swivel Clip */}
              <div className="w-[18px] h-[10px] bg-gradient-to-b from-[#b0b0b0] via-[#e0e0e0] to-[#999999] rounded-sm shadow-sm relative -mt-0.5 border border-black/30" />
              <div className="w-[8px] h-[14px] border-2 border-[#7a7a7a] rounded-b-md -mt-0.5 relative z-10" />

              {/* ID Card with 3D Flip */}
              <div
                tabIndex={0}
                role="button"
                aria-label="Developer ID Card. Press Enter or click to flip."
                onClick={() => setIsFlipped((f) => !f)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsFlipped((f) => !f);
                  }
                }}
                className="relative w-[300px] h-[410px] cursor-pointer group focus-visible:outline-2 focus-visible:outline-[var(--ink)] [perspective:1000px] -mt-1.5"
              >
                <div
                  className="w-full h-full relative transition-transform duration-700 ease-[var(--ease)] [transform-style:preserve-3d]"
                  style={{
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 w-full h-full rounded-[24px] bg-[#0e0f18] border border-white/10 shadow-2xl p-5 flex flex-col justify-between [backface-visibility:hidden]">
                    {/* Top Punch Hole */}
                    <div className="w-10 h-2 bg-black/40 rounded-full mx-auto -mt-2 mb-2 border border-white/10 shadow-inner" />

                    {/* Gradient Top Band */}
                    <div className="bg-gradient-to-r from-[#ff2a5f] to-[#8b5cf6] text-white text-center py-1.5 rounded-lg shadow-[0_2px_12px_rgba(139,92,246,0.3)]">
                      <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
                        DEVELOPER ID
                      </span>
                    </div>

                    {/* Portrait Photo with glowing gradient ring */}
                    <div className="my-auto flex flex-col items-center">
                      <div className="relative w-[128px] h-[156px] rounded-xl p-[2px] bg-gradient-to-b from-[#8b5cf6]/40 via-white/10 to-[#ff2a5f]/40 shadow-lg group-hover:scale-[1.03] transition-transform duration-400 ease-[var(--ease)] overflow-hidden">
                        <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-[#060608]">
                          <Image
                            src="/shivam.jpg"
                            alt="Shivam Chaudhary Developer Portrait"
                            fill
                            className="object-cover object-[center_35%]"
                            sizes="128px"
                          />
                        </div>
                      </div>

                      <div className="mt-3 text-center">
                        <div className="font-bold text-sm text-white tracking-tight">
                          {PROFILE.name}
                        </div>
                        <div className="font-mono text-[11px] text-[#c084fc]">
                          {PROFILE.role}
                        </div>
                      </div>
                    </div>

                    {/* Metadata Rows */}
                    <div className="space-y-1 font-mono text-[10px] border-t border-b border-white/[0.08] py-2 text-white/80">
                      <div className="flex justify-between">
                        <span className="text-white/40">ID NO.</span>
                        <span className="font-semibold text-white">{PROFILE.idNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">DEPT.</span>
                        <span className="font-semibold text-white">{PROFILE.dept}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">VALID TILL</span>
                        <span className="font-semibold text-white">{PROFILE.validTill}</span>
                      </div>
                    </div>

                    {/* Bottom: Barcode and Hologram Sticker */}
                    <div className="flex items-center justify-between pt-1">
                      {/* Barcode Simulation in crisp white/light gray */}
                      <div className="flex items-end gap-[2px] h-6 opacity-70">
                        <span className="w-[1px] h-6 bg-white inline-block" />
                        <span className="w-[3px] h-6 bg-white inline-block" />
                        <span className="w-[2px] h-6 bg-white inline-block" />
                        <span className="w-[1px] h-6 bg-white inline-block" />
                        <span className="w-[4px] h-6 bg-white inline-block" />
                        <span className="w-[1px] h-6 bg-white inline-block" />
                        <span className="w-[2px] h-6 bg-white inline-block" />
                        <span className="w-[3px] h-6 bg-white inline-block" />
                        <span className="w-[1px] h-6 bg-white inline-block" />
                        <span className="w-[2px] h-6 bg-white inline-block" />
                        <span className="w-[4px] h-6 bg-white inline-block" />
                        <span className="w-[1px] h-6 bg-white inline-block" />
                        <span className="w-[3px] h-6 bg-white inline-block" />
                      </div>

                      {/* Holographic neon sticker */}
                      <div className="w-8 h-8 rounded-full border border-white/20 bg-gradient-to-tr from-[#8b5cf6] via-[#c084fc] to-[#ff2a5f] shadow-lg flex items-center justify-center">
                        <span className="font-mono text-[9px] font-bold text-white">
                          SC
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 w-full h-full rounded-[24px] bg-[#0e0f18] border border-white/10 shadow-2xl p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    {/* Top Punch Hole */}
                    <div className="w-10 h-2 bg-black/40 rounded-full mx-auto -mt-2 mb-2 border border-white/10 shadow-inner" />

                    <div>
                      <div className="font-mono text-[10px] font-bold tracking-widest text-[#8b5cf6] uppercase mb-3 pb-1 border-b border-white/[0.08]">
                        WHAT I AM
                      </div>

                      <div className="space-y-2.5 text-xs text-white/80">
                        <div>
                          <span className="text-white/40 block text-[10px] font-mono">ROLE</span>
                          <span className="font-semibold text-white">Backend Developer · Generative AI &amp; Agentic AI</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px] font-mono">EDUCATION</span>
                          <span className="font-semibold text-white">B.E. AI &amp; ML — JNNCE (2024–Present)</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px] font-mono">PRIMARY STACK</span>
                          <span className="font-semibold text-white">LangGraph, LangChain, Hybrid RAG, Node.js, FastAPI</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px] font-mono">KEY WORKS</span>
                          <span className="font-semibold text-white">Git RAG Assistant, AI Commander VS Code Agent, EventHub</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px] font-mono">HONOURS</span>
                          <span className="font-semibold text-white">1st Place, TCS Hackathon · 2nd Place, Mysterio 6.0</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/[0.08] pt-3">
                      <div className="font-sans font-bold text-sm text-[#ff2a5f] mb-1">
                        Shivam Chaudhary
                      </div>
                      <div className="font-mono text-[9px] text-white/40">
                        If found, say hello · {PROFILE.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center">
                <span className="font-mono text-[11px] text-[var(--mute)]">
                  {isFlipped ? 'Click to flip back' : 'Hover / Tap to flip ID'}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Quick Facts */}
          <div className="card-surface p-8 sm:p-10 flex flex-col justify-between rv" style={{ '--i': 3 } as React.CSSProperties}>
            <div>
              <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-3">
                Quick Facts
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] mb-6">
                Snapshot &amp; Ethos
              </h3>

              <div className="space-y-4 font-mono text-xs border-b border-[var(--line)] pb-6 mb-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[var(--mute)] uppercase text-[10px]">Location</span>
                  <span className="text-[var(--ink)] font-medium">{PROFILE.location}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[var(--mute)] uppercase text-[10px]">Degree &amp; College</span>
                  <span className="text-[var(--ink)] font-medium">B.E. AI &amp; ML · JNNCE</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[var(--mute)] uppercase text-[10px]">Current Experience</span>
                  <span className="text-[var(--ink)] font-medium">Freelance Web Developer · Indalnova</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[var(--mute)] uppercase text-[10px]">Email</span>
                  <span className="text-[var(--ink)] font-medium">{PROFILE.email}</span>
                </div>
              </div>
            </div>

            <blockquote className="border-l-2 border-[var(--ink)] pl-4 py-1">
              <p className="font-serif italic text-base sm:text-lg text-[var(--ink-2)] leading-snug">
                &ldquo;{PROFILE.quote}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
