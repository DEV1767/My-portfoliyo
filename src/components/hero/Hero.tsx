// src/components/hero/Hero.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PROFILE } from '@/lib/data';
import { scrollToTarget } from '@/lib/scroll';

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [soundBlocked, setSoundBlocked] = useState(true);

  // Video autoplay attempt with sound on load, fallback to muted
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // First attempt: try playing unmuted
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          setSoundBlocked(false);
        })
        .catch(() => {
          // Browser blocked unmuted autoplay -> play muted
          video.muted = true;
          video
            .play()
            .then(() => {
              setIsPlaying(true);
              setIsMuted(true);
              setSoundBlocked(true);
            })
            .catch((e) => console.log('Autoplay muted blocked:', e));
        });
    }

    // Unlock sound on first user gesture anywhere
    const unlockSound = () => {
      if (video && video.muted) {
        video.muted = false;
        setIsMuted(false);
        setSoundBlocked(false);
      }
      cleanupGestureListeners();
    };

    const cleanupGestureListeners = () => {
      window.removeEventListener('pointerdown', unlockSound);
      window.removeEventListener('keydown', unlockSound);
      window.removeEventListener('touchend', unlockSound);
    };

    window.addEventListener('pointerdown', unlockSound, { once: true });
    window.addEventListener('keydown', unlockSound, { once: true });
    window.addEventListener('touchend', unlockSound, { once: true });

    return () => {
      cleanupGestureListeners();
    };
  }, []);

  // IntersectionObserver: pause when less than 35% visible, resume when back
  useEffect(() => {
    const heroEl = heroRef.current;
    const video = videoRef.current;
    if (!heroEl || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < 0.35) {
            video.pause();
            setIsPlaying(false);
          } else {
            video.play().catch(() => {});
            setIsPlaying(true);
          }
        });
      },
      { threshold: [0, 0.35, 0.7, 1.0] }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
      setSoundBlocked(false);
      if (video.paused) {
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[var(--paper)]"
    >
      {/* Giant outlined ghost word behind the person */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-extrabold uppercase tracking-tight text-[clamp(15vw,23vw,340px)] leading-none text-transparent opacity-90 transition-transform duration-700"
          style={{
            WebkitTextStroke: '1.5px rgba(13, 13, 13, 0.12)',
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Centred Video with mix-blend-mode: multiply */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div
          className="relative max-w-full flex items-center justify-center"
          style={{
            height: 'clamp(380px, 62svh, 1040px)',
            maxHeight: 'min(96svh, 1040px)',
          }}
        >
          <video
            ref={videoRef}
            playsInline
            loop
            preload="auto"
            muted
            className="h-full w-auto max-w-none object-contain pointer-events-auto mix-blend-multiply transition-opacity duration-500"
            style={{
              aspectRatio: '768 / 960',
            }}
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Top spacer */}
      <div className="w-full section-container relative z-20 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--mute)]">
            00 — Available for Engineering Roles
          </span>
          <span className="font-mono text-xs text-[var(--ink-2)]">
            {PROFILE.location}
          </span>
        </div>
      </div>

      {/* Bottom Content / Role & Actions */}
      <div className="w-full section-container relative z-20 mt-auto pt-48 sm:pt-36">
        <div className="max-w-2xl">
          <div className="inline-block font-mono text-xs uppercase tracking-widest text-[var(--mute)] mb-3">
            {PROFILE.role}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.045em] leading-[1.05] text-[var(--ink)] mb-6">
            Backend Developer <span className="heading-accent">&amp; Agentic AI.</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--mute)] max-w-xl mb-8 leading-relaxed">
            Engineering scalable backend architectures, autonomous AI agents with LangGraph &amp; LangChain, and production-ready RAG workflows.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToTarget('work')}
              className="btn-pill-primary"
            >
              Explore work
            </button>
            <button
              onClick={() => scrollToTarget('contact')}
              className="btn-pill-secondary"
            >
              Let&apos;s talk
            </button>
            <a
              href={PROFILE.resumePath}
              download="Shivam_Chaudhary_Resume.pdf"
              className="btn-pill-secondary"
            >
              Résumé ↓
            </a>
          </div>
        </div>
      </div>

      {/* Floating Sound Toggle Button (46px, solid ink) */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40">
        <div className="relative inline-flex">
          {soundBlocked && isMuted && (
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-35 bg-[var(--ink)]"
              aria-hidden="true"
            />
          )}
          <button
            onClick={toggleSound}
            className="w-[46px] h-[46px] rounded-full bg-[var(--ink)] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-offset-4"
            aria-label={isMuted ? 'Unmute intro video audio' : 'Mute intro video audio'}
          >
            {isMuted ? (
              // Triangle ▶ icon
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ) : (
              // Two bars ❚❚ icon
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
