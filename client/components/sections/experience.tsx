import { Briefcase, MapPin } from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="My journey"
        title="Experience"
        intro="From American Express to Workday, Google to research labs — eleven roles, one through-line: build, teach, repeat."
      />

      <Reveal
        stagger
        className="grid items-start gap-4 md:grid-cols-2"
      >
        {experience.map((x) => (
          <article key={x.org + x.period} className="card p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--color-hl)_18%,var(--surface-2))] text-[var(--color-hl-deep)] dark:text-[var(--color-hl)]">
                  <Briefcase className="h-4 w-4" />
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-base font-semibold leading-tight">
                  {x.org}
                </h3>
              </div>
              <span className="chip shrink-0">{x.period}</span>
            </div>

            <p className="mt-2 flex flex-wrap items-center gap-x-2 text-[13px] font-medium text-[var(--color-hl-deep)] dark:text-[var(--color-hl)]">
              {x.role}
              {x.location ? (
                <span className="inline-flex items-center gap-1 text-xs font-normal text-muted">
                  <MapPin className="h-3 w-3" />
                  {x.location}
                </span>
              ) : null}
            </p>

            <ul className="mt-2.5 space-y-1.5 text-[13px] leading-relaxed text-muted">
              {x.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--color-hl)]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
