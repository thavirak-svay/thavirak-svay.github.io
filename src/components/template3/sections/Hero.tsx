import React from "react";
import { motion } from "framer-motion";
import { Activity, Command } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";
import styles from "../Template3.module.css";

interface HeroProps {
  experienceYears: string;
}

export const Hero = ({ experienceYears }: HeroProps) => {
  return (
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
            <span className={`text-xs ${styles.template3FontMono} text-blue-300`}>
              System Status: AVAILABLE FOR HIRE
            </span>
          </motion.div>

          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${styles.template3FontGrotesk} text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-white`}
            >
              BACKEND <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-white animate-gradient">
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
            Backend Developer with <span className="text-white">5+ Years</span> building scalable distributed systems and microservices across fintech, banking, e-commerce, and healthcare. Expert in architecting event-driven platforms, designing high-throughput APIs, and leading teams to deliver production-grade solutions.
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
              className={`px-6 py-3 text-sm ${styles.template3FontMono} text-gray-400 hover:text-white transition-colors flex items-center gap-2`}
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
                className={`text-2xl ${styles.template3FontGrotesk} font-bold text-white`}
              >
                {experienceYears}
              </div>
              <div
                className={`text-xs ${styles.template3FontMono} text-gray-500 uppercase`}
              >
                Yrs Experience
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div
                className={`text-2xl ${styles.template3FontGrotesk} font-bold text-white`}
              >
                Enterprise
              </div>
              <div
                className={`text-xs ${styles.template3FontMono} text-gray-500 uppercase`}
              >
                Scale Systems
              </div>
            </div>
          </motion.div>
        </div>

        {/* Code Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="md:col-span-2 hidden md:block"
        >
          <motion.div
            initial={{ rotate: 3 }}
            whileHover={{ rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`${styles.template3GlassPanelGreen} p-1 rounded-lg`}
          >
            <div
              className={`bg-[#0a0a0a] rounded p-4 ${styles.template3FontMono} text-xs leading-relaxed overflow-hidden border border-white/5 shadow-2xl`}
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
                  {" ("}/transaction{")"}
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
                    <span className="text-yellow-300">&quot;txn_events&quot;</span>,
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

