"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { calculateExperienceYears } from "../utils/helpers";

gsap.registerPlugin(ScrollTrigger);

const MagneticBtn = ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, { x: x * 0.3, y: y * 0.3, duration: 0.2, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
    >
      {children}
    </motion.a>
  );
};

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const experienceYears = useMemo(() => calculateExperienceYears(), []);

  useEffect(() => {
    if (!heroRef.current || !headlineRef.current || !subRef.current) return;

    const ctx = gsap.context(() => {
      const line1 = headlineRef.current!.querySelector(".hero-line-1");
      const line2 = headlineRef.current!.querySelector(".hero-line-2");
      const line3 = headlineRef.current!.querySelector(".hero-line-3");
      const wordsLine1 = line1?.querySelectorAll(".hero-word") || [];
      const wordsLine2 = line2?.querySelectorAll(".hero-word") || [];
      const wordsLine3 = line3?.querySelectorAll(".hero-word") || [];
      const emphasisWord = headlineRef.current!.querySelector(".hero-emphasis");

      gsap.set([wordsLine1, wordsLine2, wordsLine3], { opacity: 0, y: 20 });
      if (line3) gsap.set(line3, { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(wordsLine1, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out",
      })
        .to(wordsLine2, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.out",
        }, "-=0.15")
        .to(line3 || [], {
          opacity: 1,
          duration: 0.2,
        }, "-=0.05")
        .to(wordsLine3, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          stagger: 0.03,
          ease: "back.out(1.4)",
        }, "-=0.05")
        .to(emphasisWord || [], {
          scale: 1.05,
          color: "var(--accent)",
          duration: 0.2,
          ease: "power2.out",
        }, "-=0.1");

      gsap.to(subRef.current, {
        y: -80,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 pb-6 md:pb-8 lg:pb-[8vh] relative overflow-hidden bg-gradient-to-b from-(--bg) via-(--bg) to-(--bg-alt)"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(2.5rem,6vw,6rem)] font-normal leading-[1.1] tracking-tight text-(--text) mb-10"
        >
          <span className="hero-line-1 block mb-1">
            <span className="hero-word inline-block mr-[0.15em]">Hi,</span>
            <span className="hero-word inline-block mr-[0.15em]">I'm</span>
            <span className="hero-word inline-block mr-[0.3em]">Thavirak.</span>
          </span>
          <span className="hero-line-2 block mb-1">
            <span className="hero-word inline-block mr-[0.15em]">I</span>
            <span className="hero-word inline-block mr-[0.15em]">deliver</span>
            <span className="hero-word hero-emphasis inline-block mr-[0.15em]">working</span>
            <span className="hero-word hero-emphasis inline-block mr-[0.3em]">systems,</span>
          </span>
          <span className="hero-line-3 block">
            <span className="hero-word inline-block mr-[0.15em]">not</span>
            <span className="hero-word inline-block mr-[0.15em]">working</span>
            <span className="hero-word inline-block">weekends.</span>
          </span>
        </h1>

        <div ref={subRef} className="max-w-[550px] px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.0, ease: "easeOut" }}
            className="font-body text-base text-(--muted) leading-relaxed font-light mb-8"
          >
            <strong className="font-medium text-(--text)">Backend Developer</strong> with <span className="tabular-nums">{experienceYears}</span>+ years of experience architecting <strong className="font-medium text-(--text)">scalable distributed systems</strong> and <strong className="font-medium text-(--text)">microservices</strong> across <strong className="font-medium text-(--text)">fintech, e-commerce, and healthcare</strong>. Hands-on experience with various <strong className="font-medium text-(--text)">backend and frontend technologies</strong>, designing robust APIs, and optimizing system performance for enterprise-grade applications.
          </motion.p>

          <div className="flex gap-6 items-center flex-wrap">
            <MagneticBtn
              href="#work"
              className="inline-block py-3 px-8 bg-(--text) text-(--bg) font-medium text-sm tracking-wide active:scale-[0.96] transition-transform duration-150"
            >
              See how I built these systems
            </MagneticBtn>
            <motion.a
              href="#experience"
              className="link-underline text-(--text) font-medium text-sm relative active:scale-[0.96] transition-transform duration-150"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.3, ease: "easeOut" }}
            >
              View my work history
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
