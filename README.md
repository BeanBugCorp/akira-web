# Akira — sitio web

Sitio de la marca Akira construido con [Next.js](https://nextjs.org) (App Router), TypeScript y Tailwind CSS. Pensado para desplegarse en Vercel.

## Getting Started

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver el resultado.

## Estructura del contenido

El sitio tiene 4 secciones, cada una con su propia pagina y su propio archivo de contenido:

| Seccion    | Pagina            | Contenido                 |
| ---------- | ----------------- | ------------------------- |
| Landing    | `app/page.tsx`    | `content/landing.json`    |
| Portafolio | `app/portafolio/` | `content/portafolio.json` |
| Tienda     | `app/tienda/`     | `content/tienda.json`     |
| Quien soy  | `app/quien-soy/`  | `content/quien-soy.json`  |

Los textos y las rutas a imagenes/videos viven en los archivos `.json` de `content/`, separados del codigo. Los archivos reales (fotos, videos) viven en `public/media/<seccion>/`.

## Como reemplazar una imagen o un video (sin tocar codigo)

1. Sube el archivo nuevo (jpg, png, webp, mp4, etc.) a la carpeta de la seccion correspondiente dentro de `public/media/`. Por ejemplo, para la tienda: `public/media/tienda/producto-1-1.jpg`.
2. Abre el archivo `.json` de esa seccion en `content/` (por ejemplo `content/tienda.json`).
3. Busca el bloque que corresponde a esa imagen/video y cambia el campo `"src"` para que apunte a la ruta del archivo nuevo, empezando siempre con `/media/...` (sin incluir `public`). Por ejemplo:

   ```json
   {
     "type": "image",
     "src": "/media/tienda/producto-1-1.jpg",
     "alt": "Print A3 numerado"
   }
   ```

4. Si el archivo es un video, cambia `"type"` a `"video"` y agrega opcionalmente `"poster"` con la ruta de una imagen que se muestre mientras carga:

   ```json
   {
     "type": "video",
     "src": "/media/portafolio/proyecto-1-1.mp4",
     "poster": "/media/portafolio/proyecto-1-1-poster.jpg",
     "alt": "Animacion del proyecto 1"
   }
   ```

5. Actualiza siempre el campo `"alt"` para que describa la nueva imagen (es importante para accesibilidad y SEO).
6. Guarda el archivo. En desarrollo (`npm run dev`) el cambio se ve al instante; en produccion basta con hacer commit y push para que Vercel vuelva a desplegar el sitio.

No es necesario tocar ningun archivo `.tsx` para cambiar imagenes, videos o textos — todo vive en `content/*.json` y `public/media/`.

### Placeholders

Mientras no se suban los archivos reales, cada referencia en los `.json` apunta a un placeholder SVG gris generado automaticamente (por ejemplo `public/media/tienda/producto-1-1.svg`) para que el sitio no se vea roto. Al subir el archivo real, recuerda actualizar la extension en el `"src"` del JSON (de `.svg` a `.jpg`, `.png`, `.mp4`, etc.).

## Nota sobre la tienda

La seccion `/tienda` todavia no tiene checkout: solo muestra la estructura de productos (nombre, precio, descripcion, disponibilidad e imagenes). Falta integrar un proveedor de pagos (Stripe, Mercado Pago, etc.) antes de poder vender en linea.

## Deploy en Vercel

La forma mas facil de desplegar es conectar el repositorio de GitHub en [Vercel](https://vercel.com/new). Cada push a `main` genera un nuevo deploy automaticamente.

# Security

## Testing performed

- run without `curl -sD -`. <- This part is extra

| Stage                   | Command                                                                                                           | Result                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Dev headers             | `npm run dev` + `curl -sD -`                                                                                      | Confirmed `Content-Security-Policy-Report-Only` present with `'unsafe-eval'` and `ws://localhost:*` included                           |
| Enforced headers        | `npm run build && npm run start` + `curl -sD -`                                                                   | Confirmed `Content-Security-Policy` (enforced) present, no `'unsafe-eval'`, no `ws:`, `Strict-Transport-Security: max-age=300` present |
| Functional/visual check | Headless Chromium (Playwright) against `npm run start`, all 4 routes: `/`, `/portafolio`, `/tienda`, `/quien-soy` | Zero console errors/warnings on any route; screenshots confirm `next/image` fill-mode layout renders correctly under the enforced CSP  |

## Testing still needed (can't be done pre-merge)

- **Vercel Preview deployment**: push this branch, open the PR preview URL, and check the browser console for CSP violations there specifically — the local `npm run build && npm run start` rehearsal is a close approximation but not a byte-for-byte match of Vercel's actual runtime.
- **Production spot-check** after merge: `curl -sI https://<domain>` or a scanner (e.g. securityheaders.com) to confirm headers are actually served at the edge.

## Future work / follow-ups

- **Supabase integration**: add the project's REST/Realtime origin to `connect-src` (e.g. `https://<project-ref>.supabase.co`, `wss://<project-ref>.supabase.co`) — marked with a `TODO(supabase)` comment in the CSP.
- **Shopify integration**: add the Storefront API domain to `connect-src` (e.g. `https://<shop>.myshopify.com`) and `https://cdn.shopify.com` to `img-src` — marked with a `TODO(shopify)` comment.
  - If Shopify checkout ever uses the in-page Payment Request API (rather than redirecting to Shopify's own checkout domain), `Permissions-Policy: payment=()` will need to be relaxed to allow it.
- **Video embeds**: if a YouTube/Vimeo embed is ever added instead of self-hosted video, `frame-src` (iframe player) and `img-src` (thumbnails) will need those domains added — marked with a `TODO(embeds)` comment.
- **Cross-Origin-Resource-Policy**: currently `same-origin`, which blocks other sites from hotlinking the art directly. If a specific blog/partner wants to embed it later, CORP itself can't do per-domain allowlisting — that would need Referer-based access control added in `proxy.ts` (Next 16's renamed `middleware.ts`), scoped to that specific domain.
- **Nonce-based CSP**: currently using `'unsafe-inline'` for `script-src` since nothing renders user- or database-sourced content today. Revisit with a nonce-based CSP via `proxy.ts` once Supabase/Shopify render anything submitted by a user — that approach requires every page to opt into dynamic rendering (`await connection()`), so it's deliberately deferred until there's an actual injection surface to defend.
- **Trusted Types**: deferred for now — Next.js's own inline hydration scripts would likely need a named policy rather than `trusted-types 'none'`, and hasn't been tested.
- **Strict-Transport-Security max-age**: currently `300` (5 minutes) intentionally, while the site is still under active development. Raise to a longer value (e.g. a year, with `includeSubDomains`/`preload`) once this has run in production for a while without issues.
