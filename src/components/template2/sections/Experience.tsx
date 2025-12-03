"use client";

import { EXPERIENCE } from "../types/data";

export const Experience = () => {
  return (
    <section
      id="experience"
      className="py-32 relative z-10 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-mono text-xs text-white/50 tracking-widest mb-8">
            03 / EXPERIENCE
          </h2>
          <h3 className="font-display text-4xl text-white mb-8">
            PROFESSIONAL EXPERIENCE
          </h3>
          <p className="font-mono text-sm text-white/60 max-w-md">
            Backend Developer with 5+ Years building scalable distributed systems and microservices across fintech, banking, e-commerce, and healthcare. Proven track record delivering production-grade solutions.
          </p>
        </div>

        <div className="space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="group">
              <div className="flex items-baseline justify-between mb-2">
                <h4 className="font-display text-2xl text-white group-hover:text-white/80 transition-colors">
                  {exp.company}
                </h4>
                <span className="font-mono text-xs text-white/40">
                  {exp.period}
                </span>
              </div>
              <p className="font-mono text-sm text-white/60 mb-4">{exp.role}</p>
              <div className="flex flex-wrap gap-2">
                {exp.metrics.map((metric, j) => (
                  <span
                    key={j}
                    className="font-mono text-[10px] text-white/40 border border-white/20 px-2 py-1"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
