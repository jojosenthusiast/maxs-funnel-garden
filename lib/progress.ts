// Client-side progression. localStorage; no auth, no server, no PII.

import { LEVEL_COUNT } from "./levels.ts";

const STORAGE_KEY = "mfg:progress:v1";

export type Progress = { completed: number[] };

const empty = (): Progress => ({ completed: [] });

export function loadProgress(): Progress {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<Progress>;
    const completed = Array.isArray(parsed.completed)
      ? parsed.completed.filter(
          (n) => Number.isInteger(n) && n >= 1 && n <= LEVEL_COUNT,
        )
      : [];
    return { completed };
  } catch {
    return empty();
  }
}

export function saveProgress(p: Progress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // storage disabled (Safari private mode etc.); silently degrade
  }
}

export function markCompleted(level: number): Progress {
  const p = loadProgress();
  if (!p.completed.includes(level)) p.completed.push(level);
  p.completed.sort((a, b) => a - b);
  saveProgress(p);
  return p;
}

export function resetProgress(): Progress {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  return empty();
}

export function isAllComplete(p: Progress): boolean {
  return p.completed.length >= LEVEL_COUNT;
}
