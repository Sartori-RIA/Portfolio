import * as UI from "@/app/components/ui";
import {projects} from "@/content/projects";

export function ProjectsSection() {
  return (
    <UI.Section title="Side Projects">
      {projects.map((project) => (
        <UI.Card key={project.name}>
          <UI.CardContent>
            <h3 className="text-lg font-semibold">
              <UI.Link href={project.href} text={project.name}/>
            </h3>
            <p className="text-gray-300">{project.description}</p>
            <UI.TechsList techs={project.techs}/>
          </UI.CardContent>
        </UI.Card>
      ))}
    </UI.Section>
  );
}
