"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-black py-12 md:py-20 px-6 md:px-20 border-t border-white/10 relative overflow-hidden">
      <div className="whitespace-nowrap overflow-hidden mb-12 opacity-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="font-display text-[4rem] md:text-[10rem] font-bold text-white leading-none"
        >
          RESILIENCE CONSISTENCY SCALABILITY ARCHITECTURE RESILIENCE CONSISTENCY
          SCALABILITY ARCHITECTURE
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        <div>
          <h3 className="font-display text-4xl font-bold text-white mb-6">
            LET'S BUILD <br /> SOMETHING{" "}
            <span className="text-cyan-400">ROBUST</span>
          </h3>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:thaavirak@gmail.com"
              className="flex items-center gap-3 text-slate-200 hover:text-cyan-400 transition-colors font-mono text-sm"
            >
              <Mail size={18} /> thaavirak@gmail.com
            </a>
            <a
              href="tel:+85570933433"
              className="flex items-center gap-3 text-slate-200 hover:text-cyan-400 transition-colors font-mono text-sm"
            >
              <Phone size={18} /> +855 70 933 433
            </a>
            <a
              href="https://linkedin.com/in/thavirak-svay"
              target="_blank"
              className="flex items-center gap-3 text-slate-200 hover:text-cyan-400 transition-colors font-mono text-sm"
            >
              <Linkedin size={18} /> linkedin.com/in/thavirak-svay
            </a>
            <a
              href="https://thavirak-svay.github.io/"
              target="_blank"
              className="flex items-center gap-3 text-slate-200 hover:text-cyan-400 transition-colors font-mono text-sm"
            >
              <Globe size={18} /> thavirak-svay.github.io
            </a>
          </div>
        </div>

        <div className="flex flex-col md:items-end justify-end">
          <div className="font-mono text-slate-300 text-xs mb-2">
            CURRENT_STATUS
          </div>
          <div className="flex items-center gap-2 text-green-500 font-mono text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Operational / Systems Active
          </div>
          <div className="mt-8 text-slate-400 text-[10px] font-mono text-right">
            © 2024 THAVIRAK SVAY. <br /> ENGINEERED IN CAMBODIA.
          </div>
        </div>
      </div>
    </footer>
  );
};
