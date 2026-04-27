"use client";

import { motion } from "framer-motion";
import { Award, Moon, Sparkles, Trophy } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { usePortfolioData } from "@/lib/usePortfolioData";

const icons = [Trophy, Moon, Award, Sparkles];

export default function Achievements() {
  const { data } = usePortfolioData();

  return (
    <section id="achievements" className="py-28 md:py-32 px-6 bg-bg-primary section-shell">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="04 - Achievements"
          title="Milestones and momentum"
          subtitle="Academic consistency, hackathon experience, and project-building progress."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {data?.achievements.map((achievement, i) => {
            const Icon = icons[i % icons.length];

            return (
              <motion.div
                key={achievement}
                className="group glass-panel rich-hover p-6 min-h-48 flex flex-col justify-between hover:border-border-medium transition-colors"
                initial={{ opacity: 0, y: 38, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -9 }}
              >
                <div className="w-10 h-10 border border-border-medium bg-accent-glow flex items-center justify-center text-accent-gold group-hover:border-accent-gold transition-colors">
                  <Icon size={17} />
                </div>
                <p className="text-text-secondary leading-relaxed">{achievement}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
