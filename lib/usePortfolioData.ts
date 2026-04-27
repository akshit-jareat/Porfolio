"use client";

import { useEffect, useState } from "react";

export type PortfolioData = {
  name: string;
  title: string;
  tagline: string;
  profile_image: string;
  education: {
    status: string;
    cgpa: string;
  };
  about: string;
  skills: Record<string, string[]>;
  coding_progress: {
    dsa_questions_solved: number;
    status: string;
  };
  projects_note: string;
  projects: {
    id: string;
    title: string;
    description: string;
    tags: string[];
  }[];
  achievements: string[];
  profiles: {
    github: string;
    linkedin: string;
  };
  timeline: {
    period: string;
    title: string;
    type: string;
    description: string;
    tags: string[];
  }[];
  contact: {
    availability: string;
    cta: string;
  };
};

let dataCache: PortfolioData | null = null;
let dataPromise: Promise<PortfolioData> | null = null;

function loadPortfolioData() {
  if (dataCache) {
    return Promise.resolve(dataCache);
  }

  dataPromise ??= fetch("/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to load portfolio data.");
      }

      return response.json() as Promise<PortfolioData>;
    })
    .then((data) => {
      dataCache = data;
      return data;
    });

  return dataPromise;
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(dataCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    loadPortfolioData()
      .then((portfolioData) => {
        if (mounted) {
          setData(portfolioData);
        }
      })
      .catch((err: Error) => {
        if (mounted) {
          setError(err.message);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { data, error };
}

export function formatSkillCategory(category: string) {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
