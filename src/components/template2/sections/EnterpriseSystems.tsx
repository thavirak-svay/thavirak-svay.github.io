"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "../types/projectTypes";

const projects: Project[] = [
  {
    title: "Open QR Payment",
    problem: "Payment QR system needed migration to modern architecture with enhanced security compliance for bank-wide transactions.",
    solution: "Led migration effort and implemented security enhancements including signature verification and zero-trust validation for payment QR generation across merchants and personal users.",
    tags: ["Java", "Spring Boot", "PostgreSQL"],
    metrics: { scope: "Bank-wide Payments", impact: "QR payment generation for merchants and personal users" },
    arch: ["QR Generator", "Payment Integration", "User Management"],
    visibility: "enterprise",
  },
  {
    title: "CMDB Platform",
    problem: "Infrastructure team had no centralized visibility into servers, applications, databases, and network devices across the bank.",
    solution: "Lead development of centralized inventory platform — tracking all servers, apps, databases, network devices with automated sync from infrastructure monitoring tools.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "WSO2", "React"],
    metrics: { scope: "Enterprise Infrastructure", impact: "Centralized asset tracking with automated monitoring sync" },
    arch: ["Asset Registry", "Auto-Sync", "Monitoring Integration"],
    visibility: "enterprise",
  },
  {
    title: "WingUnified",
    problem: "Fragmented commerce subsidiaries across the bank caused operational inefficiencies, inconsistent customer experiences, and disconnected business processes.",
    solution: "Built unified platform consolidating all commerce subsidiaries — integrated order management, payment processing, and customer data into a single cohesive ecosystem.",
    tags: ["Java", "Spring Boot", "Kafka", "WSO2"],
    metrics: { scope: "Bank-wide Commerce", impact: "Unified commerce platform connecting all subsidiaries with centralized operations" },
    arch: ["Order Service", "Payment Gateway", "API Management"],
    visibility: "enterprise",
  },
  {
    title: "WingShopping",
    problem: "Wing Bank needed an e-commerce platform with robust backend services, third-party API integrations, and product catalog management.",
    solution: "Built backend services handling product catalog, checkout flows, and third-party API integrations for the e-commerce platform.",
    tags: ["NestJS", "Firebase", "TypeScript"],
    metrics: { scope: "E-Commerce Platform", impact: "Full e-commerce backend with third-party integrations and product catalog" },
    arch: ["Product Catalog", "Checkout Service", "API Integration"],
    visibility: "enterprise",
  },
  {
    title: "WingMall",
    problem: "Food delivery platform needed performance optimization and new business features across both frontend and backend.",
    solution: "Maintained and optimized full-stack platform as both frontend and backend developer — improved API response times, fixed production issues, shipped new features.",
    tags: ["NestJS", "Firebase", "React", "TypeScript"],
    metrics: { scope: "Food Delivery Platform", impact: "Improved API response times, production stability, new feature delivery" },
    arch: ["Order Management", "Restaurant API", "Delivery Tracking"],
    visibility: "enterprise",
  },
  {
    title: "Identity Verification Platform",
    problem: "Global platform needed PEP (Politically Exposed Persons) screening and high-profile individual checks for identity verification.",
    solution: "Maintained and enhanced identity verification platform — integrated KYC/AML APIs, optimized backend and frontend performance, shipped new features.",
    tags: ["NuxtJS", "GoLang", "KYC/AML APIs"],
    metrics: { scope: "Global Identity Verification", impact: "PEP screening platform with KYC/AML integration and performance optimization" },
    arch: ["PEP Screening", "KYC/AML Integration", "Identity Checks"],
    visibility: "enterprise",
  },
  {
    title: "Payroll Management System",
    problem: "Logistics company lacked structured payroll management, relying on disconnected spreadsheets for salary adjustments, leave tracking, and performance data.",
    solution: "Built management platform enabling HR to input salary increments/deductions, track leave balances, and manage performance review cycles with validation and history tracking.",
    tags: ["Java", "Spring Boot", "PostgreSQL"],
    metrics: { scope: "Enterprise HR", impact: "Streamlined data entry with validation and history tracking" },
    arch: ["Management UI", "Salary Adjustments", "Leave Tracking", "Performance Entry"],
    visibility: "enterprise",
  },
  {
    title: "Fleet Management System",
    problem: "Logistics company needed real-time tracking dashboard, zone management, and comprehensive vehicle/driver management.",
    solution: "Built fleet management platform with real-time tracking dashboard, zone management, and vehicle/driver management.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "React"],
    metrics: { scope: "Logistics Operations", impact: "Real-time fleet tracking with zone, vehicle, and driver management" },
    arch: ["Tracking Dashboard", "Zone Management", "Vehicle Registry"],
    visibility: "enterprise",
  },
  {
    title: "EMR System",
    problem: "Government hospitals needed electronic medical records system with role-based access, patient management, and appointment scheduling.",
    solution: "Built EMR platform with role-based access control, patient management, and appointment scheduling.",
    tags: ["Java", "Spring Boot", "React", "PostgreSQL"],
    metrics: { scope: "Healthcare", impact: "Deployed EMR with role-based access and patient management" },
    arch: ["Patient Management", "Appointment System", "Role-Based Access"],
    visibility: "enterprise",
  },
];

const TechStack = ({ tags }: { tags: string[] }) => (
  <motion.div 
    className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-3"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.15 }}
  >
    {tags.map((tag, idx) => (
      <motion.span
        key={tag}
        className="font-display text-sm text-(--muted) font-light hover:text-(--text) cursor-default transition-colors duration-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.06 }}
      >
        {tag}
      </motion.span>
    ))}
  </motion.div>
);

const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  
  return (
    <motion.div
      className="project-row py-8 lg:py-16 grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr] gap-8 lg:gap-16"
      style={{ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.06)' }}
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
    >
      <motion.div
        variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
        transition={{ type: "spring", duration: 0.3, bounce: 0, delay: index * 0.04 }}
      >
        <h3 className="font-display text-3xl lg:text-4xl font-normal tracking-tight text-(--text) text-balance">
          {project.title}
        </h3>
        <TechStack tags={project.tags} />
        <div className="flex gap-3 mt-5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-(--accent) text-(--white) font-body text-xs hover:opacity-90 transition-opacity active:scale-[0.96] transition-transform min-h-[40px]"
            >
              <Github className="w-3 h-3" />
              Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-(--accent) text-(--accent) font-body text-xs hover:bg-(--accent) hover:text-(--white) transition-colors active:scale-[0.96] transition-transform min-h-[40px]"
            >
              <ExternalLink className="w-3 h-3" />
              Demo
            </a>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
          <div className="font-body text-xs uppercase tracking-widest text-(--muted) mb-2">Problem</div>
          <p className="font-body text-sm text-(--text) leading-relaxed text-pretty">{project.problem}</p>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
          <div className="font-body text-xs uppercase tracking-widest text-(--muted) mb-2">Approach</div>
          <p className="font-body text-sm text-(--text) leading-relaxed text-pretty">{project.solution}</p>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
          <div className="font-body text-xs uppercase tracking-widest text-(--muted) mb-2">Impact</div>
          <p className="font-body text-sm text-(--text) leading-relaxed text-pretty">{project.metrics.impact}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const EnterpriseSystems = () => {
  return (
    <section id="work" className="min-h-screen py-16 lg:py-24 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-body text-xs uppercase tracking-widest text-(--muted) mb-16"
        >
          Enterprise Systems
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { },
            visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          {projects.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          #work * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};