"use client";

import { useRef, useMemo } from "react";
import { ScrollRevealItem } from "../hooks/useScrollRevealOnce";
import { calculateExperienceYears } from "../utils/helpers";

const skillCategories = [
  {
    category: "Backend",
    skills: [
      { name: "Java", years: "5+" },
      { name: "Spring Framework", years: "5+" },
      { name: "Spring Boot", years: "5+" },
      { name: "NodeJS", years: "3+" },
      { name: "NestJS", years: "2+" },
      { name: "TypeScript", years: "3+" },
      { name: "JavaScript", years: "4+" },
      { name: "GoLang", years: "2+" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "ReactJS", years: "3+" },
      { name: "NextJS", years: "2+" },
      { name: "NuxtJS", years: "1+" },
      { name: "VueJS", years: "2+" },
    ],
  },
  {
    category: "UI Libraries & Design",
    skills: [
      { name: "Shadcn UI", years: "1+" },
      { name: "Tailwind CSS", years: "3+" },
      { name: "Material UI", years: "2+" },
      { name: "Chakra UI", years: "1+" },
      { name: "Figma", years: "2+" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "PostgreSQL", years: "4+" },
      { name: "MySQL", years: "3+" },
      { name: "Oracle", years: "2+" },
      { name: "Firebase", years: "1+" },
      { name: "GraphQL", years: "2+" },
      { name: "MongoDB", years: "2+" },
    ],
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Docker", years: "4+" },
      { name: "Kubernetes", years: "2+" },
      { name: "GCP", years: "2+" },
      { name: "AWS", years: "2+" },
      { name: "Jenkins", years: "3+" },
      { name: "Nexus", years: "2+" },
      { name: "Kibana", years: "2+" },
      { name: "WSO2 APIM", years: "3+" },
      { name: "WSO2 IS", years: "2+" },
      { name: "Kafka", years: "2+" },
    ],
  },
];

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const experienceYears = useMemo(() => calculateExperienceYears(), []);

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen flex items-center justify-center py-16 lg:py-24 px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="font-body text-xs uppercase tracking-widest text-(--muted) mb-16">
          Technical Stack
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-8 lg:gap-16">
          <div>
            <h2 className="font-display text-5xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-(--text) text-balance">
              The tools I use to build reliable backend systems.
            </h2>
            <p className="font-body text-lg text-(--muted) leading-relaxed font-light mt-6 text-pretty">
              Backend Developer with <span className="tabular-nums">{experienceYears}</span>+ years of experience architecting scalable distributed systems 
              and microservices across fintech, e-commerce, and healthcare. I specialize in building 
              high-throughput event-driven platforms, designing robust APIs, and optimizing system 
              performance for enterprise-grade applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((cat, i) => (
              <ScrollRevealItem
                key={cat.category}
                isLeft={i % 2 !== 0}
                className="active:scale-[0.96] transition-transform"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <h3 className="font-display text-xl lg:text-2xl font-normal text-(--accent) mb-4 text-balance">
                  {cat.category}
                </h3>
                <div className="space-y-3">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-4">
                      <span className="font-body text-sm text-(--accent) font-medium">
                        {skill.name}
                      </span>
                      <span className="font-body text-xs text-(--muted) px-2 py-0.5 rounded bg-(--surface) tabular-nums">
                        {skill.years}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollRevealItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
