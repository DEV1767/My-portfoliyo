// src/components/sections/Contact.tsx
'use client';

import React, { useState } from 'react';
import { PROFILE } from '@/lib/data';
import { scrollToTarget } from '@/lib/scroll';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const headingLine1 = "Let's build";
  const headingLine2 = 'something together.';

  return (
    <section id="contact" className="section-spacing relative bg-[var(--paper)] border-t border-[var(--line)]">
      <div className="section-container">
        {/* Section tag */}
        <div className="section-tag rv">06 — Contact</div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          {/* Interactive Hopping Heading */}
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--ink)] leading-[1.08] select-none">
              <span className="block mb-2">
                {headingLine1.split('').map((char, i) => (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-200 hover:-translate-y-3 cursor-default"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
              <span className="block">
                {headingLine2.split('').map((char, i) => (
                  <span
                    key={i}
                    className={`inline-block transition-transform duration-200 hover:-translate-y-3 cursor-default ${
                      i >= 10 ? 'heading-accent' : ''
                    }`}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </h2>
          </div>

          {/* Rotating "Say Hello" circular text badge */}
          <div className="relative w-32 h-32 flex-shrink-0 mx-auto lg:mx-0">
            <div className="w-full h-full animate-spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="textPathCircle"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="font-mono text-[9px] uppercase tracking-[0.24em] fill-[var(--ink)]">
                  <textPath href="#textPathCircle" startOffset="0%">
                    • SAY HELLO • GET IN TOUCH • SHIVAM •
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[var(--ink)] text-white flex items-center justify-center font-mono text-xs">
              ↗
            </div>
          </div>
        </div>

        {/* Email & Contact Details Card */}
        <div className="card-surface p-8 sm:p-12 mb-20 rv">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[var(--line)]">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] block mb-2">
                DIRECT INBOX
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] hover:underline decoration-2 underline-offset-8"
                >
                  {PROFILE.email}
                </a>

                {/* Copy Chip */}
                <button
                  onClick={handleCopyEmail}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium border transition-all duration-200 ${
                    copied
                      ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                      : 'border-[var(--line)] bg-[var(--paper)] text-[var(--ink-2)] hover:border-[var(--ink)]'
                  }`}
                  aria-live="polite"
                >
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] block mb-2">
                PHONE (CALL / WHATSAPP)
              </span>
              <a
                href={PROFILE.phoneHref}
                className="text-xl sm:text-2xl font-mono font-semibold text-[var(--ink)] hover:underline"
              >
                {PROFILE.phone}
              </a>
            </div>
          </div>

          {/* Social Links Row strictly from resume */}
          <div className="pt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
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
              <a
                href={PROFILE.leetcode}
                target="_blank"
                rel="noreferrer"
                className="btn-pill-secondary text-xs"
              >
                LeetCode ↗
              </a>
              <a
                href={PROFILE.resumePath}
                download="Shivam_Chaudhary_Resume.pdf"
                className="btn-pill-primary text-xs"
              >
                Download Résumé ↓
              </a>
            </div>

            <div className="font-mono text-xs text-[var(--mute)]">
              Based in {PROFILE.location}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--mute)]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All details from résumé.
          </div>

          <div className="flex items-center gap-6">
            <span>Built with Next.js &amp; React</span>
            <button
              onClick={() => scrollToTarget('hero')}
              className="text-[var(--ink)] hover:underline font-semibold"
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 22s linear infinite;
        }
      `}</style>
    </section>
  );
}
