import * as UI from "@/app/components/ui";
import {howILeadIntro, howILeadPrinciples} from "@/content/how-i-lead";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "How I Lead",
  description:
    "How Lucas Sartori leads engineers: individual guidance, open source practice, pair programming, tech talks, automated tests, AI, and team code review. Shaped by leading a team at Grupo EUAX.",
  alternates: {
    canonical: "/how-i-lead",
  },
};

export default function HowILeadPage() {
  return (
    <UI.PageShell>
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">How I Lead</h1>
        <p className="max-w-3xl text-gray-300 leading-relaxed text-lg">{howILeadIntro}</p>
      </header>

      <section className="space-y-6">
        <ol className="space-y-6">
          {howILeadPrinciples.map((principle, index) => (
            <li key={principle.title}>
              <UI.Card>
                <UI.CardContent>
                  <div className="flex gap-4">
                    <span className="text-2xl font-bold text-gray-600 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-gray-100">{principle.title}</h2>
                      <p className="text-gray-300 leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                </UI.CardContent>
              </UI.Card>
            </li>
          ))}
        </ol>
      </section>

      <UI.Footer/>
    </UI.PageShell>
  );
}
