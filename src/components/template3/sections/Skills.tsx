import React from "react";
import { Server, Database, Layers, Network } from "lucide-react";
import { SectionTitle } from "../components/SectionTitle";
import { BentoCard } from "../components/BentoCard";

export const Skills = () => {
  return (
    <section id="skills" className="py-32 px-8 md:px-12 lg:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Technical Expertise" subtitle="The Stack" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px]">
          <BentoCard
            className="md:col-span-2"
            title="Backend & Languages"
            icon={Server}
            items={[
              "Java (Spring Boot, Spring Framework)",
              "TypeScript/JavaScript (NestJS, Node.js)",
              "GoLang",
            ]}
            delay={0}
          />
          <BentoCard
            className="md:col-span-1"
            title="Architecture & Design"
            icon={Network}
            items={[
              "Microservices",
              "Event-driven architecture",
              "REST APIs",
              "GraphQL",
              "Domain-Driven Design",
            ]}
            delay={0.1}
          />
          <BentoCard
            className="md:col-span-1 bg-blue-900/10"
            title="Messaging & Databases"
            icon={Database}
            items={["Apache Kafka", "RabbitMQ", "WebSockets", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Hasura"]}
            delay={0.2}
          />
          <BentoCard
            className="md:col-span-3"
            title="Cloud & DevOps"
            icon={Layers}
            items={["Docker", "Kubernetes", "AWS", "Git", "CI/CD (Jenkins, GitLab)", "ELK Stack", "Kibana", "OAuth2/SSO"]}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

