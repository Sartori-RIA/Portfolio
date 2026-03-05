import * as UI from "@/app/components/ui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrophy} from "@fortawesome/free-solid-svg-icons";

type ExperienceItem = {
  role: string;
  companyLink: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
  achievements?: string[];
};

function Achievements({achievements}: { achievements: string[] }) {
  return (
    <div className="mt-6 border-t border-zinc-800 pt-4">
      <div className="flex items-center gap-2 mb-3">
        <i className="fa-solid fa-trophy text-amber-400"></i>
        <h4 className=" font-semibold text-zinc-200">
          Key Achievements
        </h4>
      </div>

      <ul className="mt-3 list-disc list-inside text-gray-300 space-y-1">
        {achievements.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-zinc-300"
          >
            <FontAwesomeIcon icon={faTrophy} />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}


function ExperienceCard({role, company, companyLink, period, location, bullets, achievements}: ExperienceItem) {
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
        {achievements && <Achievements achievements={ achievements } />}
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
          "Working on TripleSeat, a large-scale event and restaurant management platform",
          "Developing new features, improving performance, and maintaining complex integrations",
          "Applied prompt engineering and generative AI techniques to build reliable workflows that automated tasks, improved information retrieval, and accelerated development processes.",
          "Contributing to Inspect Point, a 10+ year multi-tenant legacy system",
          "Designing REST APIs, addressing technical debt, and improving system reliability",
        ]}
        achievements={[
          "At TripleSeat - Redesign the prompts from >4k Lines to ~450 lines, following Prompt Modular Architecture, reducing company cost with Gemini in 60% with better results",
          "At TripleSeat - Redesign the duplication detection service, improving the system reliability and performance from between 4 minutes to more than 20 resulting in timeout, to between 1 to 4 minutes",
          "At InspectPoint - Created the CI giving the team the possibility to create RSpecs, before no one in the team was able to do it, and directly responsible to increase the coverage to more than 50%",
          "At InspectPoint - Responsible for the backend APIs, making the integrations for internal systems and third-party",
          "At InspectPoint - Several performance and security issues fixed like: N+1, find_each, MassAssigment, SqlInjection"
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
          "Rebuilt merchant dashboards and reporting systems",
          "Rebuilt customer document upload workflows",
          "Improved security by integrating Brakeman and fixing vulnerabilities",
        ]}
        achievements={[
          "Responsible for recreate the Dashboard",
          "Increased test coverage from 2% to over 40%",
          "Made de integrations with several Third-part platforms like BigCommerce, AdobeCommerce",
          "Several performance and security issues fixed like: N+1, find_each, MassAssigment, SqlInjection"
        ]}
      />

      <ExperienceCard
        role="Senior Software Engineer / Tech Lead"
        companyLink={"https://www.linkedin.com/company/twygoficial/"}
        company="Grupo EUAX"
        location="Remote · Brazil"
        period="Dec 2020 – Nov 2021"
        bullets={[
          "Led development of Twygo, a 10+ year online education platform",
          "Acted as Ruby on Rails specialist and technical reference",
          "Led a team of 4 developers",
          "Balanced feature delivery with refactoring and system stability",
          "Developed and maintained features for the Twygo platform",
          "Assisted the team with product and technical questions",
          "Worked extensively with legacy codebases",
        ]}
        achievements={[
          "Several performance and security issues fixed like N+1, find_each, MassAssigment, SqlInjection",
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
        achievements={[
          "Delivered several projects for Startups, NGOs, factories and many other category of companies"
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
          "Rewrote mobile app from Java with no patterns to Kotlin, MVVM, Retrofit and Realm",
        ]}
        achievements={[
          "Improved several performance issues like N+1 in the entire system",
          "Reduced offline sync time from ~4 hours to 10–15 minutes"
        ]}
      />
    </UI.Section>
  )
}