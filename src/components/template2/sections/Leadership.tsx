"use client";

import { useRef } from "react";
import {
  Scale,
  Users,
  GitBranch,
  Target,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { ScrollRevealItem } from "../hooks/useScrollRevealOnce";

const leadershipAreas = [
  {
    icon: Scale,
    title: "Standards & Governance",
    highlights: [
      "Established coding standards across microservices ecosystems",
      "Defined architecture review process for new service designs",
      "Created shared framework with security patterns, caching, audit trails for platform consistency",
      "Enforced consistent error handling and logging standards across services",
    ],
    metric: "Platform Standards Established",
  },
  {
    icon: Users,
    title: "Mentorship & Growth",
    highlights: [
      "Mentored junior developers toward independent proficiency in Spring Boot and microservices",
      "Led regular tech knowledge sharing sessions on event-driven architecture",
      "Created onboarding documentation for new team members joining platform teams",
      "Provided code review feedback focused on learning opportunities, not just fixes",
    ],
    metric: "Developer Growth Enabled",
  },
  {
    icon: GitBranch,
    title: "Cross-team Collaboration",
    highlights: [
      "Coordinated with frontend, DevOps, QA teams on platform releases",
      "Led integration discussions with external providers for multi-provider gateway implementations",
      "Facilitated architecture decisions across stakeholder teams for commerce platforms",
      "Managed dependencies and delivery timelines with product teams for new business initiatives",
    ],
    metric: "Cross-Team Alignment",
  },
  {
    icon: Target,
    title: "Project Ownership",
    highlights: [
      "Led platform consolidation initiatives handling order and payment services",
      "Lead development of inventory tracking platforms for infrastructure visibility",
      "Currently developing payment QR systems for merchant and personal use",
      "Balanced business requirements with technical constraints across multiple platforms",
    ],
    metric: "Platform Delivery Led",
  },
];

export const Leadership = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="min-h-screen flex items-center justify-center py-16 lg:py-24 px-8 lg:px-16 bg-(--surface)"
    >
      <div className="max-w-6xl mx-auto">
        <div className="font-body text-xs uppercase tracking-widest text-(--muted) mb-16">
          Leadership & Impact
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-8 lg:gap-16">
          <div>
            <h2 className="font-display text-5xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-(--text) text-balance">
              Beyond implementation — leading teams, establishing standards, and
              driving platform success.
            </h2>
            <p className="font-body text-lg text-(--muted) leading-relaxed font-light mt-6 text-pretty">
              Technical leadership is about enabling others, not directing them.
              I set clear standards, remove blockers, and create space for
              developers to grow and deliver. I've led multiple platform
              initiatives while maintaining and evolving existing systems.
            </p>

            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadershipAreas.map((area, i) => (
              <ScrollRevealItem
                key={area.title}
                isLeft={i % 2 !== 0}
                className="active:scale-[0.96] transition-transform"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <area.icon className="w-5 h-5 text-(--accent)" />
                  <h3 className="font-display text-xl lg:text-2xl font-normal text-(--accent) text-balance">
                    {area.title}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 px-2 py-1 bg-(--surface) text-(--accent) text-xs font-body mb-4 tabular-nums">
                  <CheckCircle2 size={12} />
                  {area.metric}
                </div>
                <ul className="space-y-2">
                  {area.highlights.map((highlight, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 font-body text-sm text-(--muted)"
                    >
                      <ArrowRight
                        size={12}
                        className="text-(--secondary) mt-1 shrink-0"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </ScrollRevealItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};