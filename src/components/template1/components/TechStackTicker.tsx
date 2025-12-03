"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const TechStackTicker = () => {
  const [index, setIndex] = useState(0);

  const stacks = [
    { label: "BACKEND", items: ["Java", "Spring Boot", "Node.js", "Nestjs", "Go"] },
    { label: "INFRA", items: ["Docker", "GCP", "AWS"] },
    { label: "DATA", items: ["Kafka", "PostgreSQL", "MongoDB", "Redis"] },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % stacks.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentStack = stacks[index];

  return (
    <div className="absolute bottom-12 right-4 md:bottom-10 md:right-10 flex flex-col items-end gap-2 md:gap-3 z-20">
      <div className="flex items-center justify-end gap-2 mb-1">
        <span className="font-mono text-[10px] md:text-xs text-cyan-400 tracking-[0.2em] font-bold mr-1">TECH_STACK</span>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
      </div>

      <div className="flex flex-col items-end gap-0.5 min-h-[40px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStack.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-end gap-0.5"
          >
            <div className="flex items-center justify-end gap-2">
              <span className="font-mono text-[9px] md:text-[10px] text-cyan-500/70 tracking-wider uppercase">
                {currentStack.label}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-slate-400 tracking-wide">
              {currentStack.items.map((item, j) => (
                <React.Fragment key={item}>
                  <span className="hover:text-cyan-300 transition-colors cursor-default">
                    {item}
                  </span>
                  {j < currentStack.items.length - 1 && (
                    <span className="text-cyan-900/30 text-[8px]">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
