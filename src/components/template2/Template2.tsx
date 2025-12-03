"use client";

import React from "react";
import styles from "./Template2.module.css";

// Components
import { ThreeJSBackground } from "./components/ThreeJSBackground";
import { Navbar } from "./components/Navbar";

// Sections
import { Hero } from "./sections/Hero";
import { SkillsDashboard } from "./sections/SkillsDashboard";
import { Projects } from "./sections/Projects";
import { Experience } from "./sections/Experience";
import { Footer } from "./sections/Footer";

const Template2 = () => {
  return (
    <div className={styles.template2Container}>
      <ThreeJSBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <SkillsDashboard />
        <Projects />
        <Experience />
        <Footer />
      </main>
    </div>
  );
};

export default Template2;
