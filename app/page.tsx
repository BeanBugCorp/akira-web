// app/page.tsx
import Media from "@/components/Media";
import rawContent from "@/content/landing.json";
import type { LandingData } from "@/lib/types";

const content = rawContent as LandingData;

export default function LandingPage() {
  return (
    <>
      <section className="relative flex h-[80vh] items-end">
        <Media
          media={content.hero.media}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 bg-black/40 p-8 text-white">
          <h1 className="text-6xl font-bold">{content.hero.headline}</h1>
          <p className="mt-2 text-lg">{content.hero.subheadline}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-16 sm:grid-cols-3">
        {content.highlights.map((highlight) => (
          <div key={highlight.title} className="flex flex-col gap-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Media media={highlight.media} className="object-cover" />
            </div>
            <h2 className="text-xl font-semibold text-white">{highlight.title}</h2>
            <p className="text-sm text-white/70">{highlight.description}</p>
          </div>
        ))}
      </section>
    </>
  );
}
