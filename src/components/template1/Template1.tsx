"use client";

import React from "react";
import styles from "./Template1.module.css";

// Import all components
import { NativeShaderCanvas } from "./components/NativeShaderCanvas";
import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";
import { EngineeringPhilosophy } from "./sections/EngineeringPhilosophy";
import { CoreCompetencies } from "./sections/CoreCompetencies";
import { ExperienceTimeline } from "./sections/ExperienceTimeline";
import { Education } from "./sections/Education";
import { SelectedWorks } from "./sections/SelectedWorks";
import { Leadership } from "./sections/Leadership";
import { Footer } from "./sections/Footer";

const Template1 = () => {
  return (
    <div
      className={`${styles.template1Container} ${styles.template1Scrollbar}`}
    >
      {/* Shader Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NativeShaderCanvas />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <Navbar />
        <Hero />
        <EngineeringPhilosophy />
        <CoreCompetencies />
        <ExperienceTimeline />
        <Education />
        <SelectedWorks />
        <Leadership />
        <Footer />
      </main>

      {/* Overlay Effects */}
      <div className="fixed inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-20" />
      <div
        className="fixed inset-0 z-20 pointer-events-none opacity-[0.01] mix-blend-overlay bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default Template1;
