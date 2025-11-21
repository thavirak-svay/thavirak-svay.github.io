import React, { useState, useEffect, useRef } from "react";

import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";

import {
  Server,
  Database,
  Activity,
  Globe,
  GitBranch,
  Layers,
  Shield,
  Code,
  ChevronRight,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  Command,
  Network,
  MapPin,
  Phone,
  Monitor,
} from "lucide-react";

import styles from "./Template3.module.css";

const WebGLBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5; 
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform float uTime;
      uniform vec2 uResolution;
      varying vec2 vUv;

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
        vec2 uv = vUv;
        
        float gridX = step(0.98, fract(uv.x * 40.0));
        float gridY = step(0.98, fract(uv.y * 40.0));
        
        float noise = snoise(uv * 2.5 + uTime * 0.15);
        
        vec3 bgColor = vec3(0.02, 0.03, 0.06); 
        
        vec3 gridColor = vec3(0.1, 0.3, 0.5) * (gridX + gridY) * 0.15;
        
        float wave = sin(uv.y * 8.0 + uTime * 0.5 + noise * 4.0) * 0.5 + 0.5;
        vec3 waveColor = vec3(0.05, 0.2, 0.5) * wave * 0.2 * noise;
        
        gl_FragColor = vec4(bgColor + gridColor + waveColor, 1.0);
      }
    `;

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
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
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

    const uTimeLocation = gl.getUniformLocation(program, "uTime");
    const uResolutionLocation = gl.getUniformLocation(program, "uResolution");

    let animationFrameId: number | undefined;
    const startTime = performance.now();

    const render = () => {
      const currentTime = (performance.now() - startTime) / 1000;

      if (
        canvas.width !== canvas.clientWidth ||
        canvas.height !== canvas.clientHeight
      ) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
      }

      gl.uniform1f(uTimeLocation, currentTime);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ background: "#020204" }}
    />
  );
};

const MagneticButton = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const xPos = clientX - (left + width / 2);
    const yPos = clientY - (top + height / 2);
    x.set(xPos * 0.1);
    y.set(yPos * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden group rounded-none border border-blue-500/30 px-6 py-3 bg-blue-900/10 hover:bg-blue-500/10 transition-colors ${styles.fontMono} ${className}`}
    >
      <span className="relative z-10 text-sm font-bold tracking-wider uppercase flex items-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-blue-500/5 transition-transform duration-300 ease-out" />
    </motion.button>
  );
};

const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-16">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-2"
    >
      <div className="h-[1px] w-8 bg-blue-500" />
      <span
        className={`${styles.fontMono} text-blue-400 text-sm uppercase tracking-widest`}
      >
        {subtitle}
      </span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`${styles.fontGrotesk} text-4xl md:text-5xl font-bold text-white`}
    >
      {title}
      <span className="text-blue-500">.</span>
    </motion.h2>
  </div>
);

const BentoCard = ({
  title,
  items,
  icon: Icon,
  className = "",
  delay = 0,
}: {
  title: string;
  items: string[];
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`${styles.glassPanel} p-6 md:p-8 relative overflow-hidden group hover:border-blue-500/30 transition-colors ${className}`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
        <Icon size={48} strokeWidth={1} />
      </div>
      <div className="relative z-10">
        <h3
          className={`${styles.fontGrotesk} text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors`}
        >
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span
              key={i}
              className={`px-3 py-1 text-xs ${styles.fontMono} bg-white/5 border border-white/10 rounded-sm text-gray-300 group-hover:border-blue-500/20 group-hover:text-blue-200 transition-all`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({
  title,
  type,
  stack,
  metrics,
  children,
}: {
  title: string;
  type: string;
  stack: string[];
  metrics: Array<{ label: string; value: string }>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${styles.glassPanel} border-l-4 border-l-blue-500/50 hover:border-l-blue-500 transition-all p-6 md:p-8 group`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs ${styles.fontMono} uppercase rounded-sm border border-blue-500/30`}
            >
              {type}
            </span>
            <span
              className={`flex items-center gap-1 text-xs text-gray-500 ${styles.fontMono}`}
            >
              <GitBranch size={12} /> main
            </span>
          </div>
          <h3 className={`${styles.fontGrotesk} text-2xl font-bold text-white`}>
            {title}
          </h3>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Github size={20} className="text-gray-400 hover:text-white" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ExternalLink
              size={20}
              className="text-gray-400 hover:text-white"
            />
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <p className="text-gray-400 leading-relaxed font-light">{children}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {stack.map((tech) => (
              <span
                key={tech}
                className={`text-xs ${styles.fontMono} text-blue-200/70`}
              >
                #{tech}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-black/40 p-4 rounded border border-white/5">
          <h4
            className={`text-xs ${styles.fontMono} uppercase text-gray-500 mb-3 border-b border-white/10 pb-2`}
          >
            Key Impact
          </h4>
          <ul className="space-y-3">
            {metrics.map((m, i) => (
              <li key={i} className="flex justify-between items-center text-sm">
                <span className="text-gray-400">{m.label}</span>
                <span className={`text-green-400 ${styles.fontMono}`}>
                  {m.value}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t border-white/5 text-center">
            <button
              className={`text-xs ${styles.fontMono} text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1 w-full group/btn`}
            >
              View Architecture{" "}
              <ChevronRight
                size={12}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Template3() {
  const [activeSection, setActiveSection] = useState("hero");
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
      {}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      {}
      <WebGLBackground />

      {}
      <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-[#030305]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 animate-pulse rounded-full shadow-[0_0_10px_#3B82F6]" />
            <span
              className={`${styles.fontGrotesk} font-bold text-xl tracking-tight text-white`}
            >
              THAVIRAK<span className="text-gray-500">.SVAY</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Skills", "Work", "Process", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm ${styles.fontMono} text-gray-400 hover:text-white transition-colors uppercase tracking-widest`}
              >
                {item}
              </a>
            ))}
            <a
              href="#"
              className={`px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs ${styles.fontMono} text-blue-400 transition-all rounded`}
            >
              RESUME.PDF
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {}
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center px-8 md:px-12 lg:px-16 pt-20"
        >
          <div className="max-w-7xl w-full grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5"
              >
                <Activity size={14} className="text-blue-400" />
                <span className={`text-xs ${styles.fontMono} text-blue-300`}>
                  System Status: AVAILABLE FOR HIRE
                </span>
              </motion.div>

              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`${styles.fontGrotesk} text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-white`}
                >
                  BACKEND <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-white animate-gradient">
                    ENGINEER
                  </span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed font-light border-l-2 border-blue-900 pl-6"
              >
                Specializing in building robust, scalable microservices using
                <span className="text-white"> Spring Boot</span> and{" "}
                <span className="text-white">Java</span>. Delivering
                high-performance fintech solutions for Cambodia's leading
                institutions with a focus on distributed systems and
                reliability.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <MagneticButton
                  onClick={() =>
                    document.getElementById("work")?.scrollIntoView()
                  }
                >
                  View Projects
                </MagneticButton>
                <a
                  href="#contact"
                  className={`px-6 py-3 text-sm ${styles.fontMono} text-gray-400 hover:text-white transition-colors flex items-center gap-2`}
                >
                  <Command size={16} /> Contact Me
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="pt-12 flex items-center gap-8"
              >
                <div className="text-center">
                  <div
                    className={`text-2xl ${styles.fontGrotesk} font-bold text-white`}
                  >
                    Daily
                  </div>
                  <div
                    className={`text-xs ${styles.fontMono} text-gray-500 uppercase`}
                  >
                    Transactions
                  </div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div
                    className={`text-2xl ${styles.fontGrotesk} font-bold text-white`}
                  >
                    3+
                  </div>
                  <div
                    className={`text-xs ${styles.fontMono} text-gray-500 uppercase`}
                  >
                    Yrs Experience
                  </div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div
                    className={`text-2xl ${styles.fontGrotesk} font-bold text-white`}
                  >
                    FinTech
                  </div>
                  <div
                    className={`text-xs ${styles.fontMono} text-gray-500 uppercase`}
                  >
                    Specialist
                  </div>
                </div>
              </motion.div>
            </div>

            {}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="md:col-span-2 hidden md:block"
            >
              <div
                className={`${styles.glassPanel} p-1 rounded-lg rotate-3 hover:rotate-0 transition-transform duration-500`}
              >
                <div
                  className={`bg-[#0a0a0a] rounded p-4 ${styles.fontMono} text-xs leading-relaxed overflow-hidden border border-white/5 shadow-2xl`}
                >
                  <div className="flex gap-1.5 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                  </div>
                  <div className="text-gray-500 mb-2">
                    # Spring Boot Microservice Controller
                  </div>
                  <div className="space-y-1">
                    <div>
                      <span className="text-purple-400">@PostMapping</span>
                      ("/transaction")
                    </div>
                    <div className="flex">
                      <span className="text-blue-400">public</span>{" "}
                      ResponseEntity executeTxn(
                    </div>
                    <div className="pl-4 text-gray-400">
                      @RequestBody TransactionRequest req) {`{`}
                    </div>
                    <div className="pl-4 text-green-400">
                      <div className="pl-4 text-blue-300">
                        redissonClient.getLock(req.getId());
                      </div>
                      <div className="pl-4 text-white">
                        service.process(req);
                      </div>
                      <div className="pl-4 text-white">
                        kafkaTemplate.send(
                        <span className="text-yellow-300">"txn_events"</span>,
                        req);
                      </div>
                      <div className="pl-4 text-gray-400">
                        return ResponseEntity.ok().build();
                      </div>
                    </div>
                    <div className="text-gray-400">{`}`}</div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex justify-between text-gray-600">
                      <span>Heap: 512MB</span>
                      <span>Threads: 200</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                      <div className="w-[35%] h-full bg-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {}
        <section id="skills" className="py-32 px-8 md:px-12 lg:px-16 relative">
          <div className="max-w-7xl mx-auto">
            <SectionTitle title="Technical Expertise" subtitle="The Stack" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px]">
              <BentoCard
                className="md:col-span-2"
                title="Backend Engineering"
                icon={Server}
                items={[
                  "Java",
                  "Spring Boot",
                  "NodeJS",
                  "NestJS",
                  "GoLang",
                  "TypeScript",
                ]}
                delay={0}
              />
              <BentoCard
                className="md:col-span-1 bg-blue-900/10"
                title="Database"
                icon={Database}
                items={["PostgreSQL", "MySQL", "MongoDB", "GraphQL", "Hasura"]}
                delay={0.1}
              />
              <BentoCard
                className="md:col-span-1"
                title="Frontend"
                icon={Monitor}
                items={["ReactJS", "NextJS", "NuxtJS", "VueJS", "Tailwind CSS"]}
                delay={0.2}
              />
              <BentoCard
                className="md:col-span-1"
                title="DevOps & Cloud"
                icon={Layers}
                items={["Docker", "Kubernetes", "AWS", "Jenkins", "Nexus"]}
                delay={0.3}
              />
              <BentoCard
                className="md:col-span-2"
                title="Architecture Patterns"
                icon={Network}
                items={[
                  "Microservices",
                  "Event-Driven",
                  "Distributed Systems",
                  "REST APIs",
                ]}
                delay={0.4}
              />
              <BentoCard
                className="md:col-span-1"
                title="Tools"
                icon={Shield}
                items={["Git", "Kibana", "Figma", "Material UI", "Chakra UI"]}
                delay={0.5}
              />
            </div>
          </div>
        </section>

        {}
        <section id="work" className="py-32 px-8 md:px-12 lg:px-16 bg-black/30">
          <div className="max-w-7xl mx-auto">
            <SectionTitle title="Work Experience" subtitle="Impact & Scale" />
            <div className="space-y-12">
              <ProjectCard
                title="WingUnified Platform"
                type="Wing Bank (Cambodia)"
                stack={["Java", "Spring Boot", "Microservices", "NestJS"]}
                metrics={[
                  { label: "Role", value: "Lead" },
                  { label: "Scale", value: "National" },
                  { label: "Reliability", value: "High" },
                ]}
              >
                Architected the WingUnified platform using Java and Spring Boot
                microservices. Enabled Wing Bank to launch integrated services
                across food delivery, e-commerce, logistics, and booking
                sectors. Built multiple sub-platforms (WingMall, Wing Express)
                supporting Cambodia's leading super-app processing hundreds of
                daily transactions.
              </ProjectCard>

              <ProjectCard
                title="Identity & Risk Platform"
                type="Web Essentials"
                stack={[
                  "GoLang",
                  "NuxtJS",
                  "API Integration",
                  "Risk Assessment",
                ]}
                metrics={[
                  { label: "Region", value: "Global" },
                  { label: "Focus", value: "Security" },
                  { label: "Tech", value: "GoLang" },
                ]}
              >
                Enhanced a comprehensive identity and risk assessment platform
                used worldwide. Processed political identity verification using
                a NuxtJS frontend and GoLang backend. Integrated new identity
                verification provider APIs for enhanced fraud detection and
                accuracy, resolving critical performance bottlenecks.
              </ProjectCard>

              <ProjectCard
                title="Payroll & GPS Management"
                type="Udaya Technology"
                stack={["Java", "Spring Boot", "ReactJS", "WebSockets"]}
                metrics={[
                  { label: "Users", value: "1000+" },
                  { label: "Vehicles", value: "50+" },
                  { label: "Hospitals", value: "10+" },
                ]}
              >
                Built a comprehensive payroll management platform serving 1000+
                employees. Developed a real-time GPS tracking system managing
                50+ vehicles with WebSocket connections. Created an Electronic
                Medical Records (EMR) system deployed across 10+ state hospitals
                with secure data transfer APIs.
              </ProjectCard>
            </div>
          </div>
        </section>

        {}
        <section id="process" className="py-32 px-8 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <SectionTitle title="Engineering Philosophy" subtitle="Approach" />
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-12">
                <div className="relative pl-8 border-l border-white/10">
                  <span className="absolute -left-1.5 top-1 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3B82F6]" />
                  <h3
                    className={`${styles.fontGrotesk} text-2xl font-bold text-white mb-2`}
                  >
                    Collaborative Leadership
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    I don't just write code; I lead teams. My experience
                    includes mentoring developers, establishing development
                    standards, and driving impactful business results through
                    technical excellence and rapid mastery of new technologies.
                  </p>
                </div>

                <div className="relative pl-8 border-l border-white/10">
                  <span className="absolute -left-1.5 top-1 w-3 h-3 bg-purple-500 rounded-full" />
                  <h3
                    className={`${styles.fontGrotesk} text-2xl font-bold text-white mb-2`}
                  >
                    System Reliability
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Optimized backend performance across fintech ecosystems to
                    ensure high availability. I focus on resolving critical
                    performance bottlenecks to improve system responsiveness for
                    high-volume processing.
                  </p>
                </div>
              </div>

              {}
              <div className={`${styles.glassPanel} p-6 md:p-8 rounded-xl`}>
                <h4
                  className={`font-mono text-sm text-gray-500 mb-6 uppercase tracking-widest text-center ${styles.fontMono}`}
                >
                  Education
                </h4>
                <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
                  <div className="p-3 bg-blue-500/10 rounded-full">
                    <Code size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <h5
                      className={`text-white font-bold ${styles.fontGrotesk}`}
                    >
                      Bachelor of Information Technology
                    </h5>
                    <p className={`text-sm text-gray-400 ${styles.fontMono}`}>
                      SETEC Institute (2018 - 2022)
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div
                    className={`flex justify-between text-sm ${styles.fontMono} text-gray-400`}
                  >
                    <span>Backend Mastery</span>
                    <span className="text-green-400">100%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {}
        <section
          id="contact"
          className="py-32 px-8 md:px-12 lg:px-16 border-t border-white/5 bg-[#010101]"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2
                className={`${styles.fontGrotesk} text-5xl md:text-7xl font-bold text-white mb-6`}
              >
                Let's Build <span className="text-blue-500">Scalable</span>{" "}
                Systems.
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Results-driven Backend Developer ready to drive impactful
                business results for your team.
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
              <MagneticButton
                className="w-full md:w-auto min-w-[200px] justify-center"
                onClick={() =>
                  (window.location.href = "mailto:thaavirak@gmail.com")
                }
              >
                <Mail size={18} /> thaavirak@gmail.com
              </MagneticButton>
              <MagneticButton
                className="w-full md:w-auto min-w-[200px] justify-center"
                onClick={() => (window.location.href = "tel:+85570933433")}
              >
                <Phone size={18} /> +855 70 933 433
              </MagneticButton>
            </div>

            <div className="flex justify-center gap-4">
              <a href="https://linkedin.com/in/thavirak-svay">
                <Linkedin size={24} className="text-white" />
              </a>
              <a
                href="#"
                className={`${styles.glassPanel} p-4 hover:bg-white/10 rounded-full transition-all hover:scale-110`}
              >
                <Github size={24} className="text-white" />
              </a>
            </div>

            <footer
              className={`mt-32 text-xs ${styles.fontMono} text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4`}
            >
              <div className="flex items-center gap-2">
                <Code size={12} />
                <span>BUILT WITH NEXT.JS 14 & WEBGL</span>
              </div>
              <div>© 2024 THAVIRAK SVAY</div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
