import * as SECTIONS from "@/app/components/sections";
import {Footer, PageShell} from "@/app/components/ui";

export default function Home() {
  return (
    <PageShell>
      <SECTIONS.HeaderSection/>
      <SECTIONS.ExperienceSection/>
      <SECTIONS.ProjectsSection/>
      <SECTIONS.SkillsSection/>
      <SECTIONS.RecommendationsSection/>
      <SECTIONS.EducationsSection/>
      <SECTIONS.CertificationsSection/>
      <Footer/>
    </PageShell>
  );
}
