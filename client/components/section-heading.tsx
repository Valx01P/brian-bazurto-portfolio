import Reveal from "./reveal";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal stagger className="mb-10 max-w-2xl">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-hl-deep)] dark:text-[var(--color-hl)]">
        {eyebrow}
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
        <span className="marker">{title}</span>
      </h2>
      {intro ? <p className="mt-4 text-muted">{intro}</p> : null}
    </Reveal>
  );
}
