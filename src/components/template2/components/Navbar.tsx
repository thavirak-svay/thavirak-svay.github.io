"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#050505]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 h-20 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 flex items-center justify-center rounded-sm">
            <span className="font-display font-bold text-white">TS</span>
          </div>

          <span className="hidden md:block font-mono text-xs tracking-widest text-white/50">
            THAVIRAK SVAY — PORTFOLIO_2025
          </span>
        </div>

        <div className="hidden md:flex gap-8">
          {["About", "Competencies", "Works", "Contact"].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-mono text-xs text-white/60 hover:text-white transition-colors uppercase tracking-wider"
            >
              {item}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-0 left-0 w-full bg-[#050505] pt-24 px-8 z-40 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-8">
              {["About", "Competencies", "Works", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-display font-medium text-white hover:text-white/50 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
