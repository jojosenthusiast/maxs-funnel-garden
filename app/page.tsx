import MaxSprite from "@/components/MaxSprite";
import StartButton from "@/components/StartButton";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="flex flex-col items-center gap-8 text-center">
        <MaxSprite size={180} mood="thrilled" />

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
            Max&apos;s Funnel Garden
          </h1>
          <p className="max-w-xl text-base text-stone-600 sm:text-lg">
            A small garden. A hedgehog with opinions. Eight tiny levels that
            each smuggle in a piece of PostHog.
          </p>
          <p className="max-w-xl text-sm italic text-stone-500">
            No accounts. No tracking that you didn&apos;t ask for. Just Max.
          </p>
        </div>

        <StartButton />

        <p className="text-xs text-stone-500">
          takes about three minutes · keyboard or click
        </p>
      </div>
    </main>
  );
}
