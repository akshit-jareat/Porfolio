"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, Trophy, Zap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { usePortfolioData } from "@/lib/usePortfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 38, scale: 0.98 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export default function About() {
  const { data } = usePortfolioData();

  const stats = data
    ? [
        { icon: BookOpen, value: data.education.status, label: "Education" },
        { icon: Trophy, value: data.education.cgpa, label: "CGPA" },
        {
          icon: Zap,
          value: String(data.coding_progress.dsa_questions_solved),
          label: "DSA Questions Solved",
        },
        { icon: Code2, value: data.projects_note, label: "Project Direction" },
      ]
    : [];

  return (
    <section id="about" className="py-28 md:py-32 px-6 bg-bg-secondary section-shell">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-16 items-start">
          <div>
            <SectionHeader
              label="01 - About"
              title={data?.title ?? ""}
              subtitle={data?.tagline}
            />
            <motion.p
              className="text-text-secondary leading-8 text-base md:text-lg"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {data?.about}
            </motion.p>

            <motion.div
              className="mt-10 glass-panel gradient-border rich-hover p-6 md:p-7"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.2}
            >
              <p className="font-mono text-xs text-accent-gold tracking-widest uppercase mb-3">
                Current Focus
              </p>
              <div className="flex flex-wrap gap-2">
                {data?.skills.current_focus.map((focus) => (
                  <span
                    key={focus}
                    className="border border-border-medium bg-white/[0.025] px-3 py-1 text-sm text-text-secondary"
                  >
                    {focus}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-text-muted leading-relaxed">
                {data?.coding_progress.status}
              </p>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                className="glass-panel rich-hover p-6 min-h-40 flex flex-col justify-between"
                initial={{ opacity: 0, y: 28, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
              >
                <Icon className="text-accent-gold" size={18} />
                <div>
                  <p className="font-display text-2xl text-text-primary font-light leading-tight">
                    {value}
                  </p>
                  <p className="text-xs font-mono text-text-muted mt-2 tracking-wider uppercase">
                    {label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
