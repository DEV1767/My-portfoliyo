// src/components/ui/Marquee.tsx
'use client';

import React from 'react';

const ITEMS = [
  'BACKEND ARCHITECTURE',
  'AGENTIC AI',
  'PRODUCTION RAG',
  'LANGGRAPH',
  'FASTAPI',
  'DOCKER',
  'SCALABLE APIS',
  'PYTHON',
  'REDIS & VECTOR DBS',
  'AUTONOMOUS WORKFLOWS',
];

export function Marquee() {
  return (
    <div className="relative w-full py-5 overflow-hidden border-y border-white/[0.08] bg-[#09090f]/60 backdrop-blur-md select-none">
      {/* Subtle edge fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060608] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060608] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee">
        {/* Render twice for continuous loop */}
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="flex items-center gap-8 shrink-0 pr-8">
            {ITEMS.map((item, idx) => (
              <React.Fragment key={`${copyIndex}-${idx}`}>
                <span className="font-mono text-xs md:text-sm tracking-[0.2em] font-semibold text-white/80 uppercase">
                  {item}
                </span>
                <span className="text-[#8b5cf6] text-xs font-bold opacity-80" aria-hidden="true">
                  ✦
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

