import * as UI from "@/app/components/ui";
import {Logo} from "@/app/components/ui/Logo";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Logo Concepts",
  description: "CookieCode logo concept comparison — refined, terminal, and monogram variants.",
  robots: {index: false, follow: false},
};

const concepts = [
  {
    id: "a",
    name: "A — Refined",
    tagline: "Cookie + code tags. Clean evolution of the current logo.",
    src: "/concepts/logo-a-refined.svg",
    active: true,
    pros: ["Memorable and on-brand", "Readable at small sizes (simplified chips)", "Balances playful + professional"],
  },
  {
    id: "b",
    name: "B — Terminal",
    tagline: "Cookie with a terminal prompt. More backend-engineer vibe.",
    src: "/concepts/logo-b-terminal.svg",
    active: false,
    pros: ["Signals CLI / backend work", "Distinctive cursor animation", "Less literal, more senior"],
  },
  {
    id: "c",
    name: "C — Monogram",
    tagline: "Double-C from overlapping cookie bites. More corporate mark.",
    src: "/concepts/logo-c-monogram.svg",
    active: false,
    pros: ["Strong brand mark at any size", "Works without the cookie literal", "Good for favicon + watermark"],
  },
];

export default function LogoConceptsPage() {
  return (
    <UI.PageShell>
      <header className="space-y-3">
        <h1 className="text-4xl font-bold">Logo Concepts</h1>
        <p className="text-gray-400 max-w-2xl">
          Three directions for the CookieCode mark. Concept A is live in the nav and favicon.
          Pick your favorite and I can swap the active logo.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        {concepts.map((concept) => (
          <UI.Card key={concept.id}>
            <UI.CardContent>
              <div className="flex flex-col items-center gap-6 py-4">
                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 w-full flex justify-center">
                  <Logo size={96} showWordmark={false} src={concept.src}/>
                </div>
                <div className="w-full space-y-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">{concept.name}</h2>
                    {concept.active && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{concept.tagline}</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {concept.pros.map((pro) => (
                      <li key={pro}>· {pro}</li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-gray-800">
                    <Logo size={24} src={concept.src}/>
                  </div>
                </div>
              </div>
            </UI.CardContent>
          </UI.Card>
        ))}
      </div>

      <UI.Footer/>
    </UI.PageShell>
  );
}
