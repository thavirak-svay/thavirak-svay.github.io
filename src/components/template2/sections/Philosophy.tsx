"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ScrollRevealItem } from "../hooks/ScrollRevealItem";
import { Database, Layers, Zap, Shield, GitBranch, Server } from "lucide-react";

const principles = [
  {
    icon: Database,
    title: "Data First, APIs Second",
    desc: "I design data models before endpoints. A well-structured database prevents API sprawl and makes scaling predictable. Every table, every index, every constraint is intentional.",
  },
  {
    icon: Layers,
    title: "Microservices When Needed",
    desc: "Not every problem needs 10 services. I decompose where boundaries exist naturally — between order processing and payment routing, between user management and transaction logging.",
  },
  {
    icon: Zap,
    title: "Event-Driven by Default",
    desc: "Kafka isn't just for big data. I use event streams to decouple services, enable retries without blocking, and build systems that self-heal. Events are the nervous system of modern backends.",
  },
  {
    icon: Shield,
    title: "Security at Every Layer",
    desc: "OAuth2/OIDC for identity. WSO2 APIM for gateway protection. Input validation, audit trails, and encrypted credentials. I treat security as infrastructure, not a feature.",
  },
  {
    icon: GitBranch,
    title: "Fail Gracefully",
    desc: "Services crash. Networks partition. Databases timeout. I design for failure with circuit breakers, retry policies, and fallback states. The system stays alive even when pieces don't.",
  },
  {
    icon: Server,
    title: "Observability Built-In",
    desc: "Logs, metrics, and traces from day one. I instrument services so production issues are diagnosed in minutes, not hours. You can't fix what you can't see.",
  },
];

export const Philosophy = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="min-h-screen flex items-center justify-center py-16 lg:py-24 px-8 lg:px-16 bg-(--surface)"
    >
      <div className="max-w-6xl mx-auto">
        <div className="font-body text-xs uppercase tracking-widest text-(--muted) mb-16">
          Backend Philosophy
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-8 lg:gap-16">
          <div>
            <h2 className="font-display text-5xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-(--text) text-balance">
              How I think about building systems that last.
            </h2>
            <p className="font-body text-lg text-(--muted) leading-relaxed font-light mt-6 text-pretty">
              Backend development isn't just about writing endpoints. It's about designing 
              systems that handle real-world chaos — concurrent users, failing networks, 
              changing requirements — without breaking. Here's what guides my decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, i) => (
              <ScrollRevealItem
                key={principle.title}
                isLeft={i % 2 !== 0}
                className="active:scale-[0.96] transition-transform"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <principle.icon className="w-5 h-5 text-(--accent)" />
                  <h3 className="font-display text-xl lg:text-2xl font-normal text-(--accent) text-balance">
                    {principle.title}
                  </h3>
                </div>
                <p className="font-body text-sm text-(--muted) leading-relaxed">
                  {principle.desc}
                </p>
              </ScrollRevealItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
