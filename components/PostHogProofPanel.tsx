// Collapsible "what this shows" panel. Phase 0-1: concept only.
// Phase 2 will list the actual events/flags captured per level.

type Props = { concept: string };

export default function PostHogProofPanel({ concept }: Props) {
  return (
    <details className="mt-6 rounded-lg border border-stone-300 bg-stone-50/70 px-4 py-3 text-sm text-stone-700">
      <summary className="cursor-pointer select-none font-medium text-stone-800">
        what this level shows
      </summary>
      <div className="mt-2 space-y-1">
        <p>
          <span className="font-mono text-xs text-stone-500">posthog:</span>{" "}
          {concept}
        </p>
        <p className="text-stone-500">
          Instrumentation wires up in Phase 2. The shape is final; the wire is
          not.
        </p>
      </div>
    </details>
  );
}
