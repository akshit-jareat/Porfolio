"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-accent-gold via-pink-500 to-cyan-400 shadow-[0_0_24px_rgb(var(--accent-gold)/0.45)]"
      style={{ scaleX }}
    />
  );
}
