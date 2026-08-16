// app/quien-soy/page.tsx
import Media from "@/components/Media";
import rawContent from "@/content/quien-soy.json";
import type { AboutData } from "@/lib/types";

const content = rawContent as AboutData;

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold text-white">{content.title}</h1>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-[300px_1fr]">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
          <Media media={content.portrait} className="object-cover" />
        </div>
        <div className="flex flex-col gap-4 text-white/80">
          {content.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {content.gallery.map((photo, i) => (
          <div key={i} className="relative aspect-square w-full overflow-hidden rounded-lg">
            <Media media={photo} className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
