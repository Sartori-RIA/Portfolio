import type {ExperienceItem} from "./types";

export const experience: ExperienceItem[] = [
  {
    role: "Senior Backend Ruby Developer",
    company: "Ballast Lane Applications",
    companyLink: "https://www.linkedin.com/company/ballast-lane-applications/",
    location: "Remote · USA",
    period: "Sep 2024 – Present",
    summary:
      "Backend engineer across multiple client products — event-driven systems, legacy modernization, and AI-driven workflows.",
    engagements: [
      {
        name: "Syncro",
        bullets: [
          "Integrated business management platform for service providers.",
          "Built ElasticSearch + Karafka event-driven indexing pipeline, reducing database load and improving search performance.",
          "Implemented RSpec CI pipelines with 80%+ minimum coverage (most repos above 90%).",
        ],
      },
      {
        name: "TripleSeat",
        bullets: [
          "Large-scale event and restaurant management platform.",
          "Redesigned prompts from 4k+ lines to ~450 using modular architecture — 60% Gemini cost reduction with better results.",
          "Redesigned duplication detection service: timeouts dropped from 4–20+ min down to 1–4 min.",
          "Applied prompt engineering and generative AI for reliable automation workflows.",
        ],
      },
      {
        name: "Inspect Point",
        bullets: [
          "10+ year multi-tenant legacy system.",
          "Designed REST APIs and owned backend integrations (internal + third-party).",
          "Created team CI enabling RSpec adoption — coverage grew to 50%+.",
          "Fixed performance and security issues: N+1, mass assignment, SQL injection.",
        ],
      },
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "FullStack Labs (NoFraud)",
    companyLink: "https://www.linkedin.com/company/fullstack-labs/",
    location: "Remote · USA",
    period: "Nov 2021 – Mar 2024",
    bullets: [
      "High-volume e-commerce fraud detection platform.",
      "Rebuilt merchant dashboards, reporting systems, and document upload workflows.",
      "Integrated Brakeman and fixed security vulnerabilities.",
    ],
    achievements: [
      "Led dashboard rebuild.",
      "Increased test coverage from 2% to 40%+.",
      "Built integrations with BigCommerce and Adobe Commerce.",
      "Fixed N+1 queries, mass assignment, and SQL injection vulnerabilities.",
    ],
  },
  {
    role: "Senior Software Engineer / Tech Lead",
    company: "Grupo EUAX",
    companyLink: "https://www.linkedin.com/company/twygoficial/",
    location: "Remote · Brazil",
    period: "Dec 2020 – Nov 2021",
    bullets: [
      "Led development of Twygo, a 10+ year online education platform.",
      "Ruby on Rails specialist and technical reference for a team of 4.",
      "Balanced feature delivery with refactoring and legacy system stability.",
    ],
    achievements: [
      "Resolved N+1 queries, mass assignment, and SQL injection across the codebase.",
    ],
  },
  {
    role: "Fullstack Developer",
    company: "Lets",
    companyLink: "https://www.linkedin.com/company/letscomvc/",
    location: "Hybrid · Brazil",
    period: "Apr 2019 – Nov 2020",
    bullets: [
      "Delivered projects for startups, NGOs, and enterprises using Rails, Angular, Vue, and Node.js.",
      "Built SPAs, REST APIs, and mobile apps (Flutter, NativeScript, Kotlin).",
    ],
  },
  {
    role: "Android Developer",
    company: "Stape Music",
    companyLink: "https://www.linkedin.com/company/stapemusic/",
    location: "Remote",
    period: "Sep 2018 – Apr 2019",
    bullets: [
      "Kotlin music streaming app — features, bug fixes, and musician monetization workflows.",
    ],
  },
  {
    role: "Fullstack Developer",
    company: "Teorema Sistemas",
    companyLink: "https://www.linkedin.com/company/teorema-sistemas/",
    location: "Guarapuava · Brazil",
    period: "Jun 2017 – Sep 2018",
    bullets: [
      "ERP system with Spring Boot, Angular, and Kotlin.",
      "Rewrote backend from JEE to Spring Boot and mobile app from Java to Kotlin (MVVM, Retrofit, Realm).",
    ],
    achievements: [
      "Fixed N+1 performance issues across the system.",
      "Reduced offline sync time from ~4 hours to 10–15 minutes.",
    ],
  },
];
