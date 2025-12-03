"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../utils/helpers";
import type { Project } from "../types/projectTypes";

export const ProjectRow = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative border-t border-white/10 py-12 cursor-none md:cursor-pointer transition-colors hover:bg-white/2"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-3 font-mono text-xs text-white/40 flex flex-col gap-2">
          <span>
            {project.id} / {project.year}
          </span>
          <span className="text-white/60">{project.category}</span>
        </div>

        <div className="md:col-span-5">
          <h3 className="font-display text-4xl md:text-5xl text-white group-hover:translate-x-4 transition-transform duration-500 ease-out">
            {project.title}
          </h3>
        </div>

        <div className="md:col-span-4 md:text-right">
          <div className="flex flex-col md:items-end gap-4">
            <div
              className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-0",
                isHovered ? "max-h-24 opacity-100" : ""
              )}
            >
              <p className="font-mono text-xs text-white/60 max-w-xs ml-auto">
                {project.desc}
              </p>
            </div>

            <div className="flex items-center gap-2 text-white/80 group-hover:text-white">
              <span className="font-mono text-xs">{project.tech}</span>
              <ArrowUpRight
                size={16}
                className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
