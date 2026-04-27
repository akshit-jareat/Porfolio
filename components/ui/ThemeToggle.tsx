"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme") as Theme | null;
    const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    const nextTheme = storedTheme ?? preferredTheme;

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  }

  const isLight = theme === "light";
  const Icon = isLight ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group relative inline-flex h-9 w-16 items-center rounded-full border border-border-medium bg-bg-card/70 p-1 text-text-secondary backdrop-blur-xl transition-colors hover:text-text-primary"
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      <span
        className={`absolute h-7 w-7 rounded-full bg-accent-gold shadow-lg shadow-black/20 transition-transform duration-300 ${
          isLight ? "translate-x-7" : "translate-x-0"
        }`}
      />
      <span className="relative z-10 flex w-full items-center justify-between px-1">
        <Sun size={14} className={isLight ? "text-text-muted" : "text-bg-primary"} />
        <Moon size={14} className={isLight ? "text-bg-primary" : "text-text-muted"} />
      </span>
      <Icon className="sr-only" size={1} />
    </button>
  );
}
