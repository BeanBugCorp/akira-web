// components/Navbar.tsx
import Link from "next/link";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/quien-soy", label: "Quien soy" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-black">
        <Link href="/" className="text-lg font-bold tracking-wide">
          AKIRA
        </Link>
        <ul className="flex gap-6 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:opacity-60">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
