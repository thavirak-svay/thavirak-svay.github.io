"use client";

import { ProjectCard } from "../components/ProjectCard";
import type { Project } from "../types/projectTypes";

const projects: Project[] = [
  {
    title: "Wing Unified",
    problem:
      "Legacy systems were fragmented and unable to scale for  workloads. Multiple disparate platforms needed consolidation into an ecosystem.",
    solution:
      "Architected unified microservices platform integrating food delivery, e-commerce, logistics, and ticketing. Designed service boundaries, event-driven communication, and payment orchestration handling high-volume transactions.",
    tags: ["Microservices", "Event-Driven", "Spring Boot", "Kafka"],
    metrics: { scope: "Enterprise Scale", impact: "High-Volume Processing" },
    arch: [
      "10+ Enterprise Microservices",
      "Event Bus (Kafka)",
      "Payment Orchestration",
      "Unified API Gateway",
    ],
  },
  {
    title: "State Hospital System",
    problem:
      "10+ state hospitals had fragmented patient data with no secure interoperability, leading to operational inefficiencies and data silos.",
    solution:
      "Deployed secure Electronic Medical Records system across 10+ hospitals with role-based access control, audit logging, and encrypted data transfer, enabling seamless patient information flow while ensuring regulatory compliance.",
    tags: ["Healthcare", "Compliance", "RBAC", "Security"],
    metrics: { scope: "10+ Hospitals", impact: "Data Integrity" },
    arch: [
      "Secure API Layer",
      "Role-Based Auth",
      "Encrypted Store",
      "Audit Trails",
    ],
  },
  {
    title: "Global Identity Verification",
    problem:
      "Global identity verification process was facing high latency and compliance risks with sensitive political data.",
    solution:
      "Enhanced identity verification platform processing political identity verification worldwide. Integrated third-party APIs (KYC/AML providers), improving fraud detection accuracy and reducing processing time during high-volume peak loads.",
    tags: ["Security", "GoLang", "NuxtJS", "API Integration"],
    metrics: { scope: "Global Users", impact: "Improved Performance" },
    arch: [
      "GoLang Backend",
      "NuxtJS Frontend",
      "KYC/AML Integration",
      "Fraud Detection Engine",
    ],
  },
  {
    title: "GPS Tracking System",
    problem:
      "Real-time GPS tracking for 50+ vehicles was saturating HTTP polling limits, leading to stale data and high server costs.",
    solution:
      "Built persistent WebSocket mesh network to handle bidirectional telemetry with sub-second latency location updates. Implemented efficient geofencing algorithms for real-time alerts.",
    tags: ["IoT", "Real-time", "WebSockets", "React"],
    metrics: { scope: "50+ Vehicles", impact: "Sub-Second Latency" },
    arch: [
      "React Client",
      "WebSocket Server",
      "Telemetry Ingest",
      "Geofencing Engine",
    ],
  },
];

export const Projects = () => {
  return (
    <section
      id="projects"
      className="py-20 md:py-32 px-6 md:px-20 relative bg-[#050507]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 flex items-end justify-between">
          <div>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white text-balance">
              SELECTED WORKS
            </h2>
            <p className="font-mono text-slate-400 mt-4">
              A curated selection of engineering challenges.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-xs font-mono text-slate-400">
              PROJECT_COUNT
            </div>
            <div className="text-4xl font-display text-slate-400 tabular-nums">04</div>
          </div>
        </div>

        <div className="flex flex-col">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
