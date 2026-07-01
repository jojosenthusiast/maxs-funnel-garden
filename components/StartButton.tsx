"use client";

import { useRouter } from "next/navigation";
import { track } from "@/lib/events";
import { resetProgress } from "@/lib/progress";

export default function StartButton() {
  const router = useRouter();
  function start() {
    resetProgress();
    track("garden_started");
    router.push("/garden/1");
  }
  return (
    <button
      type="button"
      onClick={start}
      className="rounded-full bg-emerald-700 px-7 py-3 text-base font-medium text-emerald-50 shadow-sm transition-colors hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      open the gate
    </button>
  );
}
