// components/PortfolioNav.tsx
import Link from "next/link";
import type { PortfolioCategory } from "@/lib/types";

export default function PortfolioNav({
  categories,
  currentSlug,
}: {
  categories: PortfolioCategory[];
  currentSlug: string;
}) {
  return (
    <nav aria-label="Categorías del portafolio" className="items-center">
      <ul className="flex flex-wrap gap-6 text-sm justify-center">
        {categories.map((category) => {
          const isActive = category.slug === currentSlug;
          return (
            <li key={category.slug}>
              <Link
                href={`/portafolio/${category.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={`
                  ${
                    isActive
                      ? "font-semibold text-red-600"
                      : "font-semibold text-red-600 hover:text-red-800"
                  }
                  `}
              >
                {category.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
