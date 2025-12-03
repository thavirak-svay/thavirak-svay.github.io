import React from "react";
import { motion } from "framer-motion";
import { GitBranch, Github, ExternalLink, ChevronRight } from "lucide-react";
import styles from "../Template3.module.css";
import { ProjectCardProps } from "../types/projectTypes";

export const ProjectCard = ({
  title,
  type,
  stack,
  metrics,
  children,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${styles.template3GlassPanel} border-t border-white/10 border-l-4 border-l-blue-500/50 hover:border-l-blue-500 transition-colors p-6 md:p-8 group`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs ${styles.template3FontMono} uppercase rounded-sm border border-blue-500/30`}
            >
              {type}
            </span>
            <span
              className={`flex items-center gap-1 text-xs text-gray-500 ${styles.template3FontMono}`}
            >
              <GitBranch size={12} /> main
            </span>
          </div>
          <h3 className={`${styles.template3FontGrotesk} text-2xl font-bold text-white`}>
            {title}
          </h3>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Github size={20} className="text-gray-400 hover:text-white" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ExternalLink
              size={20}
              className="text-gray-400 hover:text-white"
            />
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <p className="text-gray-400 leading-relaxed font-light">{children}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {stack.map((tech) => (
              <span
                key={tech}
                className={`text-xs ${styles.template3FontMono} text-blue-200/70`}
              >
                #{tech}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-black/40 p-4 rounded border border-white/5">
          <h4
            className={`text-xs ${styles.template3FontMono} uppercase text-gray-500 mb-3 border-b border-white/10 pb-2`}
          >
            Key Impact
          </h4>
          <ul className="space-y-3">
            {metrics.map((m, i) => (
              <li key={`${m.label}-${i}`} className="flex justify-between items-center text-sm">
                <span className="text-gray-400">{m.label}</span>
                <span className={`text-green-400 ${styles.template3FontMono}`}>
                  {m.value}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t border-white/5 text-center">
            <button
              className={`text-xs ${styles.template3FontMono} text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1 w-full group/btn`}
            >
              View Architecture{" "}
              <ChevronRight
                size={12}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
