"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type ProfilePhotoProps = {
  name?: string;
  src?: string;
};

const fallbackImages = [
  "/images/profile.jpg",
  "/images/profile.png",
  "/images/profile.jpeg",
  "/images/akshit.jpg",
  "/images/akshit.png",
];

export default function ProfilePhoto({ name, src }: ProfilePhotoProps) {
  const images = useMemo(
    () => Array.from(new Set([src, ...fallbackImages].filter(Boolean))) as string[],
    [src]
  );
  const [imageIndex, setImageIndex] = useState(0);
  const activeImage = images[imageIndex];
  const initials =
    name
      ?.split(" ")
      .map((part) => part[0])
      .join("") ?? "AJ";

  return (
    <div className="relative mx-auto w-full max-w-[22rem] float-slow">
      <div className="absolute -inset-4 bg-gradient-to-br from-accent-gold/30 via-pink-500/20 to-cyan-400/20 blur-3xl" />
      <div className="relative aspect-[4/5] overflow-hidden glass-panel gradient-border shine-sweep pulse-glow">
        {activeImage ? (
          <Image
            src={activeImage}
            alt={name ? `${name} profile photo` : "Profile photo"}
            fill
            sizes="(min-width: 1024px) 22rem, 80vw"
            className="object-cover saturate-125 contrast-110 transition-transform duration-700 hover:scale-105"
            onError={() => setImageIndex((index) => index + 1)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-bg-elevated">
            <span className="font-display text-7xl gradient-text">{initials}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/55 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="font-display text-3xl text-text-primary">{name}</p>
          <div className="mt-3 h-px w-24 gold-line" />
        </div>
      </div>
    </div>
  );
}
