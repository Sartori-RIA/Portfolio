import * as UI from "@/app/components/ui";
import {experience} from "@/content/experience";
import type {ExperienceEngagement, ExperienceItem} from "@/content/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrophy} from "@fortawesome/free-solid-svg-icons";

function BulletList({items}: { items: string[] }) {
  return (
    <ul className="mt-3 list-disc list-inside text-gray-300 space-y-1">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

function Achievements({achievements}: { achievements: string[] }) {
  return (
    <div className="mt-6 border-t border-zinc-800 pt-4">
      <div className="flex items-center gap-2 mb-3">
        <FontAwesomeIcon icon={faTrophy} className="text-amber-400"/>
        <h4 className="font-semibold text-zinc-200">Key Achievements</h4>
      </div>
      <ul className="mt-3 space-y-2">
        {achievements.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-zinc-300">
            <FontAwesomeIcon icon={faTrophy} className="mt-1 text-amber-400/70 text-xs shrink-0"/>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Engagement({name, bullets, achievements}: ExperienceEngagement) {
  return (
    <div className="mt-5 border-t border-zinc-800/60 pt-4 first:mt-0 first:border-t-0 first:pt-0">
      <h4 className="font-medium text-amber-400/90">{name}</h4>
      <BulletList items={bullets}/>
      {achievements && <Achievements achievements={achievements}/>}
    </div>
  );
}

function ExperienceCard({
  role,
  company,
  companyLink,
  period,
  location,
  summary,
  bullets,
  achievements,
  engagements,
}: ExperienceItem) {
  return (
    <UI.Card>
      <UI.CardContent>
        <h3 className="text-xl font-semibold">{role}</h3>
        <p className="text-gray-400">
          <UI.Link href={companyLink} text={company}/>
          {location ? ` · ${location}` : ""} · {period}
        </p>
        {summary && <p className="mt-2 text-gray-300 text-sm leading-relaxed">{summary}</p>}
        {engagements
          ? engagements.map((engagement) => (
            <Engagement key={engagement.name} {...engagement} />
          ))
          : bullets && <BulletList items={bullets}/>}
        {!engagements && achievements && <Achievements achievements={achievements}/>}
      </UI.CardContent>
    </UI.Card>
  );
}

export function ExperienceSection() {
  return (
    <UI.Section title="Professional Experience">
      {experience.map((item) => (
        <ExperienceCard key={`${item.company}-${item.period}`} {...item} />
      ))}
    </UI.Section>
  );
}
