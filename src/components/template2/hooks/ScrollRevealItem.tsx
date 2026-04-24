"use client";

import React, { ReactNode } from "react";
import { useScrollReveal } from "./useScrollReveal";

interface ScrollRevealItemProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isLeft?: boolean;
}

export const ScrollRevealItem = ({
  children,
  className = "",
  style,
  isLeft = false,
}: ScrollRevealItemProps) => {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`phil-item ${isLeft ? "from-left" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
