// app/tienda/page.tsx
import Media from "@/components/Media";
import rawContent from "@/content/tienda.json";
import type { StoreData } from "@/lib/types";

const content = rawContent as StoreData;

export default function StorePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold text-white">Tienda</h1>
      <p className="mt-2 max-w-2xl text-white/70">{content.intro}</p>
      <p className="mt-4 rounded-md bg-yellow-100 px-4 py-2 text-sm text-yellow-900">
        Nota: falta integrar el proveedor de pagos. Por ahora esta seccion solo
        muestra la estructura de productos, sin checkout funcional.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {content.products.map((product) => (
          <article key={product.id} className="flex flex-col gap-2">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Media media={product.media[0]} className="object-cover" />
              {!product.available && (
                <span className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                  Agotado
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-white">{product.name}</h2>
            <p className="text-sm text-white/70">{product.description}</p>
            <span className="font-medium text-white">${product.price} MXN</span>
          </article>
        ))}
      </div>
    </section>
  );
}
