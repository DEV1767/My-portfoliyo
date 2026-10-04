// src/components/sections/Skills.tsx
'use client';

import React, { useState } from 'react';
import { SKILL_GROUPS, SkillElement, SkillFamily } from '@/lib/data';
import { TechLogo, isBrand } from '@/components/ui/TechLogo';

const FAMILIES: ('All' | SkillFamily)[] = [
  'All',
  'Languages',
  'AI & Agentic',
  'Backend',
  'Tools',
  'Concepts',
];

export function Skills() {
  const [selectedFamily, setSelectedFamily] = useState<'All' | SkillFamily>('All');
  const [activeSkill, setActiveSkill] = useState<SkillElement>(SKILL_GROUPS[0]);

  return (
    <section id="skills" className="section-spacing relative bg-[var(--paper)]">
      <div className="section-container">
        {/* Section tag & heading */}
        <div className="rv mb-12">
          <div className="section-tag">02 — Stack &amp; Skills</div>
          <h2 className="section-heading">
            The periodic table of my <span className="heading-accent">stack.</span>
          </h2>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            {FAMILIES.map((family) => {
              const isSelected = selectedFamily === family;
              return (
                <button
                  key={family}
                  onClick={() => setSelectedFamily(family)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 ${
                    isSelected
                      ? 'bg-[var(--ink)] text-white shadow-sm'
                      : 'bg-white/80 border border-[var(--line)] text-[var(--ink-2)] hover:border-[var(--ink)]'
                  }`}
                >
                  {family}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid + Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Periodic Elements Grid: 8 cols on desktop, 4 on mobile */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 sm:gap-3">
            {SKILL_GROUPS.map((skill, index) => {
              const row = Math.floor(index / 8);
              const col = index % 8;
              const delay = (row + col) * 40;
              const matchesFilter = selectedFamily === 'All' || skill.family === selectedFamily;
              const isSelected = activeSkill.num === skill.num;

              return (
                <button
                  key={skill.num}
                  onClick={() => setActiveSkill(skill)}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onFocus={() => setActiveSkill(skill)}
                  className={`relative p-2.5 sm:p-3 aspect-square rounded-2xl flex flex-col justify-between text-left transition-all duration-300 ease-[var(--ease)] ${
                    matchesFilter
                      ? 'opacity-100 scale-100 bg-white'
                      : 'opacity-20 scale-[0.97] pointer-events-none bg-white/40'
                  } ${
                    isSelected
                      ? 'ring-2 ring-[var(--ink)] shadow-md -translate-y-1'
                      : 'border border-[var(--line)] hover:border-[var(--ink-2)] hover:-translate-y-0.5'
                  }`}
                  style={{
                    animationDelay: `${delay}ms`,
                  }}
                  aria-label={`${skill.name} (${skill.symbol}) - ${skill.family}`}
                >
                  {/* Top row: atomic number + family dot */}
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[9px] text-[var(--mute)]">
                      {String(skill.num).padStart(2, '0')}
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: skill.accentColor || '#77756f' }}
                    />
                  </div>

                  {/* 2-letter symbol */}
                  <div className="font-mono font-bold text-lg sm:text-xl text-[var(--ink)] tracking-tight">
                    {skill.symbol}
                  </div>

                  {/* Element Name */}
                  <div className="font-mono text-[10px] text-[var(--mute)] truncate w-full">
                    {skill.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Inspector Panel (320px wide) */}
          <aside className="lg:sticky lg:top-24 w-full">
            <div className="card-surface p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden">
              {/* Soft background glow */}
              {activeSkill.accentColor && (
                <div
                  className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500"
                  style={{ backgroundColor: activeSkill.accentColor }}
                />
              )}

              {/* Big 150px Logo with pop animation */}
              <div
                key={activeSkill.num}
                className="w-[150px] h-[150px] flex items-center justify-center my-4 animate-pop transition-transform duration-300"
              >
                <TechLogo
                  name={activeSkill.logoKey}
                  size={120}
                  glow
                  accentColor={activeSkill.accentColor}
                />
              </div>

              {/* Skill Details */}
              <div className="w-full pt-4 border-t border-[var(--line)]">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="font-mono text-xs text-[var(--mute)] px-2 py-0.5 rounded bg-[var(--soft)]">
                    #{String(activeSkill.num).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded border border-[var(--line)] text-[var(--ink-2)]">
                    {activeSkill.family}
                  </span>
                  <span className="font-mono text-xs text-[var(--mute)]">
                    {isBrand(activeSkill.logoKey) ? 'Brand' : 'Concept'}
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)] mb-1">
                  {activeSkill.name}
                </h3>
                <div className="font-mono text-sm text-[var(--mute)] mb-6">
                  Symbol: &ldquo;{activeSkill.symbol}&rdquo;
                </div>

                {/* Projects using this skill */}
                <div className="text-left w-full">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-2">
                    Used In Projects
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeSkill.projects.map((proj) => (
                      <span
                        key={proj}
                        className="px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--paper)] text-[var(--ink-2)] border border-[var(--line)]"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        @keyframes pop {
          0% {
            transform: scale(0.85);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-pop {
          animation: pop 0.35s var(--ease) forwards;
        }
      `}</style>
    </section>
  );
}
