'use client';

import { useEffect } from 'react';

export function FaviconAnimator() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const frames = ['/favicon-frame-1.svg', '/favicon-frame-2.svg'];
    const intervalMs = 3000;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
      setFavicon(frames[0]);
      return;
    }

    preloadFrames(frames);

    let frameIndex = 0;
    let intervalId: NodeJS.Timeout | null = null;

    setFavicon(frames[0]);

    intervalId = setInterval(() => {
      frameIndex = (frameIndex + 1) % frames.length;
      setFavicon(frames[frameIndex]);
    }, intervalMs);

    const onMotionPreferenceChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        setFavicon(frames[0]);
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

    mediaQuery.addEventListener('change', onMotionPreferenceChange);

    return () => {
      if (intervalId) clearInterval(intervalId);
      mediaQuery.removeEventListener('change', onMotionPreferenceChange);
    };
  }, []);

  return null;
}

function preloadFrames(frames: string[]) {
  frames.forEach(frame => {
    const img = new Image();
    img.src = frame;
  });
}

function setFavicon(href: string) {
  if (typeof document === 'undefined') return;

  document.querySelectorAll('link[rel="icon"]').forEach(link => link.remove());

  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = href + '?v=' + Date.now();
  document.head.appendChild(link);
}