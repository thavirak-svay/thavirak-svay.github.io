"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Template2.module.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Import all components
import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { SystemsArchitecture } from "./sections/SystemsArchitecture";


import { NotesHistory } from "./sections/NotesHistory";
import { Leadership } from "./sections/Leadership";
import { Footer } from "./sections/Footer";

const Template2 = () => {
  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();

    return () => {
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={`${styles.template2Container} ${styles.template2Scrollbar}`}>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <SystemsArchitecture />
        <NotesHistory />
        <Leadership />
        <Footer />
      </main>
    </div>
  );
};

export default Template2;