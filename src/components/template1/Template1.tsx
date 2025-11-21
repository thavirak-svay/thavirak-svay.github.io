"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Terminal,
  Server,
  Database,
  Cpu,
  Activity,
  Layers,
  ArrowRight,
  Container,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code,
  Globe,
  Briefcase,
  GraduationCap,
  User,
  ChevronRight,
  GitMerge,
  ShieldCheck,
} from "lucide-react";

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

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
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    vec2 mouse = uMouse * uResolution.xy / uResolution.y;
    float dist = distance(st, mouse);
    float interaction = smoothstep(0.5, 0.0, dist);

    float scale = 10.0;
    vec2 grid = fract(st * scale);
    float line = step(0.98, grid.x) + step(0.98, grid.y);

    float noise = snoise(st * 3.0 + uTime * 0.1);

    vec3 colorBg = vec3(0.01, 0.01, 0.02); 
    vec3 colorGrid = vec3(0.1, 0.1, 0.15);
    vec3 colorHighlight = vec3(0.0, 0.94, 1.0); 

    vec3 finalColor = mix(colorBg, colorGrid, line * 0.3);

    float stream = step(0.95, fract(st.y * 2.0 + noise * 0.5 + uTime * 0.2));
    finalColor += stream * colorHighlight * 0.1 * interaction;

    float grain = fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453);
    finalColor += grain * 0.03;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const NativeShaderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
    if (!gl) return;

    const createShader = (
      gl: WebGLRenderingContext,
      type: number,
      source: string
    ) => {
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uMouseLoc = gl.getUniformLocation(program, "uMouse");
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / canvas.width;
      mouseY = 1.0 - (e.clientY - rect.top) / canvas.height;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = (time: number) => {
      if (
        canvas.width !== canvas.clientWidth ||
        canvas.height !== canvas.clientHeight
      ) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.uniform1f(uTimeLoc, time * 0.001);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uMouseLoc, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const calculateExperienceYears = () => {
  const startYear = 2019;
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;
  return `${years}+ Years`;
};

import styles from "./Template1.module.css";

const Navbar = () => (
  <motion.nav
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: "circOut" }}
    className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
  >
    <div className="pointer-events-auto bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 flex items-center gap-4 md:gap-8 shadow-2xl shadow-cyan-900/10">
      {}
      <div className="pl-4 pr-2 flex items-center gap-3">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </div>
        <span className="font-display font-bold text-sm tracking-wider text-white">
          THAVIRAK.SVAY
        </span>
      </div>

      {}
      <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-1 py-1 border border-white/5">
        {["ABOUT", "SKILLS", "CAREER", "PROJECTS"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="px-5 py-1.5 rounded-full text-[10px] font-mono text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all uppercase tracking-widest"
          >
            {item}
          </a>
        ))}
      </div>

      {}
      <div className="pr-2 flex items-center gap-2">
        <a
          href="mailto:thaavirak@gmail.com"
          className="px-5 py-2 rounded-full bg-white text-black hover:bg-cyan-400 transition-colors font-display font-bold text-xs flex items-center gap-2"
        >
          <span>CONTACT</span>
        </a>
      </div>
    </div>
  </motion.nav>
);

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center px-6 md:px-20 pt-20 overflow-hidden">
      <div className="z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="px-2 py-1 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono bg-cyan-950/20">
            SENIOR BACKEND ENGINEER
          </span>
          <span className="text-slate-300 font-mono text-sm">
            Fintech Infrastructure • Distributed Systems
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-6xl md:text-9xl lg:text-[10rem] font-bold leading-[0.9] tracking-tighter text-white mix-blend-difference mb-8"
        >
          DISTRIBUTED <br />
          SYSTEMS{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-700">
            ENGINEER
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-slate-300 max-w-2xl text-base md:text-lg leading-relaxed mb-12"
        >
          Senior Backend Engineer with deep experience in high-throughput
          payment rails and microservices. I build the immutable financial
          backbone for Wing Bank's super-app ecosystem, ensuring consistency,
          resilience, and scalability in production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-white text-black font-display font-bold tracking-wide overflow-hidden inline-block text-center"
          >
            <span className="relative z-10 group-hover:text-white transition-colors">
              SELECTED WORKS
            </span>
            <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
          </a>
          <a
            href="https://linkedin.com/in/thavirak-svay"
            target="_blank"
            className="px-8 py-4 border border-white/20 text-white font-mono text-sm hover:bg-white/5 transition-colors flex items-center gap-2 group"
          >
            <Linkedin size={16} />
            <span>Connect</span>
            <ArrowRight
              size={16}
              className="transform group-hover:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>
      </div>

      {}
      <div className="absolute bottom-10 right-10 font-mono text-[10px] text-slate-400 flex flex-col items-end gap-2 hidden md:flex">
        <span>DOMAIN: FINTECH / PAYMENTS</span>
        <span>CONSISTENCY: STRONG / EVENTUAL</span>
        <span>STACK: SPRING BOOT 3 / K8S</span>
      </div>
    </section>
  );
};

const About = () => {
  const experienceYears = useMemo(() => calculateExperienceYears(), []);

  return (
    <section
      id="about"
      className="py-32 px-6 md:px-20 relative z-10 border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-8">
              ENGINEERING <br />
              <span className="text-cyan-400">PHILOSOPHY</span>
            </h2>
            <div className="font-mono text-base text-slate-400 space-y-6 leading-relaxed">
              <p>
                Engineering is about managing trade-offs. My focus is on{" "}
                <span className="text-white">technical excellence</span> and
                system stability. I specialize in implementing complex backend
                logic and decomposing legacy systems into manageable
                microservices.
              </p>
              <p>
                At <span className="text-white">Wing Bank</span>, I work with
                high-stakes financial data where consistency is non-negotiable.
                I implement patterns like Saga and Outbox to ensure reliable
                distributed transactions (CAP Theorem).
              </p>
              <p>
                As a <span className="text-white">Senior Engineer</span>, I
                believe in leading by example. I advocate for clean code,
                comprehensive testing, and building systems that are observable
                and easy to debug in production.
              </p>
            </div>
          </div>

          {}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Experience", val: experienceYears },
              { label: "Architecture", val: "Event-Driven" },
              { label: "Availability", val: "99.99%" },
              { label: "Focus", val: "Fintech" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`${styles.template1GlassPanel} p-8 flex flex-col items-center justify-center text-center group hover:border-cyan-500/30 transition-colors`}
              >
                <div className="text-2xl md:text-3xl font-display font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {stat.val}
                </div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BentoGrid = () => {
  const features = [
    {
      title: "Core Architecture",
      icon: <Cpu className="text-cyan-400" />,
      tech: ["Java 21 (Virtual Threads)", "Spring Boot 3", "GoLang", "DDD"],
      desc: "Building high-throughput, low-latency distributed systems.",
      col: "md:col-span-2",
      row: "row-span-2",
    },
    {
      title: "Cloud Native",
      icon: <Container className="text-purple-400" />,
      tech: ["Kubernetes", "Istio", "AWS", "GitOps"],
      desc: "Orchestration & Mesh.",
      col: "md:col-span-1",
      row: "row-span-1",
    },
    {
      title: "Data & Consistency",
      icon: <Database className="text-green-400" />,
      tech: ["PostgreSQL (Sharding)", "Redis Cluster", "Kafka", "CDC"],
      desc: "Event sourcing & eventual consistency patterns.",
      col: "md:col-span-1",
      row: "row-span-1",
    },
    {
      title: "Security & Compliance",
      icon: <ShieldCheck className="text-orange-400" />,
      tech: ["OAuth2/OIDC", "mTLS", "PCI-DSS principles", "RBAC"],
      desc: "Zero-trust architecture implementation.",
      col: "md:col-span-3",
      row: "row-span-1",
    },
  ];

  return (
    <section id="skills" className="py-32 px-6 md:px-20 relative z-10">
      <div className="mb-16 max-w-6xl mx-auto">
        <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">
          TECHNICAL ARSENAL
        </h2>
        <div className="h-1 w-20 bg-cyan-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${styles.template1GlassPanel} p-8 rounded-none relative overflow-hidden group ${f.col} ${f.row} ${styles.template1NeonBorder} transition-colors duration-300`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              {f.icon}
            </div>
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {f.title}
                </h3>
                <p className="font-mono text-xs text-slate-400 mb-6">
                  {f.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {f.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 bg-white/5 border border-white/10 text-xs text-slate-300 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px] opacity-20 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ExperienceTimeline = () => {
  const experiences = [
    {
      company: "Wing Bank (Cambodia) Plc",
      role: "Senior Backend Developer",
      period: "2022 – Present",
      desc: "Core contributor to the WingUnified ecosystem. Engineered critical microservices (WingMall, WingExpress) to support the Super-App, focusing on stability and scale.",
      responsibilities: [
        "Best Practices: Establishing coding standards & mentorship",
        "Implementation: Built Event-Driven pipelines via Kafka",
        "Performance: Optimized API latency by 40% via caching",
      ],
      stack: ["Java 21", "Spring Boot", "NestJS", "K8s"],
      highlight: true,
    },
    {
      company: "Web Essentials Co., Ltd",
      role: "Web Developer",
      period: "2022",
      desc: "Engineered high-security identity verification systems for sensitive political risk assessment. Operated within strict data privacy compliance frameworks.",
      responsibilities: [
        "Security: Integrated biometric auth & strict RBAC",
        "Concurrency: Refactored GoLang core for high-volume processing",
        "Compliance: Audited data flow for GDPR/Privacy alignment",
      ],
      stack: ["GoLang", "NuxtJS", "Docker", "Postgres"],
      highlight: false,
    },
    {
      company: "Udaya Technology Co., Ltd",
      role: "Software Developer",
      period: "2019 – 2022",
      desc: "Pioneered the development of enterprise-scale IoT and ERP solutions. Delivered critical infrastructure for healthcare and logistics sectors.",
      responsibilities: [
        "IoT: Scaled WebSocket mesh for 50+ live vehicles",
        "Healthcare: Built EMR system for 10+ hospitals",
        "Deployment: Managed end-to-end on-premise delivery",
      ],
      stack: ["Java", "ReactJS", "WebSocket", "IoT"],
      highlight: false,
    },
  ];

  return (
    <section
      id="career"
      className="py-32 px-6 md:px-20 relative z-10 bg-[#040406]"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-16 text-center">
          CAREER TRAJECTORY
        </h2>

        <div className="relative">
          {}
          <div
            className={`absolute left-[19px] md:left-1/2 top-0 bottom-0 w-1 ${styles.template1TimelineLine} transform md:-translate-x-1/2`}
          />

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {}
                <div className="absolute left-0 md:left-1/2 w-10 h-10 flex items-center justify-center transform md:-translate-x-1/2 z-10">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      exp.highlight
                        ? "bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                        : "bg-slate-700 border border-slate-500"
                    }`}
                  />
                </div>

                {}
                <div className="ml-12 md:ml-0 md:w-1/2 pl-4 md:pl-0 md:pr-12 md:text-right group">
                  <div
                    className={`${styles.template1GlassPanel} p-6 hover:border-cyan-500/30 transition-colors ${
                      i % 2 !== 0 ? "md:text-left md:ml-12 md:pr-0 md:pl-6" : ""
                    }`}
                  >
                    <div className="font-mono text-cyan-400 text-xs mb-2">
                      {exp.period}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-1">
                      {exp.role}
                    </h3>
                    <div className="font-mono text-sm text-slate-400 mb-4">
                      {exp.company}
                    </div>
                    <p className="text-slate-300 text-base leading-relaxed mb-4">
                      {exp.desc}
                    </p>
                    <ul
                      className={`text-[11px] text-slate-500 font-mono space-y-1 mb-4 ${
                        i % 2 === 0 ? "items-end" : "items-start"
                      } flex flex-col`}
                    >
                      {exp.responsibilities.map((res, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          {i % 2 !== 0 && (
                            <ChevronRight size={10} className="text-cyan-500" />
                          )}
                          {res}
                          {i % 2 === 0 && (
                            <ChevronRight size={10} className="text-cyan-500" />
                          )}
                        </li>
                      ))}
                    </ul>
                    <div
                      className={`flex flex-wrap gap-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}
                    >
                      {exp.stack.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded text-slate-300 border border-white/5"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Education = () => (
  <section className="py-20 px-6 md:px-20 relative z-10 border-t border-white/5">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 text-cyan-400 mb-6">
        <GraduationCap size={24} />
        <span className="font-mono text-sm tracking-widest uppercase">
          Education
        </span>
      </div>
      <h3 className="font-display text-3xl font-bold text-white mb-2">
        Bachelor of Information Technology
      </h3>
      <div className="font-mono text-xl text-slate-400 mb-4">
        SECTEC Institute
      </div>
      <div className="inline-block px-4 py-1 border border-white/10 rounded-full text-xs font-mono text-slate-500">
        2018 – 2022
      </div>
    </div>
  </section>
);

interface Project {
  title: string;
  problem: string;
  solution: string;
  tags: string[];
  metrics: {
    scope: string;
    impact: string;
  };
  arch: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border-t border-white/20 py-12 md:py-20 cursor-none"
    >
      <div className="flex flex-col md:flex-row gap-8 md:items-start justify-between">
        <div className="flex-1">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="font-mono text-cyan-400 text-sm">
              0{index + 1}
            </span>
            <h3 className="font-display text-4xl md:text-6xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <div className="text-xs font-mono text-slate-500 mb-1">
                [ CONSTRAINT ]
              </div>
              <p className="font-mono text-slate-300 text-base leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-500 mb-1">
                [ IMPLEMENTATION ]
              </div>
              <p className="font-mono text-slate-200 text-base leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono uppercase tracking-wider text-slate-500 border border-slate-800 px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {}
        <div className="w-full md:w-1/3 relative h-48 md:h-52 bg-black/50 border border-white/10 overflow-hidden">
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.div
                key="stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 p-6 flex flex-col justify-center"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-500 font-mono uppercase">
                      Scale
                    </div>
                    <div className="text-sm text-white font-display">
                      {project.metrics.scope}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-mono uppercase">
                      Value
                    </div>
                    <div className="text-sm text-white font-display">
                      {project.metrics.impact}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-cyan-400 font-mono">
                  <Activity size={14} />
                  <span>Hover to reveal stack</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="arch"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 p-6 bg-cyan-950/30 backdrop-blur-sm flex flex-col gap-2 justify-center"
              >
                <div className="text-xs text-cyan-400 font-bold mb-2 font-mono">
                  [ ARCHITECTURE LAYERS ]
                </div>
                {project.arch.map((layer, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-300 font-mono border-l border-white/10 pl-2"
                  >
                    <GitMerge size={10} className="text-cyan-500" />
                    {layer}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "WingUnified Core",
      problem:
        "Legacy banking monolith was unable to scale for Super-App workloads. Deployment cycles took 4+ hours, causing significant downtime.",
      solution:
        "Decomposed core into 15+ Domain-Driven microservices (Spring Boot/NestJS). Implemented Saga pattern for distributed transactions and Kong Gateway for traffic orchestration.",
      tags: ["Distributed Systems", "Kafka", "Spring Boot 3", "Kong Gateway"],
      metrics: { scope: "Super App Core", impact: "Zero-Downtime Deploy" },
      arch: [
        "API Gateway (Kong)",
        "Event Bus (Kafka)",
        "Domain Services (Spring)",
        "Sharded PostgreSQL",
      ],
    },
    {
      title: "Identity Trust Engine",
      problem:
        "Global identity verification process was facing high latency (5s+) and compliance risks with sensitive political data.",
      solution:
        "Re-engineered the verification pipeline using GoLang for concurrency. Integrated async biometric validation to reduce user-perceived latency to <400ms.",
      tags: ["High Performance", "GoLang", "Security", "NuxtJS"],
      metrics: { scope: "Global Users", impact: "400ms Latency" },
      arch: [
        "Edge Firewall",
        "Concurrency Engine (Go)",
        "Async Bio-Auth",
        "Audit Logger",
      ],
    },
    {
      title: "IoT Fleet Command",
      problem:
        "Real-time GPS tracking for 50+ vehicles was saturating HTTP polling limits, leading to stale data and high server costs.",
      solution:
        "Built a persistent WebSocket mesh network to handle bidirectional telemetry. Implemented efficient geofencing algorithms for real-time alerts.",
      tags: ["IoT", "Real-time", "WebSockets", "React"],
      metrics: { scope: "Fleet Mgmt", impact: "Real-time Sync" },
      arch: [
        "React Client",
        "WS Load Balancer",
        "Telemetry Ingest",
        "Time-Series DB",
      ],
    },
    {
      title: "Secure Health EMR",
      problem:
        "10+ state hospitals had fragmented patient data with no secure interoperability, leading to operational inefficiencies.",
      solution:
        "Designed a centralized, multi-tenant EMR system with strict RBAC and encrypted API tunnels for secure inter-hospital data sync.",
      tags: ["Healthcare", "Compliance", "RBAC", "Security"],
      metrics: { scope: "10+ Hospitals", impact: "Data Integrity" },
      arch: [
        "Secure API Layer",
        "Role-Based Auth",
        "Encrypted Store",
        "Audit Trails",
      ],
    },
  ];

  return (
    <section
      id="projects"
      className="py-32 px-6 md:px-20 relative bg-[#050507]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 flex items-end justify-between">
          <div>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white">
              SELECTED WORKS
            </h2>
            <p className="font-mono text-slate-500 mt-4">
              A curated selection of engineering challenges.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-xs font-mono text-slate-400">
              PROJECT_COUNT
            </div>
            <div className="text-4xl font-display text-slate-500">04</div>
          </div>
        </div>

        <div className="flex flex-col">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Approach = () => {
  return (
    <section
      id="process"
      className="py-32 px-6 md:px-20 relative z-10 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-8">
            ARCHITECTURAL <br />
            <span className="text-slate-400">PRINCIPLES</span>
          </h2>
          <div className="space-y-8 font-mono text-sm text-slate-400">
            <p>
              In the fast-paced world of fintech, reliability is currency. My
              engineering philosophy centers on{" "}
              <span className="text-white">Predictability</span> and{" "}
              <span className="text-white">Observability</span>.
            </p>
            <p>
              I prefer <span className="text-white">boring technology</span>{" "}
              that scales over shiny new tools. I design systems that scream
              when they are in pain, allowing for proactive resolution before
              customers ever notice a degradation in service.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-2xl" />
          <div className={`${styles.template1GlassPanel} p-8 relative`}>
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <span className="font-mono text-xs text-slate-400">
                DECISION_MATRIX
              </span>
              <Layers className="text-slate-400" size={16} />
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center opacity-50">
                <span className="font-mono text-sm text-slate-400">
                  Architecture
                </span>
                <span className="text-red-900/50 text-xs">Tight Coupling</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-white">
                  My Approach
                </span>
                <span className="text-cyan-400 text-xs font-mono bg-cyan-950/30 px-2 py-1">
                  Event-Driven & Modular
                </span>
              </div>

              <div className="flex justify-between items-center opacity-50 mt-6">
                <span className="font-mono text-sm text-slate-400">
                  Deployment
                </span>
                <span className="text-red-900/50 text-xs">
                  Manual / Risk-Prone
                </span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-white">
                  Strategy
                </span>
                <span className="text-purple-400 text-xs font-mono bg-purple-950/30 px-2 py-1">
                  Automated / Blue-Green
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-20 px-6 md:px-20 border-t border-white/10 relative overflow-hidden">
      <div className="whitespace-nowrap overflow-hidden mb-12 opacity-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="font-display text-[10rem] font-bold text-white leading-none"
        >
          RESILIENCE CONSISTENCY SCALABILITY ARCHITECTURE RESILIENCE CONSISTENCY
          SCALABILITY ARCHITECTURE
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        <div>
          <h3 className="font-display text-4xl font-bold text-white mb-6">
            LET'S BUILD <br /> SOMETHING{" "}
            <span className="text-cyan-400">ROBUST</span>
          </h3>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:thaavirak@gmail.com"
              className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors font-mono text-sm"
            >
              <Mail size={18} /> thaavirak@gmail.com
            </a>
            <a
              href="tel:+85570933433"
              className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors font-mono text-sm"
            >
              <Phone size={18} /> +855 70 933 433
            </a>
            <a
              href="https://linkedin.com/in/thavirak-svay"
              target="_blank"
              className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors font-mono text-sm"
            >
              <Linkedin size={18} /> linkedin.com/in/thavirak-svay
            </a>
          </div>
        </div>

        <div className="flex flex-col md:items-end justify-end">
          <div className="font-mono text-slate-400 text-xs mb-2">
            CURRENT_STATUS
          </div>
          <div className="flex items-center gap-2 text-green-500 font-mono text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Operational / Systems Active
          </div>
          <div className="mt-8 text-slate-500 text-[10px] font-mono text-right">
            © 2024 THAVIRAK SVAY. <br /> ENGINEERED IN CAMBODIA.
          </div>
        </div>
      </div>
    </footer>
  );
};

const Template1 = () => {
  return (
    <div
      className={`${styles.template1Container} ${styles.template1Scrollbar}`}
    >
      {}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NativeShaderCanvas />
      </div>

      {}
      <main className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <BentoGrid />
        <ExperienceTimeline />
        <Education />
        <Projects />
        <Approach />
        <Footer />
      </main>

      {}
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
