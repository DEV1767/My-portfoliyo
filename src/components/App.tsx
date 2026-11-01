// src/components/App.tsx
'use client';

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/hero/Hero';
import { Marquee } from '@/components/ui/Marquee';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Work } from '@/components/sections/Work';
import { Experience } from '@/components/sections/Experience';
import { Achievements } from '@/components/sections/Achievements';
import { Contact } from '@/components/sections/Contact';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { PROFILE } from '@/lib/data';
import { scrollToTarget } from '@/lib/scroll';

export function App() {
  return (
    <div className="relative min-h-screen bg-[#060608] text-white overflow-x-clip selection:bg-[#8b5cf6] selection:text-white">
      <CursorGlow />
      <RevealObserver />
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Achievements />
        <Contact />
      </main>

      {/* Target style Footer */}
      <footer className="w-full py-10 border-t border-white/[0.08] bg-[#07070b] text-white/50 text-xs font-mono relative z-20">
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-white/70">
            © 2026 {PROFILE.name.toUpperCase()}
          </span>

          <span className="text-white/40 tracking-wider">
            BACKEND ARCHITECTURE • AGENTIC AI
          </span>

          <button
            onClick={() => scrollToTarget('hero')}
            className="hover:text-white text-[#c084fc] font-bold tracking-wider transition-colors"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </footer>
    </div>
  );
}
