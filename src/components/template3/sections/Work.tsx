import React from "react";
import { SectionTitle } from "../components/SectionTitle";
import { ProjectCard } from "../components/ProjectCard";
import styles from "../Template3.module.css";

export const Work = () => {
  return (
    <section id="work" className="py-32 px-8 md:px-12 lg:px-16 bg-black/30">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Work Experience" subtitle="Impact & Scale" />
        <div className={`${styles.template3ProjectCardContainer} space-y-0`}>
          <ProjectCard
            title="Wing Unified"
            type="Wing Bank (Cambodia) Plc"
            stack={["Java 21", "Spring Boot 3.3.3", "Apache Kafka", "PostgreSQL", "Redis/Redisson", "OAuth2/OIDC", "Kubernetes"]}
            metrics={[
              { label: "Role", value: "Backend Developer" },
              { label: "Scale", value: "Enterprise" },
              { label: "Microservices", value: "10+" },
            ]}
          >
            Core contributor and partial lead on backend development. Architected WingUnified platform consolidating legacy systems into 10+ enterprise microservices using Spring Boot, powering food delivery, e-commerce, and courier services. Built wing-eco-framework providing shared utilities, security patterns, data abstractions, caching and audit trails. Developed order-service as core orchestration engine implementing polymorphic order management for multiple business verticals with state machines, financial processing, loyalty integration and cash flow reconciliation. Integrated enterprise payment and security systems with multi-provider payment gateway for Wing Bank, Acleda Bank MPGS/GPay and credit cards using OAuth2 token management.
          </ProjectCard>

          <ProjectCard
            title="Global Identity Verification"
            type="Web Essentials Co., Ltd"
            stack={[
              "GoLang",
              "NuxtJS",
              "API Integration",
              "Identity Verification Systems",
            ]}
            metrics={[
              { label: "Region", value: "Global" },
              { label: "Performance", value: "Optimized" },
              { label: "Fraud Detection", value: "Improved" },
            ]}
          >
            Enhanced global identity verification platform processing political identity verification and fraud detection worldwide, built with NuxtJS frontend and GoLang backend. Integrated third-party identity verification APIs (KYC/AML providers), expanding platform capabilities and improving fraud detection accuracy through enhanced data validation. Optimized system performance by resolving critical bottlenecks, reducing verification processing time during high-volume peak loads.
          </ProjectCard>

          <ProjectCard
            title="Payroll, GPS Tracking & EMR Systems"
            type="Udaya Technology Co., Ltd"
            stack={["Java (Spring Boot)", "ReactJS", "WebSockets", "PostgreSQL", "MySQL", "REST APIs"]}
            metrics={[
              { label: "Employees", value: "1,000+" },
              { label: "Vehicles", value: "50+" },
              { label: "Hospitals", value: "10+" },
              { label: "Performance", value: "Optimized" },
            ]}
          >
            Built comprehensive payroll management platform serving 1,000+ employees using Java Spring Boot and ReactJS, handling salary calculations, fund management, leave requests, and performance tracking with role-based access control. Developed real-time GPS tracking system managing 50+ vehicles with WebSocket connections and ReactJS frontend featuring interactive maps, geofencing, and sub-second latency location updates. Created Electronic Medical Records (EMR) system deployed across 10+ state hospitals in Cambodia, implementing secure RESTful APIs, role-based access control, and encrypted patient data handling with seamless inter-department workflows. Optimized database performance through schema design and query tuning, improving response times across all applications.
          </ProjectCard>
        </div>
      </div>
    </section>
  );
};

