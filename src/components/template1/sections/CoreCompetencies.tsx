"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Cpu, Container, Database, ShieldCheck } from "lucide-react";
import styles from "../Template1.module.css";
import { StatCard } from "../components/AnimatedStats";
import { calculateExperienceYears } from "../utils/helpers";

export const CoreCompetencies = () => {
  const experienceYears = useMemo(() => calculateExperienceYears(), []);

  const features = [
    {
      title: "Backend & Languages",
      icon: <Cpu className="text-cyan-400" />,
      tech: ["Java (Spring Boot, Spring Framework)", "TypeScript/JavaScript (NestJS, Node.js)", "GoLang"],
      desc: "Building high-throughput, low-latency distributed systems.",
      col: "md:col-span-2",
      row: "row-span-2",
    },
    {
      title: "Architecture & Design",
      icon: <Container className="text-purple-400" />,
      tech: ["Microservices", "Event-driven architecture", "REST APIs", "GraphQL", "Domain-Driven Design"],
      desc: "Architecting scalable, maintainable systems.",
      col: "md:col-span-1",
      row: "row-span-1",
    },
    {
      title: "Messaging & Databases",
      icon: <Database className="text-green-400" />,
      tech: ["Apache Kafka", "RabbitMQ", "WebSockets", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Hasura"],
      desc: "Event sourcing & eventual consistency patterns.",
      col: "md:col-span-1",
      row: "row-span-1",
    },
    {
      title: "Cloud & DevOps",
      icon: <ShieldCheck className="text-orange-400" />,
      tech: ["Docker", "Kubernetes", "AWS", "Git", "CI/CD (Jenkins, GitLab)", "ELK Stack", "Kibana", "OAuth2/SSO"],
      desc: "Cloud-native deployment and observability.",
      col: "md:col-span-3",
      row: "row-span-1",
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 px-6 md:px-20 relative z-10">
      <div className="mb-16 max-w-6xl mx-auto">
        <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 text-balance">
          CORE COMPETENCIES
        </h2>
        <div className="h-1 w-20 bg-cyan-500" />
      </div>

      {/* Stats Grid - Animated HUD Style */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Years Experience", val: experienceYears, suffix: "+" },
            { label: "Architecture", val: "Event-Driven", isText: true },
            { label: "Focus", val: "Fintech", isText: true },
            { label: "Domain", val: "Backend Systems", isText: true },
          ].map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${styles.template1GlassPanel} p-8 rounded-none relative overflow-hidden group ${f.col} ${f.row} ${styles.template1NeonBorder} transition-[color,background,box-shadow] duration-300`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              {f.icon}
            </div>
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {f.title}
                </h3>
                <p className="font-mono text-xs text-slate-300 mb-6">
                  {f.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {f.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono text-slate-300 border border-white/10 px-3 py-1.5 bg-white/5 uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[14px_14px] opacity-20 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
