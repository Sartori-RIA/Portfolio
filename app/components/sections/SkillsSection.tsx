import {Section} from "@/app/components/ui";
import {skills} from "@/content/skills";

function Skill({skill, muted = false}: { skill: string; muted?: boolean }) {
  return (
    <span
      className={`px-4 py-2 rounded-full text-sm ${
        muted
          ? "bg-gray-900 text-gray-500 border border-gray-800"
          : "bg-gray-800 text-gray-300"
      }`}
    >
      {skill}
    </span>
  );
}

export function SkillsSection() {
  const primaryGroups = skills.groups.slice(0, -1);
  const alsoGroup = skills.groups.at(-1);

  return (
    <Section title="Core Skills">
      <div className="space-y-8">
        {primaryGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-lg font-semibold text-gray-200">{group.title}</h3>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <Skill skill={skill} key={skill}/>
              ))}
            </div>
          </div>
        ))}
        {alsoGroup && (
          <div>
            <h3 className="mb-3 text-lg font-semibold text-gray-400">{alsoGroup.title}</h3>
            <div className="flex flex-wrap gap-3">
              {alsoGroup.skills.map((skill) => (
                <Skill skill={skill} key={skill} muted/>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
