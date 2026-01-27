import {Section} from "@/app/components/ui";
import {ReactNode} from "react";


function Skill({skill}: { skill: string }) {
  return (<span key={skill} className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm">{skill}</span>)
}

function Title({children}: { children: ReactNode }) {
  return (<h3 className="mb-3 text-lg font-semibold text-gray-200">{children}</h3>)
}

function SkillCard({skills, title}: { skills: string[], title: string }) {
  return (<div>
    <Title>{title}</Title>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill) => (
        <Skill skill={skill} key={skill}/>
      ))}
    </div>
  </div>)
}

export function SkillsSection() {
  const backend = ["Ruby on Rails", "Sidekiq", "REST APIs", "PostgreSQL", "MySQL", "Docker", "Multi-tenant Systems", "Java", "Kotlin", "Spring Boot", "NodeJS"]
  const frontend = ["React","Redux", "Next.js", "TypeScript", "Tailwind CSS", "Angular", "NgRx", "Angular Material", "Vue", "Vuex", "Vuetify", "JQuery", "RxJS"]
  const testing = ["RSpec", "Test Coverage", "Brakeman", "CI/CD", "Rubocop", "Simplecov"]
  const architecture = ["Legacy Systems", "Refactoring", "Scalability", "Mentorship", "Code Reviews", "AI Integrations"]
  const mobile = ["Android(Java and Kotlin)", "Flutter", "Ionic", "NativeScript"]

  return (<Section title="Core Skills">
    <div className="space-y-8">
      <SkillCard skills={backend} title={"Backend"}/>
      <SkillCard skills={frontend} title={"Frontend"}/>
      <SkillCard skills={mobile} title={"Mobile"}/>
      <SkillCard skills={testing} title={"Testing & Quality"}/>
      <SkillCard skills={architecture} title={"Architecture & Practices"}/>
    </div>
  </Section>)
}