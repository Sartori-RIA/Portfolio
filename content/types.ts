export type Profile = {
  name: string;
  title: string;
  bio: string;
  avatar: { src: string; alt: string };
  links: {
    linkedin: string;
    github: string;
  };
};

export type ExperienceEngagement = {
  name: string;
  bullets: string[];
  achievements?: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  companyLink: string;
  period: string;
  location?: string;
  summary?: string;
  bullets?: string[];
  achievements?: string[];
  engagements?: ExperienceEngagement[];
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
};

export type ProjectItem = {
  name: string;
  href: string;
  description: string;
  techs: string[];
};

export type RecommendationItem = {
  name: string;
  company: string;
  linkedin: string;
  image: string;
  quote: string;
};

export type CertificationItem = {
  name: string;
  issuer: string;
  issued: string;
  credentialId?: string;
  credentialUrl?: string;
  description: string;
};

export type HowIWorkPrinciple = {
  title: string;
  description: string;
};

export type ArticleFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
};

export type Article = ArticleFrontmatter & {
  slug: string;
  content: string;
};
