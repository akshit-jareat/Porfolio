"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { usePortfolioData } from "@/lib/usePortfolioData";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

export default function Projects() {
  const { data } = usePortfolioData();

  return (
    <section id="projects" className="py-28 md:py-32 px-6 bg-bg-secondary section-shell">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="05 - Projects"
          title="AI and automation work"
          subtitle={data?.projects_note}
        />

        <div className="grid md:grid-cols-3 gap-6">
          {data?.projects.map((project, i) => (
            <motion.article
              key={project.id}
              className="group glass-panel gradient-border rich-hover p-7 min-h-72 flex flex-col justify-between hover:border-border-medium transition-colors"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              custom={i}
            >
              <div>
                <p className="font-mono text-xs text-text-muted mb-5 tracking-widest">
                  {project.id}
                </p>
                <h3 className="font-display text-2xl font-light text-text-primary mb-4">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-text-muted border border-border-subtle bg-white/[0.025] px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={data?.profiles.github ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono text-text-muted border border-border-medium px-6 py-3 hover:text-text-primary hover:border-text-muted transition-colors glass-panel-soft"
          >
            See work on GitHub <Github size={14} />
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
