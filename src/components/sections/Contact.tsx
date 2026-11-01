// src/components/sections/Contact.tsx
'use client';

import React, { useState } from 'react';
import { PROFILE } from '@/lib/data';

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

  return (
    <section id="contact" className="section-spacing relative bg-[#060608] border-t border-white/[0.08]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#8b5cf6]/10 via-[#ff2a5f]/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div className="rv max-w-2xl">
            <div className="section-tag">06 — Contact</div>
            <h2 className="section-heading !mb-4">
              Have an idea?
              <br />
              <span className="heading-accent">Let&apos;s build it.</span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Whether it&apos;s an autonomous agent workflow, high-performance backend architecture, production RAG pipeline, or engineering opportunity, feel free to reach out.
            </p>
          </div>

          {/* Rotating "Say Hello" badge */}
          <div className="relative w-32 h-32 flex-shrink-0 mx-auto lg:mx-0">
            <div className="w-full h-full animate-spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="textPathCircle"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="font-mono text-[9px] uppercase tracking-[0.24em] fill-white/70">
                  <textPath href="#textPathCircle" startOffset="0%">
                    • SAY HELLO • GET IN TOUCH • SHIVAM •
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff2a5f] to-[#8b5cf6] text-white flex items-center justify-center font-mono text-xs shadow-lg shadow-[#8b5cf6]/30">
              ↗
            </div>
          </div>
        </div>

        {/* Direct Contact Card */}
        <div className="card-surface p-8 sm:p-12 mb-12 rv">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 border-b border-white/[0.08]">
            {/* Direct Email */}
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#c084fc] font-semibold block mb-2">
                DIRECT INBOX
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white hover:text-[#c084fc] transition-colors break-all"
                >
                  {PROFILE.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium border border-white/15 bg-white/[0.05] text-white/80 hover:border-white/40 hover:text-white transition-colors"
                  aria-live="polite"
                >
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Direct Phone / WhatsApp */}
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#c084fc] font-semibold block mb-2">
                PHONE (CALL / WHATSAPP)
              </span>
              <a
                href={PROFILE.phoneHref}
                className="text-2xl sm:text-3xl font-mono font-bold text-white hover:text-[#c084fc] transition-colors block"
              >
                {PROFILE.phone}
              </a>
              <span className="font-mono text-xs text-white/40 mt-1 block">
                Based in {PROFILE.location}
              </span>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="pt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PROFILE.email}`}
                className="btn-pill-primary text-xs"
              >
                Email Directly ↗
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
                className="px-4 py-2.5 rounded-full text-xs font-mono font-medium tracking-wider text-white/70 hover:text-white border border-white/15 hover:border-white/40 transition-colors"
              >
                Download Résumé ↓
              </a>
            </div>

            <div className="font-mono text-xs text-white/40">
              Open for immediate engineering roles
            </div>
          </div>
        </div>
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
