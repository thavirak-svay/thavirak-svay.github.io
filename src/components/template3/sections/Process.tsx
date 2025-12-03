import React from "react";
import { Code } from "lucide-react";
import { SectionTitle } from "../components/SectionTitle";
import styles from "../Template3.module.css";

export const Process = () => {
  return (
    <section id="process" className="py-32 px-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Engineering Philosophy" subtitle="Approach" />
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-12">
            <div className="relative pl-8 border-l border-white/10">
              <span className="absolute -left-1.5 top-1 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3B82F6]" />
              <h3
                className={`${styles.template3FontGrotesk} text-2xl font-bold text-white mb-2`}
              >
                Collaborative Leadership
              </h3>
              <p className="text-gray-400 leading-relaxed">
                I don&apos;t just write code; I lead teams. My experience
                includes mentoring developers, establishing development
                standards, and driving impactful business results through
                technical excellence and rapid mastery of new technologies.
              </p>
            </div>

            <div className="relative pl-8 border-l border-white/10">
              <span className="absolute -left-1.5 top-1 w-3 h-3 bg-purple-500 rounded-full" />
              <h3
                className={`${styles.template3FontGrotesk} text-2xl font-bold text-white mb-2`}
              >
                System Reliability
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Optimized backend performance across fintech ecosystems to
                ensure high availability. I focus on resolving critical
                performance bottlenecks to improve system responsiveness for
                high-volume processing.
              </p>
            </div>
          </div>

          {/* Education */}
          <div className={`${styles.template3GlassPanel} p-6 md:p-8 rounded-xl`}>
            <h4
              className={`font-mono text-sm text-gray-500 mb-6 uppercase tracking-widest text-center ${styles.template3FontMono}`}
            >
              Education
            </h4>
            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
              <div className="p-3 bg-blue-500/10 rounded-full">
                <Code size={24} className="text-blue-400" />
              </div>
              <div>
                <h5
                  className={`text-white font-bold ${styles.template3FontGrotesk}`}
                >
                  Bachelor of <span className="text-blue-400">Management of Information Technology</span>
                </h5>
                <p className={`text-sm text-gray-400 ${styles.template3FontMono} mb-1`}>
                  SETEC Institute | Phnom Penh, Cambodia
                </p>
                <p className={`text-sm text-gray-500 ${styles.template3FontMono}`}>
                  2018 - 2022
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className={`flex justify-between text-sm ${styles.template3FontMono} text-gray-400`}
              >
                <span>Backend Mastery</span>
                <span className="text-green-400">100%</span>
              </div>
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="w-full h-full bg-green-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

