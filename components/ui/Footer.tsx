"use client";

import { Github, Linkedin } from "lucide-react";
import { usePortfolioData } from "@/lib/usePortfolioData";

export default function Footer() {
  const { data } = usePortfolioData();
  const initials =
    data?.name
      .split(" ")
      .map((part) => part[0])
      .join("") ?? "";

  return (
    <footer className="border-t border-border-subtle bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display text-lg text-text-primary">
          {initials}
          <span className="text-accent-gold">.</span>
        </p>

        <p className="text-text-muted text-sm font-mono text-center">
          Copyright {new Date().getFullYear()} {data?.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          {[
            { icon: Github, href: data?.profiles.github, label: "GitHub" },
            { icon: Linkedin, href: data?.profiles.linkedin, label: "LinkedIn" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-muted hover:text-accent-gold transition-colors duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
