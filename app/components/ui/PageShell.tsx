import {ReactNode} from "react";
import {site} from "@/content/profile";

export function PageShell({children}: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-20">
        {children}
      </div>
    </main>
  );
}

export function Footer() {
  return (
    <footer className="pt-12 border-t border-gray-800 text-gray-500 text-sm">
      <p>{site.footer}</p>
    </footer>
  );
}
