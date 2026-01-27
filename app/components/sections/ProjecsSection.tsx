import * as UI from "@/app/components/ui";

export function ProjectsSection() {
  return (<UI.Section title="Side Projects">
    <UI.Card>
      <UI.CardContent>
        <h3 className="text-lg font-semibold">
          <UI.Link href={"https://github.com/Sartori-RIA/ubuteco_api"} text={"uButeco"}/>
        </h3>
        <p className="text-gray-300">
          Open-source platform to manage restaurant orders, inventory, and kitchen panels,
          featuring real-time updates, role-based access, and customizable UI.
        </p>
        <UI.TechsList
          techs={["Ruby on Rails", "PostgreSQL", "Angular", "Angular Material", "NgRX", "JWT", "REST APIs"]}/>
      </UI.CardContent>
    </UI.Card>

    <UI.Card>
      <UI.CardContent>
        <h3 className="text-lg font-semibold">
          <UI.Link href={"https://icos-site.vercel.app/"} text={"ICOS"}/>
        </h3>
        <p className="text-gray-300">
          NGO project to help the community with free, quality dental care.
        </p>
        <UI.TechsList techs={["React", "NextJS", "TypeScript"]}/>
      </UI.CardContent>
    </UI.Card>
  </UI.Section>)
}