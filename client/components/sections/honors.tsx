import { Award, Sparkle } from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { academicHonors, professionalDevelopment } from "@/lib/data";

export default function Honors() {
  const columns = [
    { title: "Academic Honors", icon: Award, items: academicHonors },
    {
      title: "Professional Development",
      icon: Sparkle,
      items: professionalDevelopment,
    },
  ];

  return (
    <section id="honors" className="relative mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="Recognition"
        title="Honors & Awards"
        intro="Scholarships, honor societies, and a community of orgs that keep me growing."
      />

      <Reveal stagger className="grid gap-4 md:grid-cols-2">
        {columns.map((col) => (
          <div key={col.title} className="card p-6">
            <h3 className="mb-4 flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--color-hl)_22%,var(--surface-2))] text-[var(--color-hl-deep)] dark:text-[var(--color-hl)]">
                <col.icon className="h-5 w-5" />
              </span>
              {col.title}
            </h3>
            <ul className="space-y-2.5 text-sm text-muted">
              {col.items.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-hl)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
