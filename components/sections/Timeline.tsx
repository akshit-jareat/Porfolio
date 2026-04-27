"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/ui/SectionHeader";
import { usePortfolioData } from "@/lib/usePortfolioData";

gsap.registerPlugin(ScrollTrigger);

const typeColor: Record<string, string> = {
  focus: "#C9A84C",
  project: "#7c9e87",
  education: "#7a8fa8",
  achievement: "#b98572",
};

const typeLabel: Record<string, string> = {
  focus: "Focus",
  project: "Project",
  education: "Education",
  achievement: "Achievement",
};

export default function Timeline() {
  const { data } = usePortfolioData();
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card, i) => {
        const isLeft = i % 2 === 0;

        gsap.from(card, {
          opacity: 0,
          x: isLeft ? -60 : 60,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".timeline-dot").forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [data?.timeline.length] }
  );

  return (
    <section id="timeline" ref={sectionRef} className="py-28 md:py-32 px-6 bg-bg-primary overflow-hidden section-shell">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="02 - Timeline"
          title="The journey so far"
          subtitle="A real snapshot of education, projects, hackathons, and current growth."
        />

        <div className="relative">
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border-medium hidden md:block"
          />

          <div className="flex flex-col gap-12 md:gap-0">
            {data?.timeline.map((event, i) => {
              const isLeft = i % 2 === 0;
              const color = typeColor[event.type] ?? "#C9A84C";

              return (
                <div
                  key={`${event.period}-${event.title}`}
                  className={`timeline-card relative md:grid md:grid-cols-2 md:gap-12 items-center ${
                    isLeft ? "" : "md:[direction:rtl]"
                  }`}
                >
                  <div
                    className={`md:[direction:ltr] glass-panel rich-hover p-6 md:p-8 relative ${
                      isLeft ? "md:mr-8" : "md:ml-8"
                    }`}
                    style={{ borderLeftColor: color, borderLeftWidth: 2 }}
                  >
                    <span
                      className="inline-block font-mono text-xs px-2 py-0.5 mb-3 tracking-widest"
                      style={{ color, borderColor: color, border: `1px solid ${color}22`, background: `${color}11` }}
                    >
                      {event.period}
                    </span>

                    <span className="ml-2 inline-block font-mono text-xs px-2 py-0.5 mb-3 tracking-widest text-text-muted border border-border-subtle">
                      {typeLabel[event.type] ?? event.type}
                    </span>

                    <h3 className="font-display text-xl md:text-2xl font-light text-text-primary mb-2">
                      {event.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono text-text-muted border border-border-subtle bg-white/[0.025] px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className="timeline-dot absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center"
                    style={{ zIndex: 10 }}
                  >
                    <div
                      className="w-3 h-3 rounded-full border-2 border-bg-primary"
                      style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}66` }}
                    />
                  </div>

                  <div className="hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
