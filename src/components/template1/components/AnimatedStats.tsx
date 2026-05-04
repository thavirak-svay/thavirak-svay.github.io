import React, { useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";

const AnimatedCounter = ({ value }: { value: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });
  
  useEffect(() => {
    if (!isInView || !nodeRef.current) return;

    const node = nodeRef.current;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toString();
      },
    });

    return () => controls.stop();
  }, [value, isInView]);

  return <span ref={nodeRef}>0</span>;
};

interface TextStat {
  label: string;
  val: string;
  isText: true;
}

interface CounterStat {
  label: string;
  val: number;
  suffix?: string;
  isText: false;
}

export type StatData = TextStat | CounterStat;

export const StatCard = ({ stat, index }: { stat: StatData; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative p-6 flex flex-col items-center justify-center text-center bg-cyan-950/10 border border-cyan-500/20 overflow-hidden"
    >
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50" />

      {/* Pulse Effect */}
      <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />

      <div className="relative z-10">
        <div className="text-2xl md:text-3xl font-display font-bold text-white mb-1 tracking-wider tabular-nums">
          {stat.isText ? (
            stat.val
          ) : (
            <>
              <AnimatedCounter value={stat.val} />
              <span className="text-cyan-400 tabular-nums">{stat.suffix}</span>
            </>
          )}
        </div>
        <div className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-[0.2em]">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
};
