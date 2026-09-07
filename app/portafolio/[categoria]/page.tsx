// app/portafolio/[categoria]/page.tsx
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import PortfolioNav from "@/components/PortfolioNav";
import rawContent from "@/content/portafolio.json";
import type { PortfolioData } from "@/lib/types";

const content = rawContent as PortfolioData;

export function generateStaticParams() {
  return content.categories.map((category) => ({ categoria: category.slug }));
}

// Categories are a fixed, closed set defined by the client — no unlisted
// slug should ever render, not even via on-demand SSR fallback.
export const dynamicParams = false;

export default async function PortfolioCategoryPage({
  params,
}: PageProps<"/portafolio/[categoria]">) {
  const { categoria } = await params;
  const category = content.categories.find((c) => c.slug === categoria);
  if (!category) notFound();

  const projects = content.projects.filter(
    (project) => project.categorySlug === categoria,
  );

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="mt-8">
        <PortfolioNav categories={content.categories} currentSlug={categoria} />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="flex flex-col gap-3">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg">
              <Media media={project.media[0]} className="object-cover" />
            </div>
            <span className="text-xs uppercase tracking-wide text-white/50">
              {category.label}
            </span>
            <h2 className="text-xl font-semibold text-white">
              {project.title}
            </h2>
            <p className="text-sm text-white/70">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
