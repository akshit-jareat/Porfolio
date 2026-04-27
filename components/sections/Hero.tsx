"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Github, Linkedin } from "lucide-react";
import { usePortfolioData } from "@/lib/usePortfolioData";
import ProfilePhoto from "@/components/ui/ProfilePhoto";

function useTypingEffect(phrases: string[], speed = 55, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length || !phrases[phraseIdx]) {
      return;
    }

    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  useEffect(() => {
    setPhraseIdx(0);
    setCharIdx(0);
    setDeleting(false);
  }, [phrases]);

  useEffect(() => {
    setDisplay(phrases[phraseIdx]?.slice(0, charIdx) ?? "");
  }, [charIdx, phraseIdx, phrases]);

  return display;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function Hero() {
  const { data } = usePortfolioData();
  const phrases = useMemo(
    () => (data ? [data.title, data.tagline] : [""]),
    [data]
  );
  const typedTagline = useTypingEffect(phrases);
  const headlineWords = data?.name.split(" ") ?? [];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-16 overflow-hidden section-shell"
    >
      <div className="hero-background" aria-hidden="true" />
      <div className="absolute inset-0 bg-bg-primary/80" />

      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-[1.12fr_0.88fr] gap-14 lg:gap-18 items-center">
        <div>
          <motion.div
            className="section-label mb-6 h-5 flex items-center gap-1"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            <span>{typedTagline}</span>
            <span className="inline-block w-0.5 h-3.5 bg-accent-gold animate-pulse" />
          </motion.div>

          <div className="font-display font-light leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary max-w-4xl">
            {headlineWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className={`inline-block mr-[0.25em] ${
                  i === headlineWords.length - 1 ? "gradient-text" : ""
                }`}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.3 + i * 0.12}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.p
            className="mt-8 text-text-secondary text-base md:text-xl max-w-2xl leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.75}
          >
            {data?.tagline}
          </motion.p>

          <motion.div
            className="mt-12 flex flex-wrap items-center gap-5"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.9}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-accent-gold text-bg-primary px-6 py-3 text-sm font-mono tracking-wider hover:bg-accent-gold/90 transition-colors shine-sweep"
            >
              View Work <ArrowDownRight size={15} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-border-medium text-text-secondary px-6 py-3 text-sm font-mono tracking-wider hover:border-text-muted hover:text-text-primary transition-colors glass-panel-soft"
            >
              Get In Touch
            </a>
          </motion.div>

          <motion.div
            className="mt-16 flex flex-wrap items-center gap-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.05}
          >
            {[
              { Icon: Github, href: data?.profiles.github, label: "GitHub" },
              { Icon: Linkedin, href: data?.profiles.linkedin, label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-text-muted hover:text-accent-gold transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
            <div className="h-px w-24 bg-border-medium ml-2" />
            <span className="text-xs font-mono text-text-muted tracking-widest">
              {data?.contact.availability}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProfilePhoto name={data?.name} src={data?.profile_image} />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-xs font-mono text-text-muted tracking-widest">SCROLL</span>
        <div className="relative w-px h-10 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent-gold to-transparent"
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
