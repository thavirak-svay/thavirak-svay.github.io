"use client";

import React, { useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import styles from "./Template3.module.css";

// Components
import { WebGLBackground } from "./components/WebGLBackground";
import { Navbar } from "./components/Navbar";

// Sections
import { Hero } from "./sections/Hero";
import { Skills } from "./sections/Skills";
import { Work } from "./sections/Work";
import { Process } from "./sections/Process";
import { Contact } from "./sections/Contact";

// Utils
import { calculateExperienceYears } from "./utils/helpers";

export default function Template3() {
  const experienceYears = useMemo(() => calculateExperienceYears(), []);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className={`${styles.template3Container} ${styles.template3Scrollbar} relative`}
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 to-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background */}
      <WebGLBackground />

      {/* Navbar */}
      <Navbar />

      <main className="relative z-10">
        <Hero experienceYears={experienceYears} />
        <Skills />
        <Work />
        <Process />
        <Contact />
      </main>
    </div>
  );
}
