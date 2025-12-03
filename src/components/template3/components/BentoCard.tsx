import React from "react";
import { motion } from "framer-motion";
import styles from "../Template3.module.css";

interface BentoCardProps {
  title: string;
  items: string[];
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  className?: string;
  delay?: number;
}

export const BentoCard = ({
  title,
  items,
  icon: Icon,
  className = "",
  delay = 0,
}: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`${styles.template3GlassPanel} p-6 md:p-8 relative overflow-hidden group hover:border-blue-500/30 transition-colors ${className}`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
        <Icon size={48} strokeWidth={1} />
      </div>
      <div className="relative z-10">
        <h3
          className={`${styles.template3FontGrotesk} text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors`}
        >
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span
              key={item}
              className={`px-3 py-1 text-xs ${styles.template3FontMono} bg-white/5 border border-white/10 rounded-sm text-gray-300 group-hover:border-blue-500/20 group-hover:text-blue-200 transition-all`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
