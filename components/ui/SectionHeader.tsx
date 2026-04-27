interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-14 md:mb-18">
      <p className="section-label mb-3">{label}</p>
      <h2 className="font-display text-4xl md:text-6xl font-light text-text-primary leading-[0.98]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-7 w-24 gold-line" />
    </div>
  );
}
