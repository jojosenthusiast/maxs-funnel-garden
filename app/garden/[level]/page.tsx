import { notFound } from "next/navigation";
import MaxSprite from "@/components/MaxSprite";
import PostHogProofPanel from "@/components/PostHogProofPanel";
import GardenLevelClient from "@/components/GardenLevelClient";
import { getLevel, parseLevelParam, LEVEL_COUNT } from "@/lib/levels";

// Next 15+ params is a Promise.
type Params = Promise<{ level: string }>;

export function generateStaticParams() {
  return Array.from({ length: LEVEL_COUNT }, (_, i) => ({
    level: String(i + 1),
  }));
}

export default async function LevelPage({ params }: { params: Params }) {
  const { level } = await params;
  const id = parseLevelParam(level);
  if (id === null) notFound();
  const data = getLevel(id);
  if (!data) notFound();

  const mood =
    data.slug === "error-thorns"
      ? "concerned"
      : data.slug === "oracle-burrow"
        ? "thrilled"
        : "calm";

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-12">
      <div className="w-full max-w-xl">
        <p className="text-xs uppercase tracking-widest text-stone-500">
          level {data.id} of {LEVEL_COUNT}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-900">
          {data.title}
        </h1>
        <p className="mt-3 text-stone-600">{data.blurb}</p>

        <div className="mt-10 flex justify-center">
          <MaxSprite size={180} mood={mood} />
        </div>

        <GardenLevelClient levelId={data.id} />

        <PostHogProofPanel concept={data.posthogConcept} />
      </div>
    </main>
  );
}
