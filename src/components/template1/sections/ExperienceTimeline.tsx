"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import styles from "../Template1.module.css";

const experiences = [
  {
    company: "Wing Bank (Cambodia) Plc",
    role: "Backend Developer",
    period: "October 2022 – Present",
    desc: "Core contributor and partial lead on backend development. Architected WingUnified platform consolidating legacy systems into 10+ enterprise microservices using Spring Boot, powering food delivery, e-commerce, and courier services.",
    responsibilities: [
      "Architected WingUnified consolidating legacy systems into 10+ microservices",
      "Built core framework providing shared utilities and security patterns",
      "Developed order-service as core orchestration engine with state machines",
      "Integrated enterprise payment systems with multi-provider gateway",
      "Led platform evolution maintaining WingMall while building WingShopping",
    ],
    stack: [
      "Java 21",
      "Spring Boot 3.3.3",
      "Apache Kafka",
      "PostgreSQL",
      "Redis/Redisson",
      "OAuth2/OIDC",
      "NestJS",
    ],
    highlight: true,
  },
  {
    company: "Web Essentials Co., Ltd",
    role: "Web Developer",
    period: "February 2022 – October 2022",
    desc: "Enhanced global identity verification platform processing political identity verification and fraud detection worldwide, built with NuxtJS frontend and GoLang backend.",
    responsibilities: [
      "Integrated third-party identity verification APIs (KYC/AML providers)",
      "Improved fraud detection accuracy through enhanced data validation",
      "Optimized system performance and reduced verification processing time",
      "Collaborated with international teams in agile environment",
    ],
    stack: [
      "NuxtJS",
      "GoLang",
      "API Integration",
      "Identity Verification Systems",
    ],
    highlight: false,
  },
  {
    company: "Udaya Technology Co., Ltd",
    role: "Software Developer",
    period: "November 2019 – February 2022",
    desc: "Developed multiple enterprise solutions including payroll management systems, real-time GPS tracking platforms, and Electronic Medical Records (EMR) systems for healthcare and logistics sectors.",
    responsibilities: [
      "Built payroll management platform serving 1,000+ employees",
      "Developed real-time GPS tracking system managing 50+ vehicles",
      "Created Electronic Medical Records (EMR) system for 10+ hospitals"
    ],
    stack: [
      "Java (Spring Boot)",
      "ReactJS",
      "WebSockets",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
    ],
    highlight: false,
  },
];

export const ExperienceTimeline = () => {
  return (
    <section
      id="career"
      className="py-20 md:py-32 px-6 md:px-20 relative z-10 bg-[#040406]"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-24 text-center text-balance">
          CAREER TRAJECTORY
        </h2>

        <div className="relative">
          {/* Center Line */}
          <div
            className={`absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 transform md:-translate-x-1/2`}
          />

          <div className="space-y-24">
            {experiences.map((exp, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content Side */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 pl-4 md:pl-0 group ${
                      isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
                    }`}
                  >
                    <div
                      className={`${styles.template1GlassPanel} ${styles.template1NeonBorder} relative p-6 md:p-8 rounded-none overflow-hidden group-hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.1)] transition-[background,box-shadow] duration-300 ${
                        exp.highlight ? "shadow-[0_0_30px_-10px_rgba(34,211,238,0.15)] border-cyan-500/20" : ""
                      }`}
                    >
                      <div
                        className={`font-mono text-cyan-400 text-xs mb-3 tracking-wider uppercase ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        } flex items-center gap-2`}
                      >
                        {exp.period}
                      </div>
                      
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-[color] duration-300 text-balance">
                        {exp.role}
                      </h3>
                      
                      <div className={`font-mono text-sm text-slate-300 mb-6 flex items-center gap-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
                        {exp.company}
                      </div>

                      <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-6">
                        {exp.desc}
                      </p>

                      <ul
                        className={`text-[13px] text-slate-200 font-mono space-y-2 mb-6 flex flex-col ${
                          isEven ? "md:items-end" : "md:items-start"
                        }`}
                      >
                        {exp.responsibilities.map((res, idx) => (
                          <li key={idx} className={`flex items-start gap-2 ${isEven ? "md:flex-row-reverse md:text-right" : "flex-row"}`}>
                            <ChevronRight size={12} className="text-cyan-500 mt-1 shrink-0" />
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>

                      <div
                        className={`flex flex-wrap gap-2 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        {exp.stack.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-mono text-slate-200 border border-white/10 px-3 py-1.5 bg-white/5 uppercase"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[14px_14px] opacity-20 pointer-events-none" />
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-0 md:left-1/2 w-10 h-10 flex items-center justify-center transform md:-translate-x-1/2 z-10">
                    <div className="relative w-4 h-4">
                      <div
                        className={`absolute inset-0 rounded-full ${
                          exp.highlight
                            ? "bg-cyan-400 animate-pulse"
                            : "bg-slate-600"
                        }`}
                      />
                      <div
                        className={`absolute inset-0 rounded-full ${
                          exp.highlight
                            ? "bg-cyan-400 blur-sm"
                            : "bg-slate-600 blur-[1px]"
                        }`}
                      />
                      <div className="absolute inset-0.5 bg-[#040406] rounded-full z-10" />
                      <div
                        className={`absolute inset-1.5 rounded-full z-20 ${
                          exp.highlight ? "bg-cyan-400" : "bg-slate-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Empty Side */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
