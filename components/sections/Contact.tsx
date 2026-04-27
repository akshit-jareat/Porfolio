"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Send, Sparkles } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { usePortfolioData } from "@/lib/usePortfolioData";

export default function Contact() {
  const { data } = usePortfolioData();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Could not send your message.");
      }

      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your message.");
    } finally {
      setSending(false);
    }
  };

  const contactInfo = data
    ? [
        {
          icon: Github,
          label: "GitHub",
          value: data.profiles.github.replace("https://", ""),
          href: data.profiles.github,
        },
        {
          icon: Linkedin,
          label: "LinkedIn",
          value: data.profiles.linkedin.replace("https://", ""),
          href: data.profiles.linkedin,
        },
        {
          icon: Sparkles,
          label: "Availability",
          value: data.contact.availability,
          href: null,
        },
      ]
    : [];

  return (
    <section id="contact" className="py-28 md:py-32 px-6 bg-bg-primary section-shell">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="07 - Contact"
          title="Let's build something"
          subtitle={data?.contact.cta}
        />

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="space-y-8">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-9 h-9 border border-border-medium flex items-center justify-center text-accent-gold flex-shrink-0">
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-text-muted tracking-widest uppercase mb-1">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-text-primary transition-colors text-sm break-all"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-text-secondary text-sm leading-relaxed">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 glass-panel gradient-border">
              <p className="font-display text-lg text-text-primary font-light italic mb-2">
                {data?.tagline}
              </p>
              <p className="text-xs font-mono text-text-muted tracking-widest">
                {data?.name}
              </p>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="border border-accent-gold/30 bg-accent-glow p-10 flex flex-col items-center text-center gap-4 h-full justify-center glass-panel">
                <div className="w-10 h-10 border border-accent-gold flex items-center justify-center text-accent-gold">
                  <Send size={16} />
                </div>
                <p className="font-display text-xl text-text-primary font-light">
                  Message sent.
                </p>
                <p className="text-text-secondary text-sm">
                  Thank you for reaching out. I&apos;ll respond as soon as possible.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 text-xs font-mono text-accent-gold border-b border-accent-gold/40 hover:border-accent-gold pb-0.5 transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-5 glass-panel rich-hover p-6 md:p-7"
                initial={{ opacity: 0, y: 36, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                {error && (
                  <div className="border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-text-secondary">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono text-text-muted tracking-widest uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-bg-secondary/70 border border-border-medium px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-muted tracking-widest uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-bg-secondary/70 border border-border-medium px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-muted tracking-widest uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-bg-secondary/70 border border-border-medium px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-gold transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent-gold text-bg-primary py-3 text-sm font-mono tracking-wider hover:bg-accent-gold/90 transition-colors"
                >
                  {sending ? "Sending..." : "Send Message"} <Send size={14} />
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
