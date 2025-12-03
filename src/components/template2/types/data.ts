import {
  Server,
  Database,
  Globe,
  ShieldCheck,
  Code2,
  Layers,
  Activity,
} from "lucide-react";

export const SKILLS = [
  {
    name: "Backend & Languages",
    icon: Server,
    desc: "Java (Spring Boot, Spring Framework), TypeScript/JavaScript (NestJS, Node.js), GoLang.",
    col: "md:col-span-2",
  },
  {
    name: "Architecture & Design",
    icon: Globe,
    desc: "Microservices, Event-driven architecture, REST APIs, GraphQL, Domain-Driven Design.",
    col: "md:col-span-1",
  },
  {
    name: "Messaging & Databases",
    icon: Database,
    desc: "Apache Kafka, RabbitMQ, WebSockets, PostgreSQL, MySQL, MongoDB, Redis, Firebase, Hasura.",
    col: "md:col-span-1",
  },
  {
    name: "Cloud & DevOps",
    icon: Layers,
    desc: "Docker, Kubernetes, AWS, Git, CI/CD (Jenkins, GitLab), ELK Stack, Kibana, OAuth2/SSO.",
    col: "md:col-span-2",
  },
];

export const PROJECTS = [
  {
    id: "01",
    title: "Wing Unified",
    category: "Fintech Architecture",
    role: "Backend Developer",
    year: "2022-2024",
    desc: "Architected unified microservices platform integrating food delivery, e-commerce, logistics, and ticketing. Designed service boundaries, event-driven communication, and payment orchestration handling high-volume transactions.",
    tech: "Java 21 / Spring Boot 3.3.3 / Apache Kafka / PostgreSQL / Redis/Redisson / OAuth2/OIDC / Kubernetes",
  },
  {
    id: "02",
    title: "State Hospital System",
    category: "HealthTech",
    role: "Software Developer",
    year: "2019-2022",
    desc: "Deployed secure Electronic Medical Records system across 10+ hospitals with role-based access control, audit logging, and encrypted data transfer, enabling seamless patient information flow while ensuring regulatory compliance.",
    tech: "Java / Spring Boot / ReactJS / PostgreSQL",
  },
  {
    id: "03",
    title: "Global Identity Verification",
    category: "Security SaaS",
    role: "Web Developer",
    year: "2022",
    desc: "Enhanced global identity verification platform processing political identity verification worldwide. Integrated third-party APIs (KYC/AML providers), improving fraud detection accuracy and reducing processing time during high-volume peak loads.",
    tech: "GoLang / NuxtJS / API Integration / Identity Verification Systems",
  },
  {
    id: "04",
    title: "GPS Tracking System",
    category: "IoT & Logistics",
    role: "Software Developer",
    year: "2020-2021",
    desc: "Built persistent WebSocket mesh network to handle bidirectional telemetry with sub-second latency location updates. Implemented efficient geofencing algorithms for real-time alerts.",
    tech: "Java / ReactJS / WebSockets / PostgreSQL",
  },
];

export const EXPERIENCE = [
  {
    company: "Wing Bank (Cambodia) Plc",
    role: "Backend Developer",
    period: "October 2022 – Present",
    metrics: ["Enterprise Scale", "High-Volume Processing", "10+ Microservices"],
  },
  {
    company: "Web Essentials Co., Ltd",
    role: "Web Developer",
    period: "February 2022 – October 2022",
    metrics: ["Global Platform", "Performance Optimized", "Fraud Detection Improved"],
  },
  {
    company: "Udaya Technology Co., Ltd",
    role: "Software Developer",
    period: "November 2019 – February 2022",
    metrics: ["1,000+ Employees", "50+ Vehicles", "10+ Hospitals"],
  },
];
