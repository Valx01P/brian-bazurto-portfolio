"use client";

import { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { useResume } from "./resume-modal";
import { navLinks, profile } from "@/lib/data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#intro");
  const openResume = useResume();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive("#" + e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-[color-mix(in_srgb,var(--background)_80%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a
          href="#intro"
          className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-bold"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--color-hl)] font-bold text-black">
            B
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active === l.href
                    ? "bg-[var(--color-hl)] text-black"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openResume}
            className="hidden items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-[var(--color-hl)] sm:flex"
          >
            <FileText className="h-4 w-4" /> Resume
          </button>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-border bg-[color-mix(in_srgb,var(--background)_92%,transparent)] backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0 border-transparent"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-3">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-base font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openResume();
              }}
              className="mt-1 flex w-full items-center gap-2 rounded-xl bg-[var(--color-hl)] px-4 py-2.5 text-left text-base font-semibold text-black"
            >
              <FileText className="h-4 w-4" /> View Resume
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
