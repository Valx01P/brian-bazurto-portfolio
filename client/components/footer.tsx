"use client";

import { Mail, FileText, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./brand-icons";
import Reveal from "./reveal";
import { useResume } from "./resume-modal";
import { profile } from "@/lib/data";

export default function Footer() {
  const openResume = useResume();
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="pastel-wash absolute inset-0 -z-10 opacity-60" />
      <Reveal className="mx-auto max-w-6xl px-5 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-hl-deep)] dark:text-[var(--color-hl)]">
          Let&apos;s build something
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
          Open to <span className="marker">new grad &amp; SWE</span> roles and
          collaborations.
        </h2>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-hl)] px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            <Mail className="h-4 w-4" /> Get in touch
          </a>
          <button
            type="button"
            onClick={openResume}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-6 py-3 font-semibold transition-colors hover:border-[var(--color-hl)]"
          >
            <FileText className="h-4 w-4" /> Resume
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {[
            { href: profile.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
            { href: profile.socials.github, label: "GitHub", Icon: GithubIcon },
            { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface-2 transition-colors hover:border-[var(--color-hl)] hover:text-[var(--color-hl-deep)] dark:hover:text-[var(--color-hl)]"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <p className="mt-10 flex items-center justify-center gap-1.5 text-sm text-muted">
          &copy; {2026} {profile.name}. Built with
          <Heart className="h-3.5 w-3.5 fill-purple-500 text-purple-500" />
          and lots of color.
        </p>
        <p className="mt-1 text-xs text-muted">{profile.domain}</p>
      </Reveal>
    </footer>
  );
}
