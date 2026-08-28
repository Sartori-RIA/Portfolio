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
  // Restore after the repo is public on github.com/Sartori-RIA.
  // Do not link juntos-family.com while Railway is down.
  // {
  //   name: "Juntos Family",
  //   href: "https://github.com/Sartori-RIA/juntos-family",
  //   description:
  //     "Rails 8 app I designed and operate: private events, RSVP, wishlists, and Secret Santa. " +
  //     "Devise/Argon2, CanCanCan, Solid Queue, i18n (pt-BR/en/es), RSpec with ~95% line coverage.",
  //   techs: ["Ruby on Rails", "PostgreSQL", "Hotwire", "Solid Queue", "RSpec"],
  // },
];
