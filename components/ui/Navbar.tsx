"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePortfolioData } from "@/lib/usePortfolioData";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data } = usePortfolioData();
  const initials =
    data?.name
      .split(" ")
      .map((part) => part[0])
      .join("") ?? "";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-bg-primary/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-xl font-light tracking-wide gradient-text"
        >
          {initials}
          <span className="text-accent-gold">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm border border-accent-gold/70 text-accent-gold px-4 py-1.5 hover:bg-accent-glow transition-colors duration-200 font-mono tracking-wider glass-panel-soft"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-bg-secondary/90 backdrop-blur-xl">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center gap-2 text-sm border border-accent-gold text-accent-gold px-4 py-2 w-fit font-mono tracking-wider"
            >
              Hire Me
            </a>
            <ThemeToggle />
          </nav>
        </div>
      )}
    </header>
  );
}
