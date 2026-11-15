"use client";

export const PrintButton = ({ className }: { className?: string }) => (
  <button type="button" onClick={() => window.print()} className={className}>
    Download CV
  </button>
);
