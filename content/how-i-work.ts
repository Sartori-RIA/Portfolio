import type {HowIWorkPrinciple} from "./types";

export const howIWorkIntro =
  "Principles I follow when building software — shaped by nearly a decade of shipping production systems " +
  "for international teams.";

export const howIWorkPrinciples: HowIWorkPrinciple[] = [
  {
    title: "Document important decisions",
    description:
      "I write ADRs for architectural choices that affect the team long-term. Clear context beats tribal knowledge.",
  },
  {
    title: "Prefer simple architectures",
    description:
      "The best system is the one the team can understand and evolve. I avoid unnecessary layers and premature abstraction.",
  },
  {
    title: "Optimize for maintainability",
    description:
      "Readable code, consistent patterns, and solid test coverage matter more than clever one-liners.",
  },
  {
    title: "Use AI to accelerate delivery",
    description:
      "I leverage AI agents and prompt engineering to automate repetitive work, explore solutions faster, and ship with confidence — always with human review.",
  },
  {
    title: "Measure before optimizing",
    description:
      "Profiling, metrics, and benchmarks come first. I fix bottlenecks backed by data, not assumptions.",
  },
  {
    title: "Focus on business outcomes",
    description:
      "Technical excellence serves the product. I prioritize work that moves revenue, reliability, or user experience forward.",
  },
];
