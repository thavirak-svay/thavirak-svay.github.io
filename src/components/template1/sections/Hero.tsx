"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Linkedin, ArrowRight } from "lucide-react";
import { TechStackTicker } from "../components/TechStackTicker";
import { calculateExperienceYears } from "../utils/helpers";

export const Hero = () => {
  const experienceYears = useMemo(() => calculateExperienceYears(), []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 pt-10 md:pt-20 overflow-x-hidden">
      <motion.div
        className="z-10 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
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
          variants={itemVariants}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] tracking-tighter text-white mix-blend-difference mb-8 text-balance"
        >
          BACKEND <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-500 to-slate-700">
            ENGINEER
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-mono text-slate-200 max-w-2xl text-sm md:text-lg leading-relaxed mb-8 md:mb-12 text-pretty"
        >
          With <span className="tabular-nums">{experienceYears}</span>+ Years building scalable distributed systems and microservices across fintech, banking, e-commerce, and healthcare. Expert in architecting event-driven platforms, designing high-throughput APIs, and leading teams to deliver production-grade solutions.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="group relative px-6 py-3 md:px-8 md:py-4 bg-white text-black font-display font-bold tracking-wide overflow-hidden inline-block text-center text-sm md:text-base active:scale-[0.96] transition-transform duration-150 ease-out"
          >
            <span className="relative z-10 group-hover:text-white transition-[color] duration-300">
              SELECTED WORKS
            </span>
            <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
          </a>
          <a
            href="https://linkedin.com/in/thavirak-svay"
            target="_blank"
            className="pl-6 pr-5 md:pl-8 md:pr-7 border border-white/20 text-white font-mono text-sm hover:bg-white/5 flex items-center gap-2 group active:scale-[0.96] transition-[background-color,scale] duration-150 ease-out"
          >
            <Linkedin size={16} />
            <span>Connect</span>
            <ArrowRight
              size={16}
              className="transform group-hover:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>
      </motion.div>

      <TechStackTicker />
    </section>
  );
};
