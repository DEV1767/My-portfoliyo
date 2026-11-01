// src/components/Navigation.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { NAV, PROFILE } from '@/lib/data';
import { scrollToTarget } from '@/lib/scroll';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinksRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Track page scroll for header state and progress bar
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 30);

        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const p = docH > 0 ? Math.min(1, Math.max(0, y / docH)) : 0;
        setScrollProgress(p);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', ...NAV.map((n) => n.id)];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (id !== 'hero') {
                setActiveSection(id);
              }
            }
          });
        },
        { rootMargin: '-40% 0px -50% 0px' }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Update sliding indicator pill under active link
  useEffect(() => {
    const activeIdx = NAV.findIndex((n) => n.id === activeSection);
    if (activeIdx !== -1 && navLinksRef.current[activeIdx]) {
      const btn = navLinksRef.current[activeIdx];
      if (btn) {
        setIndicatorStyle({
          left: btn.offsetLeft,
          width: btn.offsetWidth,
          opacity: 1,
        });
      }
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection, scrolled]);

  // Lock body scroll and listen for ESC key when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    scrollToTarget(id);
  };

  return (
    <>
      {/* Glowing scroll-progress line running along the very top */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#ff2a5f] to-[#8b5cf6] z-[100] transition-transform duration-75 pointer-events-none origin-left shadow-[0_0_12px_rgba(255,42,95,0.8)]"
        style={{ width: '100%', transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Main navigation header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[var(--ease)] ${
          scrolled
            ? 'py-3.5 bg-[#060608]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
            : 'py-6 md:py-8 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Left: Minimalist Logo A. / S. style */}
          <button
            onClick={() => scrollToTarget('hero')}
            className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white group"
            aria-label="Back to top"
          >
            <span className="font-sans font-extrabold text-2xl">
              S<span className="text-[#ff2a5f] group-hover:text-[#c084fc] transition-colors">.</span>
            </span>
            <span className="hidden sm:inline-block text-xs font-mono font-medium text-white/40 tracking-widest pl-2 uppercase border-l border-white/10">
              {PROFILE.name}
            </span>
          </button>

          {/* Centre: Desktop Nav links pill */}
          <nav className="hidden md:flex items-center p-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md relative">
            {/* Sliding glow indicator */}
            <div
              className="absolute top-1 bottom-1 bg-white/[0.08] border border-white/10 rounded-full transition-all duration-300 ease-[var(--ease)] pointer-events-none"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
            />

            {NAV.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    navLinksRef.current[idx] = el;
                  }}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative z-10 px-4 py-1.5 text-xs font-medium tracking-wide rounded-full transition-colors duration-200 ${
                    isActive ? 'text-white font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Let's Talk button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 rounded-full text-xs font-mono font-semibold tracking-wider uppercase border border-[#8b5cf6]/50 bg-[#8b5cf6]/10 text-white hover:bg-[#8b5cf6]/20 hover:border-[#8b5cf6] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-200"
            >
              Let&apos;s Talk ↗
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl text-white bg-white/[0.05] border border-white/10 active:scale-95 transition-transform"
              aria-label="Open navigation menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen dark mobile overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-[#060608]/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden transition-all duration-400 ease-[var(--ease)] ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-2xl text-white">
            S<span className="text-[#ff2a5f]">.</span>
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-10 h-10 rounded-full border border-white/10 text-white flex items-center justify-center text-lg bg-white/[0.05]"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-6 my-auto">
          {NAV.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group flex items-baseline gap-4 text-left transition-transform duration-300 hover:translate-x-2"
              style={{
                transitionDelay: `${idx * 40}ms`,
              }}
            >
              <span className="font-mono text-xs text-[#8b5cf6]">{item.index} —</span>
              <span className="text-3xl font-bold tracking-tight text-white group-hover:text-[#c084fc] transition-colors">
                {item.label}
              </span>
            </button>
          ))}
          <button
            onClick={() => handleNavClick('contact')}
            className="mt-4 px-6 py-3 rounded-full text-center font-mono text-xs uppercase tracking-widest font-bold bg-gradient-to-r from-[#ff2a5f] to-[#8b5cf6] text-white shadow-lg shadow-[#8b5cf6]/30"
          >
            Let&apos;s Talk ↗
          </button>
        </nav>

        <div className="pt-6 border-t border-white/10 flex flex-col gap-2 font-mono text-xs text-white/50">
          <div className="text-white font-semibold">{PROFILE.email}</div>
          <div>{PROFILE.location}</div>
        </div>
      </div>
    </>
  );
}
