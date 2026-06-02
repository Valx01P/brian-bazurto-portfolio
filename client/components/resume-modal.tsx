"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { profile } from "@/lib/data";

const ResumeContext = createContext<() => void>(() => {});

/** Call the returned function to open the résumé preview modal. */
export const useResume = () => useContext(ResumeContext);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openResume = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <ResumeContext.Provider value={openResume}>
      {children}
      {open ? <ResumeDialog onClose={close} /> : null}
    </ResumeContext.Provider>
  );
}

function ResumeDialog({ onClose }: { onClose: () => void }) {
  const file = profile.resumeFile;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${profile.name} resume`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
    >
      {/* backdrop */}
      <button
        aria-label="Close resume preview"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
      />

      {/* panel — sized to a portrait page (8.5 × 11) so the full résumé fits
          with minimal width: content height drives the width via the page ratio */}
      <div className="relative z-10 flex h-[94vh] w-[min(92vw,calc((94vh_-_3.5rem)*0.773))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
        <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex min-w-0 items-center gap-2 font-semibold">
            <FileText className="h-4 w-4 shrink-0 text-[var(--color-hl-deep)] dark:text-[var(--color-hl)]" />
            <span className="truncate">Resume — {profile.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-sm font-medium transition-colors hover:border-[var(--color-hl)]"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Open</span>
            </a>
            <a
              href={file}
              download
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-hl)] px-3 py-1.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface-2 transition-colors hover:border-[var(--color-hl)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* live preview */}
        <div className="relative flex-1 bg-surface-2">
          <iframe
            src={`${file}#toolbar=0&navpanes=0&view=FitH`}
            title={`${profile.name} resume preview`}
            className="h-full w-full"
          />
          {/* graceful fallback for browsers that can't render PDFs inline */}
          <noscript />
        </div>

        <footer className="border-t border-border px-4 py-2 text-center text-xs text-muted sm:hidden">
          Can&apos;t see it?{" "}
          <a
            href={file}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-hl-deep)] underline dark:text-[var(--color-hl)]"
          >
            Open the PDF
          </a>
          .
        </footer>
      </div>
    </div>
  );
}
