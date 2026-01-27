import * as SECTIONS from "@/app/components/sections";
import {ReactNode} from "react";

function FooterSection() {
  return (<footer className="pt-12 border-t border-gray-800 text-gray-500 text-sm">
    <p>Brazil · Open to remote opportunities</p>
  </footer>)
}

function Main({children}: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 px-6 py-16">
      <section className="max-w-5xl mx-auto space-y-20">
        {children}
      </section>
    </main>
  )
}

export default function Home() {
  return (
    <Main>
      <SECTIONS.HeaderSection/>

      <SECTIONS.ExperienceSection/>

      <SECTIONS.EducationsSection/>

      <SECTIONS.ProjectsSection/>

      <SECTIONS.RecommendationsSection/>

      <SECTIONS.SkillsSection/>

      <FooterSection/>
    </Main>
  )
    ;
}
