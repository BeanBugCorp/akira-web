import type { NextConfig } from "next";

// `next dev` sets NODE_ENV=development; `next build`/`next start` set it to
// "production" both locally and on Vercel (Preview and Production alike), so
// this is the dev-vs-everything-else switch, not a preview-vs-prod one.
const isDev = process.env.NODE_ENV === "development";

// 'unsafe-inline' is required for both script-src and style-src regardless of
// environment, as a Next.js App Router framework requirement rather than
// something this config introduces:
//   - script-src: Next injects inline <script> tags on every page to stream
//     RSC payloads and hydrate React (self.__next_f.push(...)). No content
//     here is user- or database-sourced today, so this is low-risk; revisit
//     with nonces (proxy.ts, forces dynamic rendering on every page) once
//     Supabase/Shopify render anything submitted by a user.
//   - style-src: components/Media.tsx uses next/image with `fill`, which
//     always emits inline positioning styles (position/inset/etc.), not just
//     the objectFit the component sets explicitly.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'", // next/font self-hosts Geist at build time, no Google Fonts request needed
  `connect-src 'self'${isDev ? " ws://localhost:*" : ""}`, // ws: for Fast Refresh/HMR
  // TODO(supabase): add "https://<project-ref>.supabase.co" and
  //   "wss://<project-ref>.supabase.co" to connect-src once connected.
  // TODO(shopify): add "https://<shop>.myshopify.com" to connect-src, and
  //   "https://cdn.shopify.com" to img-src, once connected.
  // TODO(embeds): if a YouTube/Vimeo embed is ever added, add its iframe
  //   player origin to frame-src and its thumbnail CDN to img-src.
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const sharedHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  // Blocks other sites from hotlinking images/videos directly from this
  // domain. Revisit with Referer-based access control in proxy.ts if a
  // specific blog/partner ever wants to embed this art — CORP itself has no
  // per-domain allowlist, only same-origin/same-site/cross-origin.
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // "-allow-popups" so a future Supabase OAuth flow or Shopify checkout
  // popup keeps its window reference back to this page.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const devHeaders = [
  ...sharedHeaders,
  // Report-only: violations are logged to the console but nothing is
  // blocked, so this doubles as a live check of what the enforced tier
  // below would need before you ever run a build.
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

const enforcedHeaders = [
  ...sharedHeaders,
  { key: "Content-Security-Policy", value: csp },
  // Short max-age on purpose while still under active development — raise
  // once this has run in production for a while without issues.
  { key: "Strict-Transport-Security", value: "max-age=300" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: isDev ? devHeaders : enforcedHeaders,
      },
    ];
  },
};

export default nextConfig;
