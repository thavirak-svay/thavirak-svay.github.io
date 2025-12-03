"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Linkedin, ArrowRight } from "lucide-react";
import { TechStackTicker } from "../components/TechStackTicker";
import { calculateExperienceYears } from "../utils/helpers";

export const Hero = () => {
  const experienceYears = useMemo(() => calculateExperienceYears(), []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 pt-10 md:pt-20 overflow-x-hidden">
      <div className="z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="px-2 py-1 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono bg-cyan-950/20 whitespace-nowrap">
            DISTRIBUTED SYSTEMS
          </span>
          <span className="text-slate-300 font-mono text-xs md:text-sm">
            Delivering Mission-Critical Fintech Solutions
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] tracking-tighter text-white mix-blend-difference mb-8"
        >
          BACKEND <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-500 to-slate-700">
            ENGINEER
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-slate-200 max-w-2xl text-sm md:text-lg leading-relaxed mb-8 md:mb-12"
        >
          With {experienceYears}+ Years building scalable distributed systems and microservices across fintech, banking, e-commerce, and healthcare. Expert in architecting event-driven platforms, designing high-throughput APIs, and leading teams to deliver production-grade solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="group relative px-6 py-3 md:px-8 md:py-4 bg-white text-black font-display font-bold tracking-wide overflow-hidden inline-block text-center text-sm md:text-base"
          >
            <span className="relative z-10 group-hover:text-white transition-colors">
              SELECTED WORKS
            </span>
            <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
          </a>
          <a
            href="https://linkedin.com/in/thavirak-svay"
            target="_blank"
            className="px-6 py-3 md:px-8 md:py-4 border border-white/20 text-white font-mono text-sm hover:bg-white/5 transition-colors flex items-center gap-2 group"
          >
            <Linkedin size={16} />
            <span>Connect</span>
            <ArrowRight
              size={16}
              className="transform group-hover:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>
      </div>

      <TechStackTicker />
    </section>
  );
};
