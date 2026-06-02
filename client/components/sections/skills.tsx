import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section className="relative overflow-hidden">
      <div className="pastel-wash absolute inset-0 -z-10" />
      <div id="skills" className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="My toolkit"
          title="Technical Skills"
          intro="From low-level C to cloud AI — a stack that scales from hackathon to production."
        />

        <Reveal stagger className="grid gap-4 md:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group} className="card p-6">
              <h3 className="mb-4 flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-hl)]" />
                {s.group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <span key={i} className="chip">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
