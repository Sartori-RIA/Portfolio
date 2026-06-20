import {LogoLink} from "@/app/components/ui/Logo";
import {isBlogEnabled} from "@/lib/features";
import Link from "next/link";

const navLinks = [
  {href: "/", label: "Portfolio"},
  {href: "/blog", label: "Articles", feature: "blog" as const},
  {href: "/how-i-work", label: "How I Work"},
];

export function SiteNav() {
  const links = navLinks.filter(
    (link) => link.feature !== "blog" || isBlogEnabled(),
  );

  return (
    <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <LogoLink size={60}/>
        <ul className="flex gap-6 text-sm">
          {links.map(({href, label}) => (
            <li key={href}>
              <Link
                href={href}
                className="text-gray-400 hover:text-gray-100 transition"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
