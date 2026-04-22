"use client";

import { motion } from "framer-motion";
import { Scale, Users, GitBranch, Target, CheckCircle2, ArrowRight } from "lucide-react";
import styles from "../Template1.module.css";

const leadershipAreas = [
  {
    icon: <Scale className="text-cyan-400" />,
    title: "Standards & Governance",
    highlights: [
      "Established coding standards across multiple microservices",
      "Defined architecture review process for new service designs",
      "Created shared framework with security patterns, caching, audit trails",
      "Enforced consistent error handling and logging standards",
    ],
    metric: "Service Standards Established",
  },
  {
    icon: <Users className="text-purple-400" />,
    title: "Mentorship & Growth",
    highlights: [
      "Mentored junior developers toward independent proficiency",
      "Led regular tech knowledge sharing sessions",
      "Created onboarding documentation for new team members",
      "Provided code review feedback with learning opportunities",
    ],
    metric: "Developer Growth Enabled",
  },
  {
    icon: <GitBranch className="text-green-400" />,
    title: "Cross-team Collaboration",
    highlights: [
      "Coordinated with frontend, DevOps, QA on platform releases",
      "Led integration discussions with external payment providers",
      "Facilitated architecture decisions across stakeholder teams",
      "Managed dependencies and delivery timelines with product team",
    ],
    metric: "Cross-Team Alignment",
  },
  {
    icon: <Target className="text-orange-400" />,
    title: "Project Ownership",
    highlights: [
      "Led WingUnified platform consolidation project",
      "Defined scope, milestones, and ownership for sub-projects",
      "Tracked delivery progress and managed technical blockers",
      "Balanced business requirements with technical constraints",
    ],
    metric: "Platform Delivery Led",
  },
];

export const Leadership = () => {
  return (
    <section id="leadership" className="py-20 md:py-32 px-6 md:px-20 relative z-10 bg-[#040406]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            LEADERSHIP <span className="text-cyan-400">& IMPACT</span>
          </h2>
          <p className="font-mono text-sm text-slate-300 max-w-xl text-pretty">
            Beyond implementation — leading teams, establishing standards, and driving project success across the organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadershipAreas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${styles.template1GlassPanel} p-6 md:p-8 rounded-none relative overflow-hidden group hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.1)] transition-[background,box-shadow] duration-300`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-white/5 group-hover:bg-white/10 transition-[background] duration-300">
                  {area.icon}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-[color] duration-300">
                    {area.title}
                  </h3>
                  <div className="inline-flex items-center gap-2 px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                    <CheckCircle2 size={12} />
                    {area.metric}
                  </div>
                </div>
              </div>

              <ul className="space-y-3">
                {area.highlights.map((highlight, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-slate-300 font-mono">
                    <ArrowRight size={14} className="text-cyan-500/50 mt-0.5 shrink-0" />
                    <span className="text-pretty">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[14px_14px] opacity-20 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Leadership Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 border-t border-white/10 pt-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <h4 className="font-display text-2xl font-bold text-white mb-4">
                Leadership Philosophy
              </h4>
              <p className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                HOW I LEAD
              </p>
            </div>
            <div className="md:w-2/3">
              <blockquote className="font-mono text-slate-200 leading-relaxed border-l-2 border-cyan-500 pl-6">
                <p className="mb-4">
                  "I believe technical leadership is about <span className="text-cyan-400">enabling others</span>, not directing them.
                  My role is to set clear standards, remove blockers, and create space for developers to grow and deliver."
                </p>
                <p>
                  "Good architecture decisions come from <span className="text-cyan-400">collaboration</span>, not unilateral authority.
                  I facilitate discussions that surface trade-offs, document decisions, and ensure buy-in across teams."
                </p>
              </blockquote>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};