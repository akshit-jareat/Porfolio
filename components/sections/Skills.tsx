"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { formatSkillCategory, usePortfolioData } from "@/lib/usePortfolioData";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Skills() {
  const { data } = usePortfolioData();
  const skillGroups = data ? Object.entries(data.skills) : [];

  return (
    <section id="skills" className="py-28 md:py-32 px-6 bg-bg-secondary section-shell">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="03 - Skills"
          title="Technical toolkit"
          subtitle={data?.tagline}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {skillGroups.map(([category, skills], groupIdx) => (
            <motion.div
              key={category}
              className="glass-panel gradient-border rich-hover p-6 min-h-56"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={groupIdx * 0.12}
            >
              <p className="font-mono text-xs text-accent-gold tracking-widest uppercase mb-5 border-b border-border-subtle pb-3">
                {formatSkillCategory(category)}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="border border-border-medium bg-white/[0.025] px-3 py-1.5 text-sm text-text-secondary hover:border-accent-gold hover:text-accent-gold hover:bg-accent-glow transition-colors"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
