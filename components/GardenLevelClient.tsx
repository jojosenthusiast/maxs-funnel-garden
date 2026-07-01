"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { LEVEL_COUNT } from "@/lib/levels";
import {
  PROGRESS_STORAGE_KEY,
  loadProgress,
  markCompleted,
  type Progress,
} from "@/lib/progress";
import { track } from "@/lib/events";

type Props = { levelId: number };

const EMPTY: Progress = { completed: [] };

// ponytail: useSyncExternalStore requires that getSnapshot return a stable
// reference when the underlying data is unchanged, or React infinite-loops.
// Progress only changes via our own writes to a single localStorage key, so
// we cache the last (raw, parsed) pair per client.
let cachedRaw: string | null | undefined;
let cachedProgress: Progress = EMPTY;

function getSnapshot(): Progress {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
  if (raw === cachedRaw) return cachedProgress;
  cachedRaw = raw;
  cachedProgress = loadProgress();
  return cachedProgress;
}

// Global subscribers, notified when our own writes update progress.
const subs = new Set<() => void>();
function subscribe(cb: () => void): () => void {
  subs.add(cb);
  return () => {
    subs.delete(cb);
  };
}
function notify(): void {
  cachedRaw = undefined; // invalidate so next getSnapshot re-reads
  for (const cb of subs) cb();
}

export default function GardenLevelClient({ levelId }: Props) {
  const router = useRouter();
  const progress = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  useEffect(() => {
    track("level_seen", { level: levelId });
  }, [levelId]);

  const done = progress.completed.includes(levelId);
  const isLast = levelId >= LEVEL_COUNT;

  const handleComplete = useCallback(() => {
    markCompleted(levelId);
    notify();
    track("level_completed", { level: levelId });
    if (isLast) {
      track("garden_completed");
      router.push("/garden/complete");
    } else {
      router.push(`/garden/${levelId + 1}`);
    }
  }, [levelId, isLast, router]);

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={handleComplete}
        className="rounded-full bg-emerald-700 px-6 py-2 text-sm font-medium text-emerald-50 shadow-sm transition-colors hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        {isLast ? "finish the garden" : done ? "next level →" : "complete level"}
      </button>
      <p className="text-xs text-stone-500">
        {progress.completed.length} / {LEVEL_COUNT} levels tended
      </p>
    </div>
  );
}
