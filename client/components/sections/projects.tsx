import {
  Users,
  MessageCircle,
  BookOpen,
  LineChart,
  HeartPulse,
  Music,
  Activity,
  Rss,
  Film,
  ListChecks,
  Keyboard,
  ListTodo,
  HelpCircle,
  Gamepad2,
  Dumbbell,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { projects, communities } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  Users,
  MessageCircle,
  BookOpen,
  LineChart,
  HeartPulse,
  Music,
  Activity,
  Rss,
  Film,
  ListChecks,
  Keyboard,
  ListTodo,
  HelpCircle,
  Gamepad2,
  Dumbbell,
};

export default function Projects() {
  return (
    <section className="relative overflow-hidden">
      <div className="pastel-wash absolute inset-0 -z-10" />
      <div id="projects" className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="Things I've built"
          title="Projects"
          intro="16+ shipped projects across community platforms, AI apps, iOS, and Android — organized newest to oldest."
        />

        <Reveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => {
            const Icon = ICONS[p.icon] ?? Users;
            const href = p.links[0]?.href;
            return (
              <article key={p.title} className="card group flex flex-col p-4">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--color-hl)_20%,var(--surface-2))] text-[var(--color-hl-deep)] transition-transform group-hover:scale-110 group-hover:rotate-6 dark:text-[var(--color-hl)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="chip">{p.date}</span>
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-[15px] font-semibold leading-snug">
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-1 hover:text-[var(--color-hl-deep)] dark:hover:text-[var(--color-hl)]"
                    >
                      {p.title}
                      <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  ) : (
                    p.title
                  )}
                </h3>

                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted line-clamp-3">
                  {p.blurb}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>

                {p.links.length > 1 ? (
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[var(--color-hl-deep)] underline-offset-2 hover:underline dark:text-[var(--color-hl)]"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </Reveal>

        {/* community platforms callout */}
        <Reveal className="mt-10 rounded-3xl border border-border bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] p-6 text-center backdrop-blur sm:p-8">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold">
            Explore the communities I&apos;ve built
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
            Full portfolios and detailed project documentation live on the
            community platforms.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {communities.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-hl)] px-4 py-2 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                {c.label}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
