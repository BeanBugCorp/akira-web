// app/portafolio/page.tsx
import { redirect } from "next/navigation";
import rawContent from "@/content/portafolio.json";
import type { PortfolioData } from "@/lib/types";

const content = rawContent as PortfolioData;

export default function PortfolioIndexPage() {
  redirect(`/portafolio/${content.defaultCategorySlug}`);
}
