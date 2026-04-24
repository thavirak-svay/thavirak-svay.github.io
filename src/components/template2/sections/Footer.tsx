"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Work", href: "#work" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#notes" },
  { name: "Leadership", href: "#leadership" },
  { name: "How I Work", href: "#systems" },
  { name: "Contact", href: "#footer" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/in/thavirak-svay" },
  { name: "GitHub", href: "https://github.com/thavirak-svay" },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-16 md:pb-24 border-b border-(--border)"
      >
        <div>
          <p className="font-body text-[11px] uppercase tracking-[0.15em] text-(--muted) mb-4">
            Location
          </p>
          <div className="font-body text-[15px] leading-relaxed text-(--text)">
            <p>Phnom Penh</p>
            <p>Cambodia</p>
          </div>
        </div>

        <div>
          <p className="font-body text-[11px] uppercase tracking-[0.15em] text-(--muted) mb-4">
            Contact
          </p>
          <div className="font-body text-[15px] leading-relaxed">
            <a
              href="tel:+85570933433"
              className="block text-(--text) hover:text-(--accent) transition-colors duration-300 mb-1"
            >
              +855 70 933 433
            </a>
            <a
              href="mailto:thaavirak@gmail.com"
              className="block text-(--text) hover:text-(--accent) transition-colors duration-300"
            >
thaavirak@gmail.com
            </a>
          </div>
        </div>
        <div>
          <p className="font-body text-[11px] uppercase tracking-[0.15em] text-(--muted) mb-4">
            Follow
          </p>
          <div className="flex flex-col gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 font-body text-[15px] text-(--text) hover:text-(--accent) transition-colors duration-300"
              >
                {link.name}
                <ArrowUpRight
                  size={14}
                  className="text-(--accent) transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row gap-8 md:gap-16 py-16 md:py-24"
      >
        <div className="md:w-32 shrink-0">
          <p className="font-body text-[11px] uppercase tracking-[0.15em] text-(--muted)">
            Navigation
          </p>
        </div>
        <nav className="flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
            {navLinks.map((link, index) => (
              <span key={link.name} className="flex items-center">
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="font-display text-[clamp(3rem,10vw,7rem)] font-normal leading-[0.9] tracking-[-0.02em] text-(--text) hover:text-(--accent) transition-colors duration-300 cursor-pointer"
                >
                  {link.name}
                </button>
                {index < navLinks.length - 1 && (
                  <span className="font-display text-[clamp(3rem,10vw,7rem)] font-normal leading-[0.9] tracking-[-0.02em] text-(--muted) mx-2">
                    /
                  </span>
                )}
              </span>
            ))}
          </div>
        </nav>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 border-t border-(--border)"
      >
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-1 font-body text-[14px] text-(--text) hover:text-(--accent) transition-colors duration-300"
        >
          Back To Top
          <ArrowUpRight
            size={14}
            className="text-(--accent) transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>

        <p className="font-body text-[14px] text-(--muted)">
          © {new Date().getFullYear()}
        </p>
      </motion.div>
    </footer>
  );
};
