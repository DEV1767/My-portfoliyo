// src/components/sections/Work.tsx
'use client';

import React, { useState } from 'react';
import { PROJECTS, Project } from '@/lib/data';
import { TechLogo } from '@/components/ui/TechLogo';

export function Work() {
  const [activeProject, setActiveProject] = useState<string>(PROJECTS[0].id);

  return (
    <section id="work" className="section-spacing relative bg-[var(--paper)]">
      <div className="section-container">
        {/* Section tag & heading */}
        <div className="rv mb-12">
          <div className="section-tag">03 — Selected Work</div>
          <h2 className="section-heading">
            Things I&apos;ve built with <span className="heading-accent">Agentic AI.</span>
          </h2>
        </div>

        {/* DESKTOP: Expanding Horizontal Accordion Gallery (min(78svh, 640px)) */}
        <div className="hidden lg:flex flex-row gap-4 h-[clamp(560px,78svh,640px)] w-full">
          {PROJECTS.map((project) => {
            const isOpen = activeProject === project.id;

            if (!isOpen) {
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  onFocus={() => setActiveProject(project.id)}
                  className="flex-[1] min-w-[80px] max-w-[96px] card-surface py-8 px-4 flex flex-col justify-between items-center transition-all duration-500 ease-[var(--ease)] hover:bg-white group cursor-pointer"
                  aria-label={`Open ${project.title}`}
                >
                  <span className="font-mono text-xs font-semibold text-[var(--mute)]">
                    {project.index}
                  </span>

                  <div className="my-auto [writing-mode:vertical-rl] rotate-180 font-bold text-base tracking-tight text-[var(--ink)] group-hover:text-[var(--mute)] transition-colors whitespace-nowrap">
                    {project.title.split('—')[0].trim()}
                  </div>

                  <div className="w-9 h-9 rounded-full border border-[var(--line)] flex items-center justify-center font-mono text-sm text-[var(--ink)] group-hover:rotate-90 group-hover:border-[var(--ink)] transition-transform duration-300">
                    +
                  </div>
                </button>
              );
            }

            return (
              <div
                key={project.id}
                className="flex-[8] card-surface p-8 sm:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 ease-[var(--ease)] shadow-xl relative"
              >
                {/* Content Grid: Left side text & features, Right side Illustrative UI */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-full items-stretch">
                  {/* LEFT SIDE: Details */}
                  <div className="flex flex-col justify-between overflow-y-auto pr-2">
                    <div>
                      {/* Top kicker and index */}
                      <div className="flex items-center gap-3 font-mono text-xs text-[var(--mute)] mb-2">
                        <span className="font-bold text-[var(--ink)]">{project.index}</span>
                        <span>/</span>
                        <span>{project.kicker}</span>
                        <span>·</span>
                        <span>{project.date}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mb-4">
                        {project.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[var(--ink-2)] leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* 2-column feature list */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {project.features.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[var(--mute)] leading-snug"
                          >
                            <span className="font-mono text-[var(--ink)] mt-0.5">•</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom: Tech stack chips + GitHub link */}
                    <div className="pt-4 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-1.5 max-w-lg">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--paper)] text-[var(--ink-2)] border border-[var(--line)]"
                          >
                            <TechLogo name={t} size={14} />
                            <span>{t}</span>
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-pill-primary text-xs"
                          >
                            View on GitHub ↗
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-pill-secondary text-xs"
                          >
                            Live Demo ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Illustrative Mini-UI */}
                  <div className="relative rounded-2xl bg-[#0d0d0d] text-white p-5 flex flex-col justify-between overflow-hidden border border-black/10 shadow-inner">
                    <IllustrativeUi project={project} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE: Vertical Accordion */}
        <div className="flex lg:hidden flex-col gap-4">
          {PROJECTS.map((project) => {
            const isOpen = activeProject === project.id;

            return (
              <div
                key={project.id}
                className="card-surface overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveProject(isOpen ? '' : project.id)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div>
                    <div className="font-mono text-xs text-[var(--mute)] mb-1">
                      {project.index} — {project.kicker}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                      {project.title.split('—')[0].trim()}
                    </h3>
                  </div>
                  <span
                    className={`w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center font-mono text-sm transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-[var(--ink)] text-white' : ''
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="p-6 pt-0 border-t border-[var(--line)] space-y-6">
                    <p className="text-sm text-[var(--ink-2)] leading-relaxed mt-4">
                      {project.description}
                    </p>

                    <div className="space-y-2">
                      {project.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[var(--mute)]">
                          <span className="font-mono text-[var(--ink)]">•</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="h-64 rounded-xl bg-[#0d0d0d] text-white p-4 relative overflow-hidden">
                      <IllustrativeUi project={project} />
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--paper)] text-[var(--ink-2)] border border-[var(--line)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-pill-primary text-xs w-full justify-center"
                        >
                          View on GitHub ↗
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-pill-secondary text-xs w-full justify-center"
                        >
                          Live Demo ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Illustrative mini-UI rendered in pure JSX/CSS with grayscale aesthetic,
 * clearly badged as an "Illustrative UI" to prevent mistaking for real screenshots.
 */
function IllustrativeUi({ project }: { project: Project }) {
  if (project.illustrativeUiType === 'rag-terminal') {
    return (
      <div className="h-full flex flex-col justify-between font-mono text-xs">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block" />
            <span className="text-[11px] text-neutral-400 ml-2">git-rag-agent // LangGraph</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-white/10 text-neutral-300">
            Illustrative UI
          </span>
        </div>

        {/* Terminal Stream Content */}
        <div className="my-auto space-y-3 py-4 text-[11px] text-neutral-300">
          <div className="text-neutral-400">
            &gt; git_rag.query(&ldquo;How does hybrid retrieval work in this repo?&rdquo;)
          </div>
          <div className="p-2.5 rounded bg-neutral-900 border border-white/10 space-y-1">
            <div className="text-emerald-400 text-[10px]">
              ✓ [JEV Intent Classifier]: RETRIEVAL_AND_TOOL_SELECTION
            </div>
            <div className="text-neutral-400 text-[10px]">
              • Step 1: BM25 Lexical Scan (top 15 chunks)
            </div>
            <div className="text-neutral-400 text-[10px]">
              • Step 2: Qdrant Vector Semantic Match (cosine dist &lt; 0.18)
            </div>
            <div className="text-neutral-400 text-[10px]">
              • Step 3: Cross-Encoder Rerank (score: 0.942)
            </div>
          </div>
          <div className="text-neutral-200 bg-neutral-800/80 p-3 rounded border border-white/10">
            <span className="text-blue-400 font-semibold">[Grounded Answer]:</span> Hybrid RAG combines BM25 for precise token matching and Qdrant dense vectors for semantic context, passed through Cross-Encoder reranking before Groq LLM inference.
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-white/10 flex justify-between text-[10px] text-neutral-500">
          <span>MCP TOOL: connected</span>
          <span>LATENCY: 142ms</span>
        </div>
      </div>
    );
  }

  if (project.illustrativeUiType === 'ide-debugger') {
    return (
      <div className="h-full flex flex-col justify-between font-mono text-xs">
        {/* IDE Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block" />
            <span className="text-[11px] text-neutral-400 ml-2">VS Code // AI Commander Panel</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-white/10 text-neutral-300">
            Illustrative UI
          </span>
        </div>

        {/* Captured Error & AI Guidance */}
        <div className="my-auto space-y-3 py-4 text-[11px]">
          <div className="p-2.5 rounded bg-neutral-900 border border-red-500/20 text-red-300">
            <div className="text-[10px] text-neutral-400 mb-1">TERMINAL ERROR INTERCEPTED:</div>
            <code>Uncaught TypeError: Cannot read properties of undefined (reading &apos;verify&apos;)</code>
          </div>

          <div className="p-3 rounded bg-neutral-900/90 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-amber-400 font-semibold">AI DIAGNOSIS: MEDIUM RISK</span>
              <span className="text-neutral-400">authMiddleware.ts:42</span>
            </div>
            <p className="text-neutral-300 text-[11px] leading-snug">
              Missing null check on authorization bearer header before JWT token decoding.
            </p>
            <div className="bg-black/60 p-2 rounded text-emerald-400 text-[10px]">
              + Suggested fix: const token = authHeader?.split(&apos; &apos;)[1];
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-white/10 flex justify-between text-[10px] text-neutral-500">
          <span>V2 AUTH ENGINE: Active</span>
          <span>V3 MCP LOG ADAPTER: Building</span>
        </div>
      </div>
    );
  }

  // EventHub Dashboard
  return (
    <div className="h-full flex flex-col justify-between font-mono text-xs">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block" />
          <span className="text-[11px] text-neutral-400 ml-2">eventhub.prod // Metrics</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-white/10 text-neutral-300">
          Illustrative UI
        </span>
      </div>

      {/* Metrics Row */}
      <div className="my-auto space-y-3 py-4">
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-3 rounded bg-neutral-900 border border-white/10">
            <span className="text-neutral-400 block">CONCURRENT USERS</span>
            <span className="text-lg font-bold text-white">1,000+</span>
            <span className="text-emerald-400 block mt-1">Live in Production</span>
          </div>
          <div className="p-3 rounded bg-neutral-900 border border-white/10">
            <span className="text-neutral-400 block">REDIS CACHE HIT</span>
            <span className="text-lg font-bold text-white">~100ms</span>
            <span className="text-emerald-400 block mt-1">85% Faster Fetch</span>
          </div>
        </div>

        <div className="p-3 rounded bg-neutral-900/80 border border-white/10 space-y-1 text-[11px]">
          <div className="text-neutral-400 text-[10px]">ACTIVE EVENTS QUEUE</div>
          <div className="flex justify-between text-neutral-300">
            <span>• TCS Hackathon @ JNNCE</span>
            <span className="text-amber-400 font-semibold">1st Prize 🏆</span>
          </div>
          <div className="flex justify-between text-neutral-300">
            <span>• Mysterio 6.0 Bug Bounty</span>
            <span className="text-emerald-400">2nd Prize</span>
          </div>
          <div className="flex justify-between text-neutral-300">
            <span>• Hack Fest 1.0 JNNCE</span>
            <span className="text-neutral-500">Organized</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex justify-between text-[10px] text-neutral-500">
        <span>SECURITY: Rate Limited</span>
        <span>AUTH: JWT / Joi Validated</span>
      </div>
    </div>
  );
}
