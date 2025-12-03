"use client";

import { cn } from "../utils/helpers";

export const TechMarker = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "absolute w-3 h-3 border-t border-l border-white/30 opacity-50",
      className
    )}
  />
);
