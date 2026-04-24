'use client';

import { useEffect } from 'react';

export function FaviconAnimator() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const frames = ['/favicon-frame-1.svg', '/favicon-frame-2.svg'];
    const intervalMs = 2000;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
      setFavicon('/favicon-frame-1.svg');
      return;
    }

    let frameIndex = 0;
    let intervalId: NodeJS.Timeout | null = null;

    setFavicon(frames[0]);

    intervalId = setInterval(() => {
      frameIndex = (frameIndex + 1) % frames.length;
      setFavicon(frames[frameIndex]);
    }, intervalMs);

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        setFavicon('/favicon-frame-1.svg');
      } else {
        if (!intervalId) {
          frameIndex = 0;
          setFavicon(frames[0]);
          intervalId = setInterval(() => {
            frameIndex = (frameIndex + 1) % frames.length;
            setFavicon(frames[frameIndex]);
          }, intervalMs);
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      if (intervalId) clearInterval(intervalId);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return null;
}

function setFavicon(href: string) {
  if (typeof document === 'undefined') return;
  
  const existingLinks = document.querySelectorAll('link[rel="icon"]');
  existingLinks.forEach(link => link.remove());
  
  const newLink = document.createElement('link');
  newLink.rel = 'icon';
  newLink.type = 'image/svg+xml';
  newLink.href = href;
  document.head.appendChild(newLink);
}