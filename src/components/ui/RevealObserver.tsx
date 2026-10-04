// src/components/ui/RevealObserver.tsx
'use client';

import { useEffect } from 'react';

export function RevealObserver() {
  useEffect(() => {
    // Respect prefers-reduced-motion: if reduced, instantly mark everything as in
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      document.querySelectorAll('.rv, .rv-mask').forEach((el) => {
        el.classList.add('is-in');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const observeElements = () => {
      document.querySelectorAll('.rv:not(.is-in), .rv-mask:not(.is-in)').forEach((el) => {
        observer.observe(el);
      });
    };

    observeElements();

    // In case new DOM nodes mount dynamically
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
