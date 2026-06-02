"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./brand-icons";
import { useResume } from "./resume-modal";
import { profile, stats, communities } from "@/lib/data";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const introDone = useRef(false);
  const openResume = useResume();

  useGSAP(
    () => {
      introDone.current = false;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          introDone.current = true;
        },
      });

      tl.from(".hero-name", { opacity: 0, y: 12, duration: 0.5 })
        .from(".hero-bio", { y: 20, opacity: 0, duration: 0.7 }, "-=0.2")
        .from(
          ".hero-cta",
          { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 },
          "-=0.35"
        )
        .from(
          ".hero-stat",
          { y: 24, opacity: 0, duration: 0.5, stagger: 0.08 },
          "-=0.3"
        )
        .from(".hero-photo", { opacity: 0, duration: 0.8 }, "-=1.0")
        .from(
          ".hero-chip",
          { scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, ease: "back.out(2)" },
          "-=0.6"
        );
    },
    { scope: root }
  );

  // Physics-based springy reaction when hovering a letter (after the intro plays)
  const handleLetterHover = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!introDone.current) return;
    const el = e.currentTarget;
    gsap.killTweensOf(el);
    gsap
      .timeline()
      .to(el, {
        y: gsap.utils.random(-22, -10),
        x: gsap.utils.random(-6, 6),
        rotate: gsap.utils.random(-14, 14),
        duration: 0.18,
        ease: "power2.out",
      })
      .to(el, {
        y: 0,
        x: 0,
        rotate: 0,
        duration: 1.1,
        ease: "elastic.out(1, 0.3)",
      });
  };

  const renderWord = (word: string) =>
    word.split("").map((ch, i) => (
      <span
        key={`${word}-${i}`}
        onPointerEnter={handleLetterHover}
        className="name-letter inline-block cursor-default will-change-transform"
      >
        {ch}
      </span>
    ));

  return (
    <section
      ref={root}
      id="intro"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Text */}
        <div>
          <h1
            aria-label={profile.name}
            className="hero-name relative inline-block font-[family-name:var(--font-display)] text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl dark:font-medium"
          >
            {/* big highlighter swash across the middle of the name */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[-0.08em] top-1/2 z-0 h-[0.46em] w-[82%] -translate-y-1/2 -rotate-2 rounded-[3px] bg-[var(--color-hl)]"
            />
            <span aria-hidden="true" className="relative z-10 block">
              {renderWord("Brian")}
            </span>
            <span aria-hidden="true" className="relative z-10 block">
              {renderWord("Bazurto")}
            </span>
          </h1>

          <p className="hero-bio mt-5 max-w-xl text-lg text-muted">
            {profile.tagline} As{" "}
            <span className="marker font-semibold">
              President &amp; Founder of Code Crunch
            </span>
            , I lead ColorStack, CAHSI &amp; GDG at FIU — empowering 600+ students
            across 15+ universities.
          </p>

          <div className="hero-cta mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-hl)] px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              See my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={openResume}
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-border bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] px-6 py-3 font-semibold backdrop-blur transition-colors hover:border-[var(--color-hl)]"
            >
              View Resume
            </button>
            <div className="hero-cta flex items-center gap-2">
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface-2 transition-colors hover:border-[var(--color-hl)] hover:text-[var(--color-hl-deep)] dark:hover:text-[var(--color-hl)]"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface-2 transition-colors hover:border-[var(--color-hl)] hover:text-[var(--color-hl-deep)] dark:hover:text-[var(--color-hl)]"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <dl className="mt-9 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="hero-stat rounded-2xl border border-border bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] px-3 py-3 backdrop-blur"
              >
                <dt className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
                  {s.value}
                </dt>
                <dd className="text-xs text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Photo — like a printed snapshot straight out of a camera */}
        <div className="relative mx-auto w-full max-w-[30rem]">
          <div className="hero-photo border border-black/10 bg-white p-3 pb-10">
            <div className="relative">
              <Image
                src={profile.image}
                alt={`${profile.name} — software engineer and community builder`}
                width={640}
                height={760}
                priority
                className="block h-auto w-full object-cover"
              />
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/55 px-2.5 py-1 text-xs font-medium text-white">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location}
              </div>
            </div>
          </div>

          {/* floating community chips */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {communities.slice(0, 3).map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-chip chip hover:cursor-pointer"
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
