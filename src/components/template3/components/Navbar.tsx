import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import styles from "../Template3.module.css";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-[#030305]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 h-20 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 animate-pulse rounded-full shadow-[0_0_10px_#3B82F6]" />
          <span
            className={`${styles.template3FontGrotesk} font-bold text-xl tracking-tight text-white`}
          >
            THAVIRAK<span className="text-gray-500">.SVAY</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Skills", "Work", "Process", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm ${styles.template3FontMono} text-gray-400 hover:text-white transition-colors uppercase tracking-widest`}
            >
              {item}
            </a>
          ))}
          <a
            href="#resume"
            className={`px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs ${styles.template3FontMono} text-blue-400 transition-all rounded`}
          >
            RESUME.PDF
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 w-full bg-[#030305] border-b border-white/5 px-8 py-6 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              {["Skills", "Work", "Process", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg ${styles.template3FontMono} text-gray-400 hover:text-white transition-colors uppercase tracking-widest`}
                >
                  {item}
                </a>
              ))}
              <a
                href="#resume"
                className={`inline-block w-fit px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs ${styles.template3FontMono} text-blue-400 transition-all rounded`}
              >
                RESUME.PDF
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

