"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 flex items-center gap-4 md:gap-8 shadow-2xl shadow-cyan-900/10">
          {/* Logo */}
          <div className="pl-4 pr-2 flex items-center gap-3">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </div>
            <span className="font-display font-bold text-sm tracking-wider text-white">
              THAVIRAK.SVAY
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-1 py-1 border border-white/5">
            {["ABOUT", "SKILLS", "CAREER", "PROJECTS", "LEADERSHIP"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-5 py-1.5 rounded-full text-[10px] font-mono text-slate-400 hover:text-cyan-400 hover:bg-white/5 uppercase tracking-widest active:scale-[0.96] transition-[color,scale] duration-150 ease-out"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Contact & Mobile Toggle */}
          <div className="pr-2 flex items-center gap-2">
            <a
              href="mailto:thaavirak@gmail.com"
              className="hidden md:flex px-5 py-2 rounded-full bg-white text-black hover:bg-cyan-400 font-display font-bold text-xs items-center gap-2 active:scale-[0.96] transition-[background-color,scale] duration-150 ease-out"
            >
              <span>CONTACT</span>
            </a>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-white hover:text-cyan-400 active:scale-[0.96] transition-[color,scale] duration-150 ease-out"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence initial={false} mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] pt-32 px-6 pb-6 md:hidden flex flex-col overflow-hidden"
          >
            <div className="flex flex-col gap-6 items-center">
              {["ABOUT", "SKILLS", "CAREER", "PROJECTS", "LEADERSHIP"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-display font-bold text-white hover:text-cyan-400 active:scale-[0.96] transition-[color,scale] duration-150 ease-out"
                >
                  {item}
                </a>
              ))}
              <a
                href="mailto:thaavirak@gmail.com"
                className="mt-8 px-8 py-3 rounded-full bg-white text-black font-display font-bold hover:bg-cyan-400 active:scale-[0.96] transition-[background-color,scale] duration-150 ease-out"
              >
                CONTACT ME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
