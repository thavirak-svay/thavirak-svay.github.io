import { motion } from "framer-motion";
import styles from "../Template3.module.css";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export const SectionTitle = ({ title, subtitle }: SectionTitleProps) => (
  <div className="mb-16">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-2"
    >
      <div className="h-px w-8 bg-blue-500" />
      <span
        className={`${styles.template3FontMono} text-blue-400 text-sm uppercase tracking-widest`}
      >
        {subtitle}
      </span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`${styles.template3FontGrotesk} text-4xl md:text-5xl font-bold text-white`}
    >
      {title}
      <span className="text-blue-500">.</span>
    </motion.h2>
  </div>
);
