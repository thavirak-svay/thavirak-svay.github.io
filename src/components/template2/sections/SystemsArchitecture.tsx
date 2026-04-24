"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    title: "I build what the business needs",
    desc: "I translate business requirements into working software. I work closely with stakeholders to understand what problem we're solving, then deliver solutions that match what they actually need.",
  },
  {
    title: "I think in systems",
    desc: "Every service I build considers the bigger picture — how it integrates, scales, and fails. From database design to API contracts, I architect solutions that work reliably in production, not just in demos.",
  },
  {
    title: "I ship across the stack",
    desc: "Java and Spring Boot for backend services. Go when performance matters. TypeScript and NestJS for modern APIs. React when frontend work is needed. I adapt to what the project demands.",
  },
  {
    title: "I lead teams that deliver",
    desc: "I work with international remote teams, collaborate across disciplines, and ensure high-quality software ships. Fast-paced environments are where I thrive.",
  },
];

export const SystemsArchitecture = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !horizontalRef.current) return;

    const ctx = gsap.context(() => {
      const panelElements = gsap.utils.toArray(".systems-section");

      gsap.to(horizontalRef.current, {
        x: () => -(horizontalRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () =>
            `+=${horizontalRef.current!.scrollWidth - window.innerWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="systems"
      ref={sectionRef}
      className="systems-container"
      aria-label="What I've Learned - Backend Development Experience"
    >
      <div ref={horizontalRef} className="systems-panel">
        {panels.map((panel, i) => (
          <div
            key={panel.title}
            className={`systems-section ${i % 2 === 1 ? "systems-section-alt" : ""}`}
          >
            <div className="systems-inner">
              <div className="systems-content">
                <h2 className="font-display text-4xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-(--text) mb-4 text-wrap balance">
                  {panel.title}
                </h2>
                <p className="font-body text-lg text-(--muted) leading-relaxed font-light text-wrap pretty">
                  {panel.desc}
                </p>
              </div>
              <div className="sys-svg-container">
                {i === 0 && (
                  <svg className="sys-svg" viewBox="0 0 400 200">
                    <circle cx="140" cy="100" r="45" fill="var(--secondary)" />
                    <circle cx="200" cy="100" r="45" fill="var(--accent)" />
                    <circle cx="260" cy="100" r="45" fill="var(--secondary)" />
                  </svg>
                )}
                {i === 1 && (
                  <svg className="sys-svg" viewBox="0 0 400 200">
                    <circle cx="200" cy="100" r="55" fill="var(--accent)" />
                    <circle cx="200" cy="100" r="35" fill="var(--secondary)" />
                    <circle cx="200" cy="100" r="18" fill="var(--accent)" />
                  </svg>
                )}
                {i === 2 && (
                  <svg className="sys-svg" viewBox="0 0 400 200">
                    <circle cx="140" cy="100" r="35" fill="var(--secondary)" />
                    <circle cx="200" cy="100" r="35" fill="var(--accent)" />
                    <circle cx="260" cy="100" r="35" fill="var(--secondary)" />
                  </svg>
                )}
                {i === 3 && (
                  <svg className="sys-svg" viewBox="0 0 400 200">
                    <circle cx="200" cy="100" r="50" fill="var(--accent)" />
                    <circle cx="200" cy="30" r="12" fill="var(--secondary)" />
                    <circle cx="270" cy="100" r="12" fill="var(--secondary)" />
                    <circle cx="200" cy="170" r="12" fill="var(--secondary)" />
                    <circle cx="130" cy="100" r="12" fill="var(--secondary)" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
