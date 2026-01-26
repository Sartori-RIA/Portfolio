import * as UI from "@/app/components/ui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";

export function HeaderSection() {
  return (<header className="space-y-5 flex flex-col md:flex-row md:items-center md:gap-8">
    <UI.Avatar src="/images/me.jpeg" alt="Lucas Sartori"/>
    <div className="space-y-5">
      <h1 className="text-4xl md:text-5xl font-bold">Lucas Antonio Ramos Sartori</h1>
      <p className="text-xl text-gray-400">Senior Software Engineer · Ruby on Rails · Remote · LATAM · Brazil</p>
      <p className="max-w-3xl text-gray-300 leading-relaxed">
        Senior Software Engineer with nearly 9 years of experience, focused on building, evolving,
        and scaling Ruby on Rails applications for U.S.-based and international companies. Strong
        background in legacy systems, multi-tenant architectures, APIs, AI-driven features, and
        long-term maintainability.
      </p>
      <div className="flex flex-wrap gap-4 pt-4">
        <UI.LinkButton href={"https://www.linkedin.com/in/lucas-antonio-ramos-sartori/"}>
          <FontAwesomeIcon icon={faLinkedin}/> LinkedIn
        </UI.LinkButton>
        <UI.LinkButton href={"https://github.com/Sartori-RIA"}>
          <FontAwesomeIcon icon={faGithub}/> GitHub
        </UI.LinkButton>
      </div>
    </div>
  </header>)
}