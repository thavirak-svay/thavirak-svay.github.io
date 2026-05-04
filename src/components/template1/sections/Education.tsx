"use client";

import { GraduationCap } from "lucide-react";

export const Education = () => (
  <section className="min-h-screen flex items-center justify-center py-20 px-6 md:px-20 relative z-10 border-t border-white/5">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 text-cyan-400 mb-6">
        <GraduationCap size={24} />
        <span className="font-mono text-sm tracking-widest uppercase">
          Education
        </span>
      </div>
      <h3 className="font-display text-3xl font-bold text-white mb-2 text-balance">
        Management Information System
      </h3>
      <div className="font-mono text-lg text-slate-300 mb-4">
        SETEC Institute | Phnom Penh, Cambodia
      </div>
      <div className="inline-block px-4 py-1 border border-white/10 rounded-full text-xs font-mono text-slate-400">
        2018 – 2022
      </div>
    </div>
  </section>
);
