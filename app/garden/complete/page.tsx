import Link from "next/link";
import MaxSprite from "@/components/MaxSprite";

export default function CompletePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="flex flex-col items-center gap-8 text-center">
        <MaxSprite size={200} mood="thrilled" />

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-stone-900">
            the garden, tended
          </h1>
          <p className="max-w-md text-stone-600">
            Max is pleased. Eight levels, eight PostHog concepts. The wiring
            arrives in Phase 2 — the shape is here today.
          </p>
        </div>

        <Link
          href="/"
          className="rounded-full border border-stone-300 bg-white px-6 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          back to the gate
        </Link>
      </div>
    </main>
  );
}
