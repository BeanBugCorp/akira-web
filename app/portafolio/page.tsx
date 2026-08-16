// app/portafolio/page.tsx
import Media from "@/components/Media";
import rawContent from "@/content/portafolio.json";
import type { PortfolioData } from "@/lib/types";

const content = rawContent as PortfolioData;

export default function PortfolioPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold text-white">Portafolio</h1>
      <p className="mt-2 max-w-2xl text-white/70">{content.intro}</p>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
        {content.projects.map((project) => (
          <article key={project.id} className="flex flex-col gap-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Media media={project.media[0]} className="object-cover" />
            </div>
            <span className="text-xs uppercase tracking-wide text-white/50">
              {project.category}
            </span>
            <h2 className="text-xl font-semibold text-white">{project.title}</h2>
            <p className="text-sm text-white/70">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
