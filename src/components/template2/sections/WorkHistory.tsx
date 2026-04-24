"use client";

import { motion } from "framer-motion";
import styles from "../Template2.module.css";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  desc: string;
  responsibilities: string[];
  stack: string[];
  highlight: boolean;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
}

const experiences: Experience[] = [
  {
    id: "wing-bank",
    company: "Wing Bank (Cambodia) Plc",
    role: "Backend Developer",
    period: "October 2022 – Present",
    desc:
      "Core contributor and lead developer on multiple banking and commerce platforms. Architected and maintained systems for payment processing, e-commerce, inventory management, and API governance across Wing Bank's digital ecosystem.",
    responsibilities: [
      "Currently developing KHQR Invoicing — payment QR code generation system for merchants and personal users",
      "Lead development of CMDB platform — centralized inventory tracking servers, apps, databases, network devices with automated sync from monitoring tools",
      "Developed Wing Unified (commerce subsidiary) — handling order and payment services including multi-provider payment integration, order management, transaction processing",
      "Hands-on with WSO2 stack — WSO2 APIM as API gateway for routing and rate limiting, WSO2 IS as identity provider for OAuth2/OIDC authentication",
      "Built WingShopping (e-commerce) and WingTicketing (ticket booking) — backend services, third-party API integrations, product catalog, checkout, booking flows",
      "Maintained and optimized WingMall (food delivery) as both frontend and backend — improved API response times, fixed production issues, shipped new features",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Apache Kafka",
      "PostgreSQL",
      "WSO2 APIM & IS",
      "OAuth2/OIDC",
      "NestJS",
      "ReactJS",
    ],
    highlight: true,
  },
  {
    id: "web-essentials",
    company: "Web Essentials Co., Ltd",
    role: "Web Developer",
    period: "February 2022 – October 2022",
    desc:
      "Maintained and enhanced global identity verification platform focused on PEP (Politically Exposed Persons) screening and high-profile individual checks, built with NuxtJS frontend and GoLang backend.",
    responsibilities: [
      "Maintained identity verification platform for PEP screening and high-profile individual checks — integrated KYC/AML APIs using NuxtJS and GoLang",
      "Shipped new features and optimized both backend and frontend performance",
      "Collaborated with international remote team to ensure high-quality software delivery",
    ],
    stack: ["NuxtJS", "GoLang", "KYC/AML APIs", "Identity Verification Systems"],
    highlight: false,
  },
  {
    id: "udaya-tech",
    company: "Udaya Technology Co., Ltd",
    role: "Software Developer",
    period: "November 2019 – February 2022",
    desc:
      "Developed multiple enterprise solutions including payroll management for logistics, real-time fleet tracking systems, and Electronic Medical Records (EMR) deployed across government hospitals.",
    responsibilities: [
      "Built payroll system handling 1,000+ employees for logistics company — salary computation, leave management, performance reviews",
      "Developed Fleet Management System — real-time tracking dashboard, zone management, vehicle and driver management",
      "Developed EMR (Electronic Medical Records) system deployed to 10+ government hospitals — role-based access, patient management, appointment management",
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

const education: Education[] = [
  { id: "setec", institution: "SETEC Institute", degree: "Management Information System", period: "2018 – 2022" },
];

export const WorkHistory = () => {
  return (
    <section 
      id="notes" 
      className="min-h-screen flex items-center justify-center py-16 lg:py-24 px-8 lg:px-16"
      aria-labelledby="work-history-heading"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          id="work-history-heading"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-(--text) mb-16 lg:mb-24 tracking-tight text-balance"
        >
          Work History
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative space-y-16 lg:pl-12"
          role="list"
          aria-label="Work experience timeline"
        >
          {/* Timeline vertical line - visible on all breakpoints for continuity */}
          <div 
            className="absolute left-[8px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-(--accent)/30 to-transparent"
            aria-hidden="true"
          />
          
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative pl-8 lg:pl-16"
              aria-labelledby={`exp-${exp.id}-heading`}
              role="listitem"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.1 }}
                className="absolute left-[4px] lg:left-[8px] top-[28px] w-3 h-3 flex items-center justify-center"
                aria-hidden="true"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    exp.highlight ? "bg-(--accent)" : "bg-(--muted)"
                  } ring-2 ring-(--accent)/30 ${exp.highlight ? "ring-(--accent)/50" : ""}`}
                />
              </motion.div>

              <div
                className="relative py-6 px-4 lg:px-6 rounded-sm"
                style={{ boxShadow: "inset 0 1px 0 rgba(0,0,0,0.06)" }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3
                    id={`exp-${exp.id}-heading`}
                    className="font-display text-xl md:text-2xl lg:text-3xl font-normal text-(--text) hover:text-(--accent) transition-colors duration-300 cursor-default text-balance"
                  >
                    {exp.role}
                  </h3>
                  {exp.highlight && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="inline-flex items-center text-[11px] px-2.5 py-1 rounded-sm bg-(--accent)/10 border border-(--accent)/40 text-(--accent) font-medium tracking-wide uppercase"
                    >
                      Present
                    </motion.span>
                  )}
                </div>

                <div className="font-body text-sm text-(--muted) mb-4 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-(--accent)/40" aria-hidden="true" />
                  {exp.company}
                  <span className="text-(--accent)/30 mx-1">·</span>
                  <span className="text-xs uppercase tracking-wider">{exp.period}</span>
                </div>

                <p className="text-(--text) text-sm md:text-base leading-relaxed mb-6 max-w-[70ch] text-pretty">
                  {exp.desc}
                </p>

                <ul className="space-y-3 text-sm text-(--text) mb-6 max-w-[60ch]">
                  {exp.responsibilities.map((r, idx) => (
                    <motion.li
                      key={`${exp.id}-resp-${idx}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className="text-(--accent) mt-0.5 shrink-0 font-mono text-xs"
                        aria-hidden="true"
                      >
                        →
                      </span>
                      <span className="leading-relaxed text-pretty">{r}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((s, idx) => (
                    <motion.span
                      key={`${exp.id}-stack-${idx}`}
                      initial={{ opacity: 0, scale: 0.85, filter: "blur(2px)" }}
                      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", duration: 0.3, bounce: 0, delay: idx * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={styles.techTag}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-16 lg:mt-20"
          aria-labelledby="education-heading"
        >
          <h3
            id="education-heading"
            className="font-display text-xl md:text-2xl font-normal text-(--text) mb-6 tracking-tight text-balance"
          >
            Education
          </h3>
          {education.map((e) => (
            <article
              key={e.id}
              className="py-4 flex flex-wrap items-baseline gap-4"
              style={{ boxShadow: "inset 0 -1px 0 rgba(0,0,0,.06)" }}
              aria-labelledby={`edu-${e.id}-heading`}
            >
              <h4
                id={`edu-${e.id}-heading`}
                className="font-display text-lg md:text-xl text-(--text) font-light"
              >
                {e.institution}
              </h4>
              <span className="font-body text-sm text-(--muted)">{e.degree}</span>
              <span className="text-xs uppercase tracking-widest text-(--muted)">
                {e.period}
              </span>
            </article>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          #notes * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};
