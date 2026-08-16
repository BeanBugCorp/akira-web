// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-8 text-sm text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 text-center">
        <p>© {new Date().getFullYear()} Akira. Todos los derechos reservados.</p>
        <nav className="flex gap-4">
          <Link href="/" className="hover:opacity-60">
            Inicio
          </Link>
          <Link href="/portafolio" className="hover:opacity-60">
            Portafolio
          </Link>
          <Link href="/tienda" className="hover:opacity-60">
            Tienda
          </Link>
          <Link href="/quien-soy" className="hover:opacity-60">
            Quien soy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
