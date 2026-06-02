import { GraduationCap } from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { education, courseworkNote } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="Where I learn"
        title="Education"
        intro="Honors College computer scientist with a knack for shipping and a heart for community."
      />

      <Reveal stagger className="grid gap-4 sm:grid-cols-2">
        {education.map((e) => (
          <article key={e.school} className="card p-6">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--color-hl)_22%,var(--surface-2))] text-[var(--color-hl-deep)] dark:text-[var(--color-hl)]">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="chip">{e.period}</span>
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
              {e.school}
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {e.detail.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </article>
        ))}
      </Reveal>

      <Reveal className="mt-4 text-sm text-muted">
        <p className="marker inline">{courseworkNote}</p>
      </Reveal>
    </section>
  );
}
