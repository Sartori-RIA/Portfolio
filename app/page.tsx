import * as SECTIONS from "@/app/components/sections";
import {Footer, PageShell} from "@/app/components/ui";

export default function Home() {
  return (
    <PageShell>
      <SECTIONS.HeaderSection/>
      <SECTIONS.ExperienceSection/>
      <SECTIONS.EducationsSection/>
      <SECTIONS.CertificationsSection/>
      <SECTIONS.ProjectsSection/>
      <SECTIONS.RecommendationsSection/>
      <SECTIONS.SkillsSection/>
      <Footer/>
    </PageShell>
  );
}
