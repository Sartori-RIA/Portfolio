import {Section} from "@/app/components/ui";

export function SkillsSection() {
  return (<Section title="Core Skills">
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-200">Backend</h3>
        <div className="flex flex-wrap gap-3">
          {["Ruby on Rails", "Sidekiq", "REST APIs", "PostgreSQL", "MySQL", "Docker", "Multi-tenant Systems"].map((skill) => (
            <span key={skill} className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm">{skill}</span>
          ))}
        </div>
      </div>


      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-200">Frontend</h3>
        <div className="flex flex-wrap gap-3">
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "Angular"].map((skill) => (
            <span key={skill} className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm">{skill}</span>
          ))}
        </div>
      </div>


      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-200">Testing & Quality</h3>
        <div className="flex flex-wrap gap-3">
          {["RSpec", "Test Coverage", "Brakeman", "CI/CD"].map((skill) => (
            <span key={skill} className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm">{skill}</span>
          ))}
        </div>
      </div>


      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-200">Architecture & Practices</h3>
        <div className="flex flex-wrap gap-3">
          {["Legacy Systems", "Refactoring", "Scalability", "Mentorship", "Code Reviews", "AI Integrations"].map((skill) => (
            <span key={skill} className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  </Section>)
}