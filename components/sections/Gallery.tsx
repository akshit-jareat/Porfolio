"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const galleryItems = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
    alt: "Code on screen",
    span: "col-span-1 row-span-2",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80",
    alt: "Workspace setup",
    span: "col-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    alt: "Circuit board macro",
    span: "col-span-1",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
    alt: "Design sketches",
    span: "col-span-2",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=800&q=80",
    alt: "Laptop minimal",
    span: "col-span-1",
  },
];

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = galleryItems[index];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-bg-primary/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Image container */}
      <motion.div
        key={index}
        className="relative z-10 max-w-4xl w-full max-h-[80vh] mx-8"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-full aspect-[16/10] border border-border-medium overflow-hidden">
          <Image src={item.src} alt={item.alt} fill className="object-cover" priority />
        </div>

        {/* Caption */}
        <p className="mt-3 text-center text-xs font-mono text-text-muted tracking-widest">
          {index + 1} / {galleryItems.length} — {item.alt}
        </p>
      </motion.div>

      {/* Controls */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-9 h-9 border border-border-medium flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors"
        aria-label="Close gallery image"
      >
        <X size={16} />
      </button>
      <button
        onClick={onPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-border-medium flex items-center justify-center text-text-secondary hover:text-accent-gold hover:border-accent-gold transition-colors"
        aria-label="Previous gallery image"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={onNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-border-medium flex items-center justify-center text-text-secondary hover:text-accent-gold hover:border-accent-gold transition-colors"
        aria-label="Next gallery image"
      >
        <ChevronRight size={18} />
      </button>
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + galleryItems.length) % galleryItems.length));
  const nextImage = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % galleryItems.length));

  return (
    <section id="gallery" className="py-28 md:py-32 px-6 bg-bg-secondary section-shell">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="05 — Gallery"
          title="Visual notes"
          subtitle="Moments from the studio — click any image to expand."
        />

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] gap-3">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.id}
              className={`${item.span} relative overflow-hidden border border-white/10 group cursor-zoom-in glass-panel-soft rich-hover`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => openLightbox(idx)}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </motion.div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />

              {/* Caption overlay */}
              <motion.div
                className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-bg-primary/80 to-transparent"
                initial={{ opacity: 0, y: 8 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs font-mono text-text-primary tracking-wide">{item.alt}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs font-mono text-text-muted tracking-widest">
          Click to expand · Hover to reveal colour
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
