import {Section} from "@/app/components/ui";
import {ReactNode} from "react";


function Skill({skill}: { skill: string }) {
  return (<span key={skill} className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm">{skill}</span>)
}

function Title({children}: { children: ReactNode }) {
  return (<h3 className="mb-3 text-lg font-semibold text-gray-200">{children}</h3>)
}

export function SkillsSection() {
  const backend = ["Ruby on Rails", "Sidekiq", "REST APIs", "PostgreSQL", "MySQL", "Docker", "Multi-tenant Systems"]
  const frontend = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Angular", "NgRX", "Angular Material", "Vue", "Vuex", "Vuetify"]
  const testing = ["RSpec", "Test Coverage", "Brakeman", "CI/CD"]
  const architecture = ["Legacy Systems", "Refactoring", "Scalability", "Mentorship", "Code Reviews", "AI Integrations"]

  return (<Section title="Core Skills">
    <div className="space-y-8">
      <div>
        <Title>Backend</Title>
        <div className="flex flex-wrap gap-3">
          {backend.map((skill) => (
            <Skill key={skill} skill={skill}/>
          ))}
        </div>
      </div>

      <div>
        <Title>Frontend</Title>
        <div className="flex flex-wrap gap-3">
          {frontend.map((skill) => (
            <Skill skill={skill} key={skill}/>
          ))}
        </div>
      </div>

      <div>
        <Title>Testing & Quality</Title>
        <div className="flex flex-wrap gap-3">
          {testing.map((skill) => (
            <Skill skill={skill} key={skill}/>
          ))}
        </div>
      </div>

      <div>
        <Title>Architecture & Practices</Title>
        <div className="flex flex-wrap gap-3">
          {architecture.map((skill) => (
            <Skill skill={skill} key={skill}/>
          ))}
        </div>
      </div>
    </div>
  </Section>)
}