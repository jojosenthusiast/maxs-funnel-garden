"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { LEVEL_COUNT } from "@/lib/levels";
import { loadProgress, markCompleted, type Progress } from "@/lib/progress";
import { track } from "@/lib/events";

type Props = { levelId: number };

// ponytail: no subscribe needed; we only re-read after our own writes via bump.
const EMPTY: Progress = { completed: [] };
const noopSubscribe = () => () => {};

export default function GardenLevelClient({ levelId }: Props) {
  const router = useRouter();
  const [, bump] = useState(0);

  const progress = useSyncExternalStore(
    noopSubscribe,
    loadProgress,
    () => EMPTY,
  );

  useEffect(() => {
    track("level_seen", { level: levelId });
  }, [levelId]);

  const done = progress.completed.includes(levelId);
  const isLast = levelId >= LEVEL_COUNT;

  function handleComplete() {
    markCompleted(levelId);
    bump((n) => n + 1);
    track("level_completed", { level: levelId });
    if (isLast) {
      track("garden_completed");
      router.push("/garden/complete");
    } else {
      router.push(`/garden/${levelId + 1}`);
    }
  }

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
