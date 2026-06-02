"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  /** Stagger direct children instead of animating the container as one block. */
  stagger?: boolean;
  id?: string;
};

export default function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 18,
  stagger = false,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger
        ? (Array.from(el.children) as HTMLElement[])
        : [el];

      gsap.set(el, { opacity: 1 });
      if (stagger) gsap.set(targets, { opacity: 0 });

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          delay,
          stagger: stagger ? 0.05 : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${className ?? ""}`}
    >
      {children}
    </Tag>
  );
}
