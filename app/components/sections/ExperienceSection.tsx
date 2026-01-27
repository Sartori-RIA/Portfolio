import * as UI from "@/app/components/ui";

type ExperienceItem = {
  role: string;
  companyLink: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
};


function ExperienceCard({role, company, companyLink, period, location, bullets}: ExperienceItem) {
  return (
    <UI.Card>
      <UI.CardContent>
        <h3 className="text-xl font-semibold">{role}</h3>
        <p className="text-gray-400">
          <UI.Link href={companyLink} text={company}></UI.Link>{location ? ` · ${location}` : ""} · {period}
        </p>
        <ul className="mt-3 list-disc list-inside text-gray-300 space-y-1">
          {bullets.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </UI.CardContent>
    </UI.Card>
  );
}

export function ExperienceSection() {
  return (
    <UI.Section title="Professional Experience">
      <ExperienceCard
        role="Senior Backend Ruby Developer"
        companyLink={"https://www.linkedin.com/company/ballast-lane-applications/"}
        company="Ballast Lane Applications"
        location="Remote · USA"
        period="Sep 2024 – Present"
        bullets={[
          "Working on Tripleseat, a large-scale event and restaurant management platform",
          "Developing new features, improving performance, and maintaining complex integrations",
          "Applied prompt engineering and generative AI techniques to build reliable workflows that automated tasks, improved information retrieval, and accelerated development processes.",
          "Contributing to Inspect Point, a 10+ year multi-tenant legacy system",
          "Designing REST APIs, addressing technical debt, and improving system reliability",
        ]}
      />


      <ExperienceCard
        role="Senior Software Engineer"
        companyLink={"https://www.linkedin.com/company/fullstack-labs/"}
        company="FullStack Labs (NoFraud)"
        location="Remote · USA"
        period="Nov 2021 – Mar 2024"
        bullets={[
          "Worked on a high-volume e-commerce fraud detection platform",
          "Increased test coverage from 2% to over 40%",
          "Rebuilt merchant dashboards and reporting systems",
          "Rebuilt customer document upload workflows",
          "Improved security by integrating Brakeman and fixing vulnerabilities",
        ]}
      />

      <ExperienceCard
        role="Senior Software Engineer / Tech Lead"
        companyLink={"https://www.linkedin.com/company/twygoficial/"}
        company="Grupo EUAX"
        location="Remote · Brazil"
        period="Jun 2021 – Nov 2021"
        bullets={[
          "Led development of Twygo, a 10+ year online education platform",
          "Acted as Ruby on Rails specialist and technical reference",
          "Led a team of 4 developers",
          "Balanced feature delivery with refactoring and system stability",
        ]}
      />

      <ExperienceCard
        role="Senior Software Engineer (Ruby on Rails)"
        company="Grupo EUAX"
        companyLink={"https://www.linkedin.com/company/twygoficial/"}
        location="Remote · Brazil"
        period="Dec 2020 – Jun 2021"
        bullets={[
          "Developed and maintained features for the Twygo platform",
          "Assisted the team with product and technical questions",
          "Worked extensively with legacy codebases",
        ]}
      />

      <ExperienceCard
        companyLink={"https://www.linkedin.com/company/letscomvc/"}
        role="Fullstack Developer"
        company="Lets"
        location="Hybrid · Brazil"
        period="Apr 2019 – Nov 2020"
        bullets={[
          "Worked on multiple projects using Angular, Vue.js, Rails, and Node.js",
          "Developed SPAs and backend APIs",
          "Participated in mobile projects using Flutter, NativeScript, and Kotlin",
        ]}
      />

      <ExperienceCard
        role="Android Developer"
        companyLink={"https://www.linkedin.com/company/stapemusic/"}
        company="Stape Music"
        location="Remote"
        period="Sep 2018 – Apr 2019"
        bullets={[
          "Developed new features and fixed bugs for a music streaming app",
          "App fully developed in Kotlin",
          "Supported monetization workflows for musicians",
        ]}
      />

      <ExperienceCard
        role="Fullstack Developer"
        companyLink={"https://www.linkedin.com/company/teorema-sistemas/"}
        company="Teorema Sistemas"
        location="Guarapuava · Brazil"
        period="Jun 2017 – Sep 2018"
        bullets={[
          "Worked on an ERP system using Spring Boot, Angular, and Kotlin",
          "Designed and implemented REST APIs",
          "Rewrote backend from JEE to Spring Boot and Kotlin",
          "Reduced offline sync time from ~4 hours to 10–15 minutes",
        ]}
      />
    </UI.Section>
  )
}