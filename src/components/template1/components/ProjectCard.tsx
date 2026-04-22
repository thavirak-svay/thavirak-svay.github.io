"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import styles from "../Template1.module.css";
import type { ProjectCardProps } from "../types/projectTypes";

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative py-12 md:py-24 cursor-pointer border-t border-white/20 first:border-t-0"
    >
      <div className="flex flex-col md:flex-row gap-12 md:items-start justify-between relative z-10">
        <div className="flex-1">
          <div className="flex items-baseline gap-6 mb-8">
            <span className="font-mono text-cyan-400 text-sm tracking-widest">
              0{index + 1}
            </span>
            <h3 className="font-display text-4xl md:text-5xl font-medium text-white group-hover:text-cyan-400 transition-[color] duration-300 text-balance">
              {project.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
            <div>
              <div className="text-[10px] font-mono text-slate-400 mb-3 tracking-widest uppercase">
                [ CONSTRAINT ]
              </div>
              <p className="font-mono text-slate-200 text-sm leading-relaxed font-light text-pretty">
                {project.problem}
              </p>
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyan-400 mb-3 tracking-widest uppercase">
                [ IMPLEMENTATION ]
              </div>
              <p className="font-mono text-slate-200 text-sm leading-relaxed font-light text-pretty">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono text-slate-300 border border-white/10 px-3 py-1.5 bg-white/5 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Panel - Stats/Arch */}
        <div className={`${styles.template1GlassPanel} ${styles.template1NeonBorder} w-full md:w-80 relative h-48 rounded-none overflow-hidden transition-[background,box-shadow] duration-300`}>
          <AnimatePresence initial={false} mode="wait">
            {!isHovered ? (
              <motion.div
                key="stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.15, ease: "easeIn" }}
                className="absolute inset-0 p-8 flex flex-col justify-center"
              >
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1">
                      Scale
                    </div>
                    <div className="text-sm text-slate-300 font-display">
                      {project.metrics.scope}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1">
                      Value
                    </div>
                    <div className="text-sm text-slate-300 font-display">
                      {project.metrics.impact}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                    <Activity size={12} className="text-cyan-500/50" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="arch"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -12 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 p-8 bg-cyan-950/20 backdrop-blur-sm flex flex-col justify-center h-full"
              >
                <div className="text-[10px] text-cyan-300 font-mono tracking-widest mb-4 uppercase">
                  Architecture
                </div>
                <div className="flex flex-col gap-3">
                  {project.arch.map((layer, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-[11px] text-slate-300 font-mono"
                    >
                      <span className="w-1 h-1 rounded-full bg-cyan-500"></span>
                      {layer}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[14px_14px] opacity-20 pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
};
