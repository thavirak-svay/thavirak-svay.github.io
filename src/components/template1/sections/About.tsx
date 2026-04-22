"use client";

import { Shield, Activity, Zap } from "lucide-react";

export const About = () => {
  return (
    <section
      id="about"
      className="py-20 md:py-32 px-6 md:px-20 relative z-10 border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-12">
          <div>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-8 text-balance">
              ENGINEERING <br />
              <span className="text-cyan-400">PHILOSOPHY</span>
            </h2>
            <div className="flex flex-col mt-12">
              {[
                {
                  icon: <Shield size={32} />,
                  title: "Boring Tech",
                  quote: "Choose boring technology",
                  author: "Dan McKinley",
                  desc: "I prefer stable, production-proven tools. In distributed systems, predictable behavior matters more than novelty — boring tech fails in familiar ways, and that's a feature.",
                },
                {
                  icon: <Activity size={32} />,
                  title: "Observability",
                  quote: "If you can't measure it, you can't improve it",
                  author: "Peter Drucker",
                  desc: "Systems should be observable by default. Clear logs, metrics, and traces let you understand reality instead of guessing. Good engineering is evidence-driven.",
                },
                {
                  icon: <Zap size={32} />,
                  title: "Pragmatism",
                  quote: "Make it work, make it right, make it fast",
                  author: "Kent Beck",
                  desc: "I focus on shipping value first, correctness second, and optimization last. Production reliability beats cleverness; code is read far more than it's written.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="py-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  <div className="md:col-span-1 flex flex-col gap-4">
                    <div className="p-3 bg-cyan-500/10 w-fit rounded-sm text-cyan-400">
                      {item.icon}
                    </div>
                    <h3 className="font-display text-3xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div className="md:col-span-2 flex flex-col justify-center">
                    <div className="mb-4 italic text-sm text-slate-300">
                      <span className="text-cyan-400">&quot;{item.quote}&quot;</span>{" "}
                      — {item.author}
                    </div>
                    <p className="font-mono text-sm text-slate-300 leading-relaxed max-w-2xl text-pretty">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
