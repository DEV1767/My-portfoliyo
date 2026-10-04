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
        setScrolled(y > 40);

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

  // Track active section via IntersectionObserver with rootMargin: -45% 0px -50% 0px
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
        { rootMargin: '-45% 0px -50% 0px' }
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
      {/* 2px ink scroll-progress bar running along the very top */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[var(--ink)] z-[100] transition-transform duration-75 pointer-events-none origin-left"
        style={{ width: '100%', transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Main navigation header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-[var(--ease)] ${
          scrolled ? 'py-3' : 'py-6 md:py-8'
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Left: Initials mark + full name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToTarget('hero')}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-semibold tracking-wider transition-all duration-500 ease-[var(--ease)] group ${
                scrolled
                  ? 'bg-[var(--ink)] text-[var(--paper)] shadow-md'
                  : 'border border-[var(--ink)] text-[var(--ink)] bg-transparent'
              }`}
              aria-label="Back to top"
            >
              <span className="transition-transform duration-500 ease-[var(--ease)] group-hover:rotate-[360deg] inline-block">
                SC
              </span>
            </button>

            <span
              className={`font-semibold tracking-tight text-sm md:text-base hidden sm:inline-block transition-all duration-400 ease-[var(--ease)] ${
                scrolled ? 'opacity-0 -translate-x-3 pointer-events-none' : 'opacity-100 translate-x-0'
              }`}
            >
              {PROFILE.name}
            </span>
          </div>

          {/* Centre/Right: Desktop Nav links pill */}
          <nav
            className={`hidden md:flex items-center p-1.5 rounded-full transition-all duration-400 ease-[var(--ease)] relative ${
              scrolled
                ? 'bg-white/80 backdrop-blur-md border border-[var(--line)] shadow-lg shadow-black/[0.03]'
                : 'bg-transparent border border-transparent'
            }`}
          >
            {/* Sliding ink indicator pill */}
            <div
              className="absolute top-1.5 bottom-1.5 bg-[var(--ink)] rounded-full transition-all duration-300 ease-[var(--ease)] pointer-events-none"
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
                  className={`relative z-10 px-4 py-2 text-xs md:text-sm font-medium tracking-tight rounded-full transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Pill */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wider uppercase transition-all duration-300 ${
                scrolled
                  ? 'bg-white/80 backdrop-blur-md border border-[var(--line)] shadow-sm'
                  : 'border border-[var(--line)] bg-[var(--card)]'
              }`}
              aria-label="Open navigation menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile paper overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-[var(--paper)] flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-[var(--ease)] ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          clipPath: mobileOpen ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        }}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-full border border-[var(--ink)] flex items-center justify-center font-mono text-xs font-semibold">
            SC
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center text-lg"
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
                transitionDelay: `${idx * 50}ms`,
              }}
            >
              <span className="font-mono text-xs text-[var(--mute)]">{item.index} —</span>
              <span className="text-3xl font-bold tracking-tight text-[var(--ink)] group-hover:text-[var(--mute)] transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-[var(--line)] flex flex-col gap-2 font-mono text-xs text-[var(--mute)]">
          <div className="text-[var(--ink)] font-semibold">{PROFILE.email}</div>
          <div>{PROFILE.location}</div>
        </div>
      </div>
    </>
  );
}
