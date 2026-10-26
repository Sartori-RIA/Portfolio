import type {HowIWorkPrinciple} from "./types";

export const howIWorkIntro =
  "Principles I follow when building software — shaped by nearly a decade of shipping production systems " +
  "for international teams.";

export const howIWorkPrinciples: HowIWorkPrinciple[] = [
  {
    title: "Document important decisions",
    description:
      "Decisions and gotchas live in a knowledge base and the plan, not in someone's head. If a correction will matter again, it gets written down.",
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
      "I set the outcome and the boundaries, then use agents to draft, explore, and take the repetitive pass. Nothing customer-facing or irreversible goes out without my review.",
  },
  {
    title: "Measure before optimizing",
    description:
      "Profiling, metrics, and benchmarks come first. I fix bottlenecks backed by data, not assumptions.",
  },
  {
    title: "Focus on business outcomes",
    description:
      "I track the user-visible result and keep the change list in the plan. The work earns its place by moving reliability, cost, or the product.",
  },
  {
    title: "Verify the real artifact",
    description:
      "A green test suite is not proof the change works. I check the surface that ships: the page in a browser, the live HTTP response, or the generated file.",
  },
  {
    title: "Corrections become rules",
    description:
      "When a mistake shows up again, I write the rule and the reason. The next session starts from that rule, not from memory.",
  },
];
