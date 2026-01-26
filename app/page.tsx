import * as UI from "@/app/components/ui";
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

      {/* Education */}
      <UI.Section title="Education">
        <UI.Card>
          <UI.CardContent>
            <h3 className="font-semibold">Specialization in Mobile Web Application Development</h3>
            <p className="text-gray-400">UniGuairacá Centro Universitário · 2019 – 2021</p>
          </UI.CardContent>
        </UI.Card>

        <UI.Card>
          <UI.CardContent>
            <h3 className="font-semibold">Bachelor in Internet Systems Technology</h3>
            <p className="text-gray-400">Federal University of Technology · 2014 – 2019</p>
          </UI.CardContent>
        </UI.Card>
      </UI.Section>

      {/* Projects */}
      <UI.Section title="Side Projects">
        <UI.Card>
          <UI.CardContent>
            <h3 className="text-lg font-semibold">uButeco</h3>
            <p className="text-gray-300">
              Open-source platform to manage restaurant orders, inventory, and kitchen panels,
              featuring real-time updates, role-based access, and customizable UI.
            </p>
            <p className="text-sm text-gray-400">Ruby on Rails · PostgreSQL · Angular · REST APIs</p>
          </UI.CardContent>
        </UI.Card>
      </UI.Section>

      <UI.Section title="Recommendations">
        <UI.RecommendationCard
          image={"/images/vladimir.png"}
          name={"Vladimir Stupavsky"}
          linkedin={"https://www.linkedin.com/in/vladimir-stupavsky-203ab26a/"}>
          Lucas is a strong developer, hardworking, and a great collaborator. He consistently
          goes the extra mile to deliver quality work.
        </UI.RecommendationCard>

        <UI.RecommendationCard
          image={"/images/yoav.png"}
          name={"Yoav Nativ"}
          linkedin={"https://www.linkedin.com/in/yoav-nativ/"}
        >
          Lucas is not only a competent Ruby developer, but also brings positivity and energy to
          the team. A pleasure to work with.
        </UI.RecommendationCard>
        <UI.RecommendationCard
          image={"/images/demetrio.png"}
          name={"Demetrio Guilardi"}
          linkedin={"https://www.linkedin.com/in/demetrioguilardi/"}>
          Extremely committed, he always gives his best and has a great desire to learn. He's the kind of person who's
          truly dedicated; we can always count on him for anything.
        </UI.RecommendationCard>
      </UI.Section>

      <SECTIONS.SkillsSection/>

      <FooterSection/>
    </Main>
  );
}
