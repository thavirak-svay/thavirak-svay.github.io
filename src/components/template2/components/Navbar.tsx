"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Work", anchor: "work" },
    { label: "Skills", anchor: "skills" },
    { label: "How I Work", anchor: "how-i-work" },
    { label: "Experience", anchor: "experience" },
    { label: "Leadership", anchor: "leadership" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 left-0 right-0 z-50 bg-(--navbar-bg)/80 backdrop-blur-md border-b border-(--border)"
      >
        <div className="flex justify-between items-center px-6 md:px-12 py-4 md:py-5">
          
          <a
            href="#"
            className="active:scale-[0.96] transition-transform duration-150 ease-out"
          >
            <img src="/favicon.svg" alt="Thavirak Svay" className="w-8 h-8" />
          </a>

           
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.anchor}
                href={`#${item.anchor}`}
                className="font-body text-xs text-(--muted) hover:text-(--accent) uppercase tracking-widest active:scale-[0.96] transition-[color,transform] duration-150 ease-out"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              className="ml-4 px-5 py-2 bg-(--text-dark) text-(--white) font-body text-xs uppercase tracking-widest active:scale-[0.96] transition-transform duration-150 ease-out hover:bg-(--accent)"
            >
              Resume
            </a>
          </div>

           
          <button
            className="md:hidden relative w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center text-(--text-dark) hover:text-(--accent) active:scale-[0.96] transition-[color,transform] duration-150 ease-out"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.span
              key="menu"
              initial={false}
              animate={{ opacity: isMobileMenuOpen ? 0 : 1, scale: isMobileMenuOpen ? 0.25 : 1 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              className="absolute"
            >
              <Menu size={20} />
            </motion.span>
            <motion.span
              key="x"
              initial={false}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0, scale: isMobileMenuOpen ? 1 : 0.25 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              className="absolute"
            >
              <X size={20} />
            </motion.span>
          </button>
        </div>
      </motion.nav>

       
      <AnimatePresence initial={false} mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-(--navbar-bg) pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                <a
                  key={item.anchor}
                  href={`#${item.anchor}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-display font-bold text-(--text-dark) hover:text-(--accent) active:scale-[0.96] transition-[color,transform] duration-150 ease-out py-4 min-h-[44px] flex items-center"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-6 py-3 min-h-[44px] min-w-[44px] bg-(--text-dark) text-(--white) font-display font-bold text-center active:scale-[0.96] transition-transform duration-150 ease-out hover:bg-(--accent)"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
