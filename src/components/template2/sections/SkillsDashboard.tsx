"use client";

import { motion } from "framer-motion";
import { TechMarker } from "../components/TechMarker";
import { SKILLS } from "../types/data";
import { cn } from "../utils/helpers";

export const SkillsDashboard = () => {
  return (
    <section id="competencies" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-6">
          <div>
            <h2 className="font-mono text-xs text-white/50 tracking-widest mb-2">
              01 / CAPABILITIES
            </h2>
            <h3 className="font-display text-4xl text-white">
              TECHNICAL ARSENAL
            </h3>
          </div>
          <div className="hidden md:block font-mono text-xs text-white/30 text-right">
            SYSTEM_CHECK: OPTIMAL
            <br />
            LAST_UPDATE: 2025
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group relative p-8 bg-[#0A0A0A] border border-white/8 overflow-hidden transition-all duration-500 hover:bg-white/2",
                skill.col
              )}
            >
              <TechMarker className="top-0 left-0" />
              <TechMarker className="top-0 right-0 rotate-90" />
              <TechMarker className="bottom-0 left-0 -rotate-90" />
              <TechMarker className="bottom-0 right-0 rotate-180" />

              <div className="absolute inset-0 bg-linear-to-b from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-white/5 rounded-sm text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <skill.icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[10px] text-white/30">
                    SYS_MOD_0{i + 1}
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-xl text-white mb-3">
                    {skill.name}
                  </h4>
                  <p className="font-mono text-xs text-white/50 leading-relaxed max-w-[90%]">
                    {skill.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
