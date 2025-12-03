"use client";

import { Mail, Linkedin, Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contact" className="py-32 px-8 md:px-12 lg:px-16 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-mono text-xs text-white/50 tracking-widest mb-2">
            04 / CONNECT
          </h2>
          <h3 className="font-display text-5xl md:text-6xl text-white mb-8">
            LET'S BUILD  
            <br />
            SOMETHING <span className="text-white/40">RESILIENT</span>
          </h3>
          <p className="font-mono text-sm text-white/60 max-w-md">
            Open to backend engineering opportunities, technical consulting, and collaborative projects in distributed systems.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <a
              href="mailto:thaavirak@gmail.com"
              className="flex items-center gap-4 text-white hover:text-white/60 transition-colors group"
            >
              <div className="p-3 bg-white/5 border border-white/10 group-hover:bg-white group-hover:border-white transition-all">
                <Mail size={20} className="group-hover:text-black" />
              </div>
              <span className="font-mono text-sm">thaavirak@gmail.com</span>
            </a>

            <a
              href="https://linkedin.com/in/thavirak-svay"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white hover:text-white/60 transition-colors group"
            >
              <div className="p-3 bg-white/5 border border-white/10 group-hover:bg-white group-hover:border-white transition-all">
                <Linkedin size={20} className="group-hover:text-black" />
              </div>
              <span className="font-mono text-sm">linkedin.com/in/thavirak-svay</span>
            </a>

            <a
              href="https://github.com/thavirak-svay"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white hover:text-white/60 transition-colors group"
            >
              <div className="p-3 bg-white/5 border border-white/10 group-hover:bg-white group-hover:border-white transition-all">
                <Github size={20} className="group-hover:text-black" />
              </div>
              <span className="font-mono text-sm">github.com/thavirak-svay</span>
            </a>
          </div>

          <div className="pt- border-t border-white/10">
            <p className="font-mono text-xs text-white/30">
              © 2024 Thavirak Svay. Engineered in Cambodia.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
