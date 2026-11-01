// src/components/hero/Hero.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { PROFILE } from '@/lib/data';
import { scrollToTarget } from '@/lib/scroll';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] w-full flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#8b5cf6]/10 via-[#ff2a5f]/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="section-container w-full grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-8 items-center">
        {/* Left: Content */}
        <div className="flex flex-col items-start z-10">
          {/* Small Title Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#ff2a5f] shadow-[0_0_10px_#ff2a5f] animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-white/80 uppercase">
              AVAILABLE FOR ENGINEERING ROLES
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-[-0.04em] leading-[1.08] text-white mb-6">
            Building intelligent
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] via-[#f472b6] to-[#ff4d6d]">
              backend &amp; AI systems
            </span>
            <br />
            that scale reliably.
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/70 max-w-xl mb-8 leading-relaxed font-normal">
            Hi, I&apos;m <strong className="text-white font-semibold">{PROFILE.name}</strong> — a{' '}
            <span className="text-[#c084fc] font-medium">{PROFILE.role}</span>. Passionate about
            engineering high-throughput backend logic, autonomous multi-agent systems with LangGraph,
            and production RAG pipelines.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={() => scrollToTarget('work')}
              className="btn-pill-primary group"
            >
              Explore My Work
              <span className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </button>

            <button
              onClick={() => scrollToTarget('contact')}
              className="btn-pill-secondary"
            >
              Contact Me
            </button>

            <a
              href={PROFILE.resumePath}
              download="Shivam_Chaudhary_Resume.pdf"
              className="px-5 py-3 rounded-full text-xs font-mono font-medium tracking-wider text-white/60 hover:text-white border border-white/[0.08] hover:border-white/25 transition-all"
            >
              Résumé ↓
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.08] w-full max-w-lg">
            <div>
              <strong className="block text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                01
              </strong>
              <p className="text-xs text-white/50 font-mono uppercase tracking-wider mt-1">
                Autonomous<br />AI Agents
              </p>
            </div>

            <div>
              <strong className="block text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                02
              </strong>
              <p className="text-xs text-white/50 font-mono uppercase tracking-wider mt-1">
                Scalable<br />Backend APIs
              </p>
            </div>

            <div>
              <strong className="block text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                03
              </strong>
              <p className="text-xs text-white/50 font-mono uppercase tracking-wider mt-1">
                7+ Contests<br />500+ LeetCode
              </p>
            </div>
          </div>
        </div>

        {/* Right: Signature Profile Card Area */}
        <div className="relative flex justify-center items-center py-6">
          {/* Ambient Background Circles */}
          <div className="absolute -top-10 -left-6 w-64 h-64 bg-[#8b5cf6]/25 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-10 -right-6 w-64 h-64 bg-[#ff2a5f]/20 rounded-full blur-[80px] pointer-events-none" />

          {/* Profile Card Container */}
          <div className="relative w-full max-w-[380px] bg-[#0c0d16]/90 border border-white/[0.12] rounded-3xl p-5 shadow-[0_24px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-transform duration-500 hover:scale-[1.01]">
            {/* Card Header Strip */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08] font-mono text-[11px] tracking-widest text-white/50 uppercase">
              <span className="flex items-center gap-1.5 text-white/80 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a5f]" />
                SHIVAM / 2026
              </span>
              <span>01—01</span>
            </div>

            {/* Profile Photo Area */}
            <div className="relative w-full aspect-[4/4.8] rounded-2xl overflow-hidden bg-[#121320] border border-white/[0.08] mb-4 group">
              <Image
                src="/shivam.jpg"
                alt={PROFILE.name}
                fill
                priority
                className="object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d16] via-transparent to-transparent opacity-25 pointer-events-none" />
            </div>

            {/* Card Footer Strip */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <small className="block font-mono text-[10px] tracking-widest text-[#8b5cf6] font-semibold uppercase">
                  ROLE
                </small>
                <h3 className="font-sans font-extrabold text-sm tracking-tight text-white leading-tight uppercase mt-0.5">
                  BACKEND &amp; AGENTIC<br />AI DEVELOPER
                </h3>
              </div>

              <span className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono text-sm text-[#c084fc] font-bold shadow-inner">
                &lt;/&gt;
              </span>
            </div>
          </div>

          {/* Floating Pill Tag 1 (Top-Right) */}
          <div className="absolute -top-3 right-2 sm:right-6 px-4 py-2 rounded-full bg-[#0a0b12]/90 border border-[#8b5cf6]/40 text-xs font-mono font-medium text-white shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2 animate-bounce [animation-duration:4s]">
            <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
            LANGGRAPH • FASTAPI • RAG
          </div>

          {/* Floating Pill Tag 2 (Bottom-Left) */}
          <div className="absolute -bottom-3 left-2 sm:left-4 px-4 py-2 rounded-full bg-[#0a0b12]/90 border border-[#ff2a5f]/40 text-xs font-mono font-medium text-white shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff2a5f]" />
            ARCHITECT / BUILD / SCALE
          </div>
        </div>
      </div>
    </section>
  );
}
