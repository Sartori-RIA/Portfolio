import Image from "next/image";
import Link from "next/link";
import {site} from "@/content/profile";

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  src?: string;
};

export function Logo({size = 28, showWordmark = true, src = "/logo.svg"}: LogoProps) {
  const icon = (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className="shrink-0"
      aria-hidden
    />
  );

  if (!showWordmark) {
    return icon;
  }

  return (
    <span className="inline-flex items-center gap-2.5">
      {icon}
      <span className="text-sm font-medium tracking-tight">
        <span className="text-gray-200">cookie</span>
        <span className="font-mono text-amber-400">code</span>
      </span>
    </span>
  );
}

export function LogoLink({size = 28}: { size?: number }) {
  return (
    <Link
      href="/"
      className="hover:opacity-90 transition"
      title={site.logoTitle}
      aria-label="CookieCode, Lucas Sartori's personal site"
    >
      <Logo size={size}/>
    </Link>
  );
}
