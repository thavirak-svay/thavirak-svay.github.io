"use client";

import { motion } from "framer-motion";

export const PhilosophyFullscreen = () => {
  return (
    <section
      id="philosophy-fullscreen"
      className="min-h-screen flex items-center justify-center py-16 lg:py-24 px-8 lg:px-16 bg-(--bg)"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-normal leading-[1.0] tracking-tight text-(--text) text-balance">
            I build systems that
            <span className="text-(--accent)"> handle chaos</span>
            <br />
            without breaking.
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-lg lg:text-xl text-(--muted) leading-relaxed font-light mt-8 max-w-2xl mx-auto text-pretty"
          >
            10,000+ transactions daily. Multiple payment providers. Real-time tracking. 
            Automated reconciliation. When one piece fails, the system recovers. 
            That's what I deliver — not endpoints, but infrastructure that works under pressure.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default PhilosophyFullscreen;