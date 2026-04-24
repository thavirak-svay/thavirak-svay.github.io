"use client";

import { useEffect, useRef } from "react";

export const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // SSR safety: only run in browser environment
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    if (hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          el.classList.add("is-visible");
          hasAnimatedRef.current = true;
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
};
