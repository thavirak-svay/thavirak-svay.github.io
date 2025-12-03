import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import styles from "../Template3.module.css";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton = ({
  children,
  className = "",
  onClick,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const xPos = clientX - (left + width / 2);
    const yPos = clientY - (top + height / 2);
    x.set(xPos * 0.1);
    y.set(yPos * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden group rounded-none border border-blue-500/30 px-6 py-3 bg-blue-900/10 hover:bg-blue-500/10 transition-colors ${styles.template3FontMono} ${className}`}
    >
      <span className="relative z-10 text-sm font-bold tracking-wider uppercase flex items-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-blue-500/5 transition-transform duration-300 ease-out" />
    </motion.button>
  );
};
