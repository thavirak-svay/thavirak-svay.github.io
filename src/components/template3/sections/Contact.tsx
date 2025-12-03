import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Globe, Code } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";
import styles from "../Template3.module.css";

export const Contact = () => {
  return (
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
            className={`${styles.template3FontGrotesk} text-5xl md:text-7xl font-bold text-white mb-6`}
          >
            Let&apos;s Build <span className="text-blue-500">Scalable</span>{" "}
            Systems.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Backend Developer with 5+ Years building scalable distributed systems and microservices. Quick learner who thrives in fast-paced environments and rapidly adapts to new technologies.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
          <MagneticButton
            className="w-full md:w-auto min-w-[200px] justify-center"
            onClick={() =>
              (globalThis.location.href = "mailto:thaavirak@gmail.com")
            }
          >
            <Mail size={18} /> thaavirak@gmail.com
          </MagneticButton>
          <MagneticButton
            className="w-full md:w-auto min-w-[200px] justify-center"
            onClick={() => (globalThis.location.href = "tel:+85570933433")}
          >
            <Phone size={18} /> +855 70 933 433
          </MagneticButton>
        </div>

        <div className="flex justify-center gap-4">
          <a href="https://linkedin.com/in/thavirak-svay" target="_blank" rel="noopener noreferrer">
            <Linkedin size={24} className="text-white" />
          </a>
          <a
            href="https://thavirak-svay.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.template3GlassPanel} p-4 hover:bg-white/10 rounded-full transition-all hover:scale-110`}
          >
            <Globe size={24} className="text-white" />
          </a>
        </div>

        <footer
          className={`mt-32 text-xs ${styles.template3FontMono} text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4`}
        >
          <div className="flex items-center gap-2">
            <Code size={12} />
            <span>BUILT WITH NEXT.JS 14 & WEBGL</span>
          </div>
          <div>© 2024 THAVIRAK SVAY</div>
        </footer>
      </div>
    </section>
  );
};

