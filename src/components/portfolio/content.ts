// Site and resume copy.

export const contact = {
  email: "thaavirak@gmail.com",
  phone: "+855 70 933 433",
  phoneHref: "tel:+85570933433",
  linkedin: "https://linkedin.com/in/thavirak-svay",
  github: "https://github.com/thavirak-svay",
};

// first full-time role; the internship before it isn't counted
const careerStart = new Date(2020, 10, 1);
export const experienceYears = () =>
  Math.floor(
    (Date.now() - careerStart.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );

const intro =
  "specialising in secure, scalable and maintainable systems. Currently part of Wing Bank’s platform team, improving and maintaining the in-house framework that forms the backbone of the bank’s microservices, building security services for user accounts and devices, and streaming real-time updates to the app.";
const path =
  "Started out in frontend, moved through full-stack and grew into backend.";
const ai =
  "Optimistic about AI-assisted development and already uses coding agents in daily work.";

export const profile = {
  name: "Thavirak Svay",
  title: "Backend Developer",
  location: "Phnom Penh, Cambodia",
  website: "thavirak-svay.github.io",
  // The site shows the years in its facts grid. The CV skips the path,
  // which its work history already covers, to stay on one A4 page.
  summary: (years?: number) =>
    years
      ? `Backend developer with ${years}+ years of experience, ${intro} ${ai}`
      : `Backend developer ${intro} ${path} ${ai}`,
};

export const shortCompany = (name: string) =>
  name.replace(/ (Co\., Ltd|\(Cambodia\) Plc)$/, "");

export interface Stage {
  title: string;
  period?: string;
  items: string[];
}

export interface Job {
  id: string;
  company: string;
  period: string;
  stages: Stage[]; // newest first
  stack: string[];
}

export const experiences: Job[] = [
  {
    id: "wing-bank",
    company: "Wing Bank (Cambodia) Plc",
    period: "October 2022 – Present",
    stages: [
      {
        title: "Backend Developer, Platform Team",
        period: "February 2024 – Present",
        items: [
          "Maintain and extend the in-house framework that all of Wing Bank’s microservices are built on",
          "Build account security microservices and update their authentication and authorization flows whenever the bank launches a new account type or product",
          "Develop a distributed set of server-sent event services that consume events from Apache Kafka, stream real-time updates to the Wing mobile app and scale horizontally with traffic",
          "Implement device attestation so that only requests from genuine devices reach the API gateway and microservices",
          "Use WSO2 API Manager for routing and rate limiting at the gateway, and WSO2 Identity Server for OAuth 2.0 and OpenID Connect authentication",
        ],
      },
      {
        title: "Backend Developer, Wing Commerce",
        period: "October 2022 – February 2024",
        items: [
          "Built the backends for WingShopping, an online store, and WingTicketing, a ticket booking service, with NestJS and Firebase, covering the product catalogue, checkout, booking flows and third-party API integrations",
          "Developed the order and payment services for Wing Unified, a shared commerce platform for Wing’s businesses, including order management, transaction processing and multi-provider payment integration, using Java and Spring Boot",
          "Built the CMDB, a configuration management database for the bank’s servers, applications, databases and network devices, including the Spring Boot backend, the Next.js frontend and automated sync from infrastructure monitoring tools",
        ],
      },
      {
        title: "Frontend Web Developer, Wing Commerce",
        period: "October 2022 – February 2024",
        items: [
          "Shipped new features for WingMall, Wing’s food delivery platform, in React as part of a Scrum team",
          "Built serverless APIs and event-driven triggers for the WingMall web and mobile apps with Cloud Functions for Firebase",
          "Designed Cloud Firestore data models and wrote Firebase Security Rules to enforce authorization on application data",
        ],
      },
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Apache Kafka",
      "WSO2 API Manager",
      "WSO2 Identity Server",
      "NestJS",
      "Firebase",
      "Next.js",
      "React",
    ],
  },
  {
    id: "web-essentials",
    company: "Web Essentials Co., Ltd",
    period: "February 2022 – September 2022",
    stages: [
      {
        title: "Web Developer",
        items: [
          "Built the Nuxt frontend of a global identity verification platform for politically exposed person screening, integrating KYC and AML data providers",
          "Developed Go microservices backed by Dgraph for graph data and Elasticsearch for search",
          "Integrated third-party services for billing, external data providers and CRM",
        ],
      },
    ],
    stack: ["Nuxt", "Go", "Dgraph", "Elasticsearch"],
  },
  {
    id: "udaya",
    company: "Udaya Technology Co., Ltd",
    period: "November 2020 – January 2022",
    stages: [
      {
        title: "Frontend Developer",
        items: [
          "Built React frontends for business systems in healthcare, payroll and GPS fleet tracking, working closely with designers and the API team",
          "Developed APIs with Node.js and Express, along with chatbots for Telegram and Facebook Messenger",
        ],
      },
    ],
    stack: ["React", "JavaScript", "Node.js", "Express"],
  },
];
export const education = [
  {
    id: "setec",
    institution: "SETEC Institute",
    degree: "Management Information Systems",
    period: "2018 – 2022",
  },
];
export interface Project {
  title: string;
  company: string;
  summary: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: "Internal service framework",
    company: "Wing Bank",
    summary:
      "Wing Bank’s in-house framework for building microservices, maintained by the platform team.",
    tags: ["Java", "Spring Boot"],
  },
  {
    title: "Security services",
    company: "Wing Bank",
    summary:
      "Account security microservices for authentication and authorization, plus device attestation that keeps untrusted traffic away from the API gateway. Updated with each new account type or product the bank launches.",
    tags: ["Java", "Spring Boot"],
  },
  {
    title: "CMDB",
    company: "Wing Bank",
    summary:
      "A configuration management database tracking the bank’s servers, applications, databases and network devices, kept current by syncing from the monitoring tools. Built the backend and the frontend.",
    tags: ["Java", "Spring Boot", "Next.js"],
  },
  {
    title: "Wing commerce platforms",
    company: "Wing Commerce",
    summary:
      "Frontend and backend work across Wing’s commerce products: WingMall for food delivery, WingShopping for online shopping, WingTicketing for ticket booking, and Wing Unified, a shared commerce platform.",
    tags: ["React", "NestJS", "Firebase", "Java", "Spring Boot"],
  },
];
export const stack = [
  { category: "Languages", items: ["Java", "Go", "TypeScript", "JavaScript"] },
  { category: "Backend", items: ["Spring Boot", "NestJS", "Node.js", "Express"] },
  {
    category: "Data and messaging",
    items: ["PostgreSQL", "Oracle Database", "Apache Kafka"],
  },
  {
    category: "APIs and security",
    items: [
      "REST",
      "Server-sent events",
      "OAuth 2.0",
      "OpenID Connect",
      "WSO2 API Manager",
      "WSO2 Identity Server",
    ],
  },
  { category: "Frontend", items: ["React", "Next.js", "Nuxt"] },
];
