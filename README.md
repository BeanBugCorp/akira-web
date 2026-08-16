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

| Seccion    | Pagina                | Contenido               |
| ---------- | ---------------------- | ------------------------ |
| Landing    | `app/page.tsx`          | `content/landing.json`    |
| Portafolio | `app/portafolio/`       | `content/portafolio.json` |
| Tienda     | `app/tienda/`           | `content/tienda.json`     |
| Quien soy  | `app/quien-soy/`        | `content/quien-soy.json`  |

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
