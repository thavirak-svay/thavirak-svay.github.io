"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { calculateExperienceYears } from "../utils/helpers";

export const Hero = () => {
  const experienceYears = useMemo(() => calculateExperienceYears(), []);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-7xl mx-auto opacity-[0.03]">
        <div className="w-px h-full bg-white mx-auto" />
        <div className="w-px h-full bg-white mx-auto" />
        <div className="w-px h-full bg-white mx-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 mb-8"
            >
              <div className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest text-white/70 uppercase">
                System Online
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tight text-white leading-[0.9] mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              DISTRIBUTED <br />
              <span className="text-white/40">SYSTEMS</span> <br />
              ENGINEER
            </motion.h1>

            <motion.p
              className="font-mono text-white/60 text-sm md:text-base max-w-xl mb-12 leading-relaxed border-l border-white/20 pl-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Backend Developer with 5+ Years building scalable distributed systems and microservices across fintech, banking, e-commerce, and healthcare. Expert in architecting event-driven platforms, designing high-throughput APIs, and leading teams to deliver production-grade solutions.
            </motion.p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end pb-4">
            <div className="space-y-6 font-mono text-xs text-white/40">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>LOCATION</span>
                <span className="text-white">PHNOM PENH, KH</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>SPECIALTY</span>
                <span className="text-white">BACKEND ARCHITECTURE</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>EXPERIENCE</span>
                <span className="text-white">{experienceYears}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
