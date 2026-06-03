"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 transition-colors hover:border-[var(--color-hl)]"
    >
      {mounted ? (
        <span className="relative h-5 w-5">
          <Sun
            className={`absolute inset-0 h-5 w-5 text-black transition-all duration-500 ${
              isDark
                ? "rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <Moon
            className={`absolute inset-0 h-5 w-5 text-[var(--color-hl)] transition-all duration-500 ${
              isDark
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </span>
      ) : (
        <span className="h-5 w-5" />
      )}
    </button>
  );
}
