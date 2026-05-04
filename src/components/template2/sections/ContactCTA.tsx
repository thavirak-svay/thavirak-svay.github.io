"use client";

import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useRef } from "react";
import { Mail, Linkedin, Github, Phone } from "lucide-react";

// Magnetic button effect
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
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
};

export const ContactCTA = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="min-h-screen flex flex-col items-center justify-center px-8 lg:px-16 py-16">
      <div className="max-w-6xl mx-auto">
<div className="font-body text-xs uppercase tracking-widest text-(--muted) mb-8">
           Contact
         </div>

<h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-normal leading-[0.9] tracking-tight text-(--text) mb-12 text-wrap balance">
           Ready to build
           <br />
           something that
           <br />
           scales?
         </h2>

        <div className="flex gap-8 items-center flex-wrap">
          <MagneticBtn
            href="mailto:thaavirak@gmail.com"
            className="inline-block py-4 px-10 bg-(--text) text-(--bg) font-medium text-sm tracking-wide active:scale-[0.96] transition-transform duration-150"
          >
            thaavirak@gmail.com
          </MagneticBtn>

          <a
            href="tel:+85570933433"
            className="link-underline text-(--text) font-medium text-sm relative active:scale-[0.96] transition-transform duration-150"
          >
            +855 70 933 433
          </a>

          <a
            href="https://linkedin.com/in/thavirak-svay"
            target="_blank"
            className="link-underline text-(--text) font-medium text-sm relative active:scale-[0.96] transition-transform duration-150"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/thavirak-svay"
            target="_blank"
            className="link-underline text-(--text) font-medium text-sm relative active:scale-[0.96] transition-transform duration-150"
          >
            GitHub
          </a>
        </div>

<div className="mt-16 pt-8 font-body text-xs uppercase tracking-widest text-(--muted)" style={{ boxShadow: 'inset 0 1px 0 var(--shadow-sm)' }}>
           © <span className="tabular-nums">{currentYear}</span> Thavirak Svay. Designed & Engineered with precision.
         </div>
      </div>
    </footer>
  );
};
