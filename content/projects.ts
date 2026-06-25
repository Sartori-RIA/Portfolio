import type {ProjectItem} from "./types";

export const projects: ProjectItem[] = [
  {
    name: "uButeco",
    href: "https://github.com/Sartori-RIA/ubuteco_api",
    description:
      "Open-source platform to manage restaurant orders, inventory, and kitchen panels, " +
      "featuring real-time updates, role-based access, and customizable UI.",
    techs: [
      "Ruby on Rails", "PostgreSQL", "SideKiq", "SearchKick", "OpenSearch", "AnyCable", "Argon2",
      "React", "NextJS", "TailwindCSS", "Redux",
      "Angular", "Angular Material", "NgRX", "JWT", "REST APIs"
    ],
  },
  {
    name: "ICOS",
    href: "https://icos-site.vercel.app/",
    description: "NGO project to help the community with free, quality dental care.",
    techs: ["React", "NextJS", "TypeScript"],
  },
  {
    name: "Juntos Family",
    href: "https://juntos-family.com",
    description: "Celebrate together, even from afar. Invites, wishlists, and Secret Santa — simple, beautiful, and built for your phone.",
    techs: ["Ruby on Rails", "PostgreSQL", "TailwindCSS"],
  }
];
