// src/components/App.tsx
'use client';

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Work } from '@/components/sections/Work';
import { Experience } from '@/components/sections/Experience';
import { Achievements } from '@/components/sections/Achievements';
import { Contact } from '@/components/sections/Contact';
import { RevealObserver } from '@/components/ui/RevealObserver';

export function App() {
  return (
    <div className="relative min-h-screen bg-[var(--paper)] text-[var(--ink)] overflow-x-clip">
      <RevealObserver />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}
