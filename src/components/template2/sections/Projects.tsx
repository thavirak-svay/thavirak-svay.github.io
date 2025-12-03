"use client";

import { ProjectRow } from "../components/ProjectRow";
import { PROJECTS } from "../types/data";

export const Projects = () => {
  return (
    <section id="works" className="py-32 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 mb-20">
        <h2 className="font-mono text-xs text-white/50 tracking-widest mb-2">
          02 / SELECTED WORKS
        </h2>
        <h3 className="font-display text-4xl text-white">
          ARCHITECTURAL HIGHLIGHTS
        </h3>
      </div>

      <div className="border-b border-white/10">
        {PROJECTS.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
