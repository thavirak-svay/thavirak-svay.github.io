"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  Server,
  Database,
  Globe,
  ShieldCheck,
  Code2,
  Layers,
  Activity,
  ArrowUpRight,
  Mail,
  Linkedin,
  Github,
  Menu,
  X,
  Cpu,
  Terminal,
} from "lucide-react";

import * as THREE from "three";

import clsx from "clsx";

import { twMerge } from "tailwind-merge";

/**

 * ------------------------------------------------------------------

 * UTILS

 * ------------------------------------------------------------------

 */

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

/**

 * ------------------------------------------------------------------

 * CONFIGURATION & DATA

 * ------------------------------------------------------------------

 */

const SKILLS = [
  {
    name: "Microservices",
    icon: Server,
    desc: "Spring Boot & NestJS event-driven architectures.",
    col: "md:col-span-2",
  },

  {
    name: "Distributed Systems",
    icon: Globe,
    desc: "High-availability clusters & load balancing.",
    col: "md:col-span-1",
  },

  {
    name: "Real-time Tech",
    icon: Activity,
    desc: "WebSocket, Kafka streams & GPS telemetry.",
    col: "md:col-span-1",
  },

  {
    name: "Data Engineering",
    icon: Database,
    desc: "PostgreSQL sharding, Redis caching, MongoDB.",
    col: "md:col-span-2",
  },

  {
    name: "DevSecOps",
    icon: Layers,
    desc: "K8s, Docker, AWS, OAuth2 & JWT hardening.",
    col: "md:col-span-3",
  },
];

const PROJECTS = [
  {
    id: "01",

    title: "WingUnified Platform",

    category: "Fintech Architecture",

    role: "Lead Architect",

    year: "2024",

    desc: "A unified microservices core enabling the integration of WingMall, Express, and Shopping verticals into a single super-app ecosystem.",

    tech: "Java / Spring Boot / Kafka",
  },

  {
    id: "02",

    title: "Super-App Ecosystem",

    category: "High-Frequency Trading",

    role: "Backend Developer",

    year: "2023",

    desc: "Event-driven NestJS architecture handling hundreds of transactions per second with sub-millisecond latency for Cambodia's leading bank.",

    tech: "NestJS / Redis / Postgres",
  },

  {
    id: "03",

    title: "Global ID Verification",

    category: "Security SaaS",

    role: "Full Stack Engineer",

    year: "2022",

    desc: "Aggregated worldwide identity providers into a single risk-assessment API, reducing verification time by 40% for political entities.",

    tech: "GoLang / NuxtJS / REST",
  },

  {
    id: "04",

    title: "National EMR System",

    category: "HealthTech",

    role: "Core Developer",

    year: "2021",

    desc: "Deployed a secure, HIPAA-compliant Electronic Medical Records system across 10+ state hospitals, digitizing patient data nationwide.",

    tech: "Java / React / MySQL",
  },
];

const EXPERIENCE = [
  {
    company: "Wing Bank",

    role: "Backend Developer",

    period: "2022 — Present",

    metrics: ["100k+ Daily Txns", "Super-App Core"],
  },

  {
    company: "Web Essentials",

    role: "Web Developer",

    period: "2022",

    metrics: ["Global SaaS", "GoLang Performance"],
  },

  {
    company: "Udaya Technology",

    role: "Software Developer",

    period: "2019 — 2022",

    metrics: ["GovTech", "Full Stack Lead"],
  },
];

/**

 * ------------------------------------------------------------------

 * SHADER (LIQUID SILVER)

 * ------------------------------------------------------------------

 */

const vertexShader = `

varying vec2 vUv;

void main() {

  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}

`;

const fragmentShader = `

uniform float uTime;

uniform vec2 uMouse;

uniform vec2 uResolution;

varying vec2 vUv;



// Simplex noise

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){

  const vec4 C = vec4(0.211324865405187, 0.366025403784439,

           -0.577350269189626, 0.024390243902439);

  vec2 i  = floor(v + dot(v, C.yy) );

  vec2 x0 = v -   i + dot(i, C.xx);

  vec2 i1;

  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);

  vec4 x12 = x0.xyxy + C.xxzz;

  x12.xy -= i1;

  i = mod(i, 289.0);

  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))

  + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);

  m = m*m ;

  m = m*m ;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;

  vec3 h = abs(x) - 0.5;

  vec3 ox = floor(x + 0.5);

  vec3 a0 = x - ox;

  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

  vec3 g;

  g.x  = a0.x  * x0.x  + h.x  * x0.y;

  g.yz = a0.yz * x12.xz + h.yz * x12.yw;

  return 130.0 * dot(m, g);

}



void main() {

  vec2 st = vUv;

  st.x *= uResolution.x/uResolution.y;



  float dist = distance(st, uMouse * vec2(uResolution.x/uResolution.y, 1.0));

  float mouseFactor = smoothstep(0.4, 0.0, dist);



  // Flowing "Liquid Metal"

  float noiseVal = snoise(vec2(st.x * 1.5, st.y * 1.5 - uTime * 0.15));

  float line = sin((st.x + st.y + noiseVal * 0.4) * 30.0 + uTime * 0.5);



  // Sharp thin lines for "expensive" feel

  line = smoothstep(0.95, 1.0, line);



  // Monochrome/Silver Palette

  vec3 bgColor = vec3(0.02, 0.02, 0.02); // Deep Obsidian

  vec3 lineColor = vec3(0.6, 0.6, 0.7); // Silver/Steel



  vec3 color = bgColor;

  color += lineColor * line * 0.15; // Subtle lines

  color += vec3(0.8, 0.8, 1.0) * mouseFactor * 0.15; // Cool white mouse glow



  // Noise Grain

  float grain = fract(sin(dot(vUv, vec2(12.9898, 78.233)*uTime)) * 43758.5453);

  color += grain * 0.03;



  // Vignette

  float vig = 1.0 - length(vUv - 0.5);

  color *= smoothstep(0.0, 0.8, vig);



  gl_FragColor = vec4(color, 1.0);

}

`;

const VanillaBackgroundShader = () => {
  const containerRef = useRef(null);

  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      vertexShader,

      fragmentShader,

      uniforms: {
        uTime: { value: 0 },

        uMouse: { value: new THREE.Vector2(0.5, 0.5) },

        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
    });

    const plane = new THREE.Mesh(geometry, material);

    scene.add(plane);

    const clock = new THREE.Clock();

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      material.uniforms.uTime.value = clock.getElapsedTime();

      const currentMouse = material.uniforms.uMouse.value;

      const targetMouse = new THREE.Vector2(
        mouseRef.current.x,
        mouseRef.current.y,
      );

      currentMouse.lerp(targetMouse, 0.05);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;

      const height = window.innerHeight;

      renderer.setSize(width, height);

      material.uniforms.uResolution.value.set(width, height);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,

        y: 1 - e.clientY / window.innerHeight,
      };
    };

    window.addEventListener("resize", handleResize);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);

      window.removeEventListener("mousemove", handleMouseMove);

      cancelAnimationFrame(animationFrameId);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();

      geometry.dispose();

      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
    />
  );
};

/**

 * ------------------------------------------------------------------

 * UI COMPONENTS

 * ------------------------------------------------------------------

 */

// Technical corner marker component for "expensive" look

const TechMarker = ({ className }) => (
  <div
    className={cn(
      "absolute w-3 h-3 border-t border-l border-white/30 opacity-50",
      className,
    )}
  />
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#050505]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 flex items-center justify-center rounded-sm">
            <span className="font-display font-bold text-white">TS</span>
          </div>

          <span className="hidden md:block font-mono text-xs tracking-widest text-white/50">
            THAVIRAK SVAY — PORTFOLIO_2025
          </span>
        </div>

        <div className="hidden md:flex gap-8">
          {["About", "Competencies", "Works", "Contact"].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-mono text-xs text-white/60 hover:text-white transition-colors uppercase tracking-wider"
            >
              {item}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Vertical Grid Lines */}

      <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-7xl mx-auto opacity-[0.03]">
        <div className="w-px h-full bg-white mx-auto" />

        <div className="w-px h-full bg-white mx-auto" />

        <div className="w-px h-full bg-white mx-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 mb-8"
            >
              <div className="w-1.5 h-1.5 bg-green-500 animate-pulse" />

              <span className="font-mono text-[10px] tracking-widest text-white/70 uppercase">
                System Online
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tight text-white leading-[0.9] mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              DISTRIBUTED <br />
              <span className="text-white/40">SYSTEMS</span> <br />
              ENGINEER
            </motion.h1>

            <motion.p
              className="font-mono text-white/60 text-sm md:text-base max-w-xl mb-12 leading-relaxed border-l border-white/20 pl-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              I architect high-availability microservices for fintech. Currently
              scaling payment infrastructure at Wing Bank to handle millions of
              daily transactions.
            </motion.p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end pb-4">
            <div className="space-y-6 font-mono text-xs text-white/40">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>LOCATION</span>

                <span className="text-white">PHNOM PENH, KH</span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>SPECIALTY</span>

                <span className="text-white">BACKEND ARCHITECTURE</span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>EXPERIENCE</span>

                <span className="text-white">6+ YEARS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillsDashboard = () => {
  return (
    <section id="competencies" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-6">
          <div>
            <h2 className="font-mono text-xs text-white/50 tracking-widest mb-2">
              01 / CAPABILITIES
            </h2>

            <h3 className="font-display text-4xl text-white">
              TECHNICAL ARSENAL
            </h3>
          </div>

          <div className="hidden md:block font-mono text-xs text-white/30 text-right">
            SYSTEM_CHECK: OPTIMAL
            <br />
            LAST_UPDATE: 2025
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group relative p-8 bg-[#0A0A0A] border border-white/[0.08] overflow-hidden transition-all duration-500 hover:bg-white/[0.02]",

                skill.col,
              )}
            >
              <TechMarker className="top-0 left-0" />

              <TechMarker className="top-0 right-0 rotate-90" />

              <TechMarker className="bottom-0 left-0 -rotate-90" />

              <TechMarker className="bottom-0 right-0 rotate-180" />

              {/* Hover "Scan" Effect */}

              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-white/5 rounded-sm text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <skill.icon size={20} strokeWidth={1.5} />
                  </div>

                  <span className="font-mono text-[10px] text-white/30">
                    SYS_MOD_0{i + 1}
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-xl text-white mb-3">
                    {skill.name}
                  </h4>

                  <p className="font-mono text-xs text-white/50 leading-relaxed max-w-[90%]">
                    {skill.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectRow = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative border-t border-white/10 py-12 cursor-none md:cursor-pointer transition-colors hover:bg-white/[0.02]"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* ID & Category */}

        <div className="md:col-span-3 font-mono text-xs text-white/40 flex flex-col gap-2">
          <span>
            {project.id} / {project.year}
          </span>

          <span className="text-white/60">{project.category}</span>
        </div>

        {/* Title */}

        <div className="md:col-span-5">
          <h3 className="font-display text-4xl md:text-5xl text-white group-hover:translate-x-4 transition-transform duration-500 ease-out">
            {project.title}
          </h3>
        </div>

        {/* Tech Stack (Visible on Hover/Mobile) */}

        <div className="md:col-span-4 md:text-right">
          <div className="flex flex-col md:items-end gap-4">
            {/* Description Reveal */}

            <div
              className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-0",

                isHovered ? "max-h-24 opacity-100" : "",
              )}
            >
              <p className="font-mono text-xs text-white/60 max-w-xs ml-auto">
                {project.desc}
              </p>
            </div>

            <div className="flex items-center gap-2 text-white/80 group-hover:text-white">
              <span className="font-mono text-xs">{project.tech}</span>

              <ArrowUpRight
                size={16}
                className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsList = () => {
  return (
    <section id="works" className="py-32 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 mb-20">
        <h2 className="font-mono text-xs text-white/50 tracking-widest mb-2">
          02 / SELECTED WORKS
        </h2>

        <h3 className="font-display text-4xl text-white">
          ARCHITECTURAL HIGHLIGHTS
        </h3>
      </div>

      <div className="border-b border-white/10">
        {PROJECTS.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-32 relative z-10 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-mono text-xs text-white/50 tracking-widest mb-8">
            03 / EXPERIENCE
          </h2>

          <h3 className="font-display text-4xl text-white mb-8">
            CAREER TRAJECTORY
          </h3>

          <p className="font-mono text-sm text-white/60 max-w-md">
            A timeline of technical leadership and high-impact delivery in
            challenging fintech environments.
          </p>
        </div>

        <div className="space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="group">
              <div className="flex items-baseline justify-between mb-2">
                <h4 className="font-display text-2xl text-white group-hover:text-white/80 transition-colors">
                  {exp.company}
                </h4>

                <span className="font-mono text-xs text-white/40">
                  {exp.period}
                </span>
              </div>

              <div className="mb-4 text-white/60 font-mono text-sm">
                {exp.role}
              </div>

              <div className="flex gap-2">
                {exp.metrics.map((m) => (
                  <span
                    key={m}
                    className="px-2 py-1 border border-white/10 rounded-full font-mono text-[10px] text-white/50"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="relative z-10 bg-[#050505] pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          <div>
            <h2 className="font-display text-6xl md:text-8xl text-white leading-none tracking-tight mb-8">
              LET'S BUILD <br />
              <span className="text-white/30">THE FUTURE.</span>
            </h2>
          </div>

          <div className="flex flex-col justify-end items-start lg:items-end gap-8">
            <div className="space-y-4 text-right">
              <a
                href="mailto:thaavirak@gmail.com"
                className="block font-mono text-2xl text-white hover:opacity-70 transition-opacity"
              >
                thaavirak@gmail.com
              </a>

              <a
                href="tel:+85570933433"
                className="block font-mono text-xl text-white/60 hover:text-white transition-colors"
              >
                +855 70 933 433
              </a>
            </div>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="#"
                className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-white/10 pt-8 font-mono text-[10px] text-white/30 uppercase">
          <div>
            © 2025 THAVIRAK SVAY
            <br />
            ALL SYSTEMS OPERATIONAL
          </div>

          <div className="text-right">
            DESIGNED WITH
            <br />
            PRECISION & CODE
          </div>
        </div>
      </div>
    </footer>
  );
};

/**

 * ------------------------------------------------------------------

 * MAIN COMPONENT

 * ------------------------------------------------------------------

 */

import styles from "./Template2.module.css";

export default function Template2() {
  return (
    <div
      className={`${styles.template2Container} ${styles.template2Scrollbar}`}
    >
      {/* Film Grain Overlay */}

      <div
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <main className="relative w-full">
        <VanillaBackgroundShader />

        <Navbar />

        <Hero />

        <SkillsDashboard />

        <ProjectsList />

        <Experience />

        <Footer />
      </main>
    </div>
  );
}
