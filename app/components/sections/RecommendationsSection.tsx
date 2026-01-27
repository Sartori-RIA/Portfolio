import * as UI from "@/app/components/ui";
import {ReactNode} from "react";

type RecommendationsProps = {
  linkedin: string
  name: string
  image: string
  company: string
  children: ReactNode
}

function RecommendationCard({children, linkedin, name, image, company}: RecommendationsProps) {
  return (
    <UI.Card>
      <UI.CardContent>
        <div className="flex items-start gap-4">
          <UI.Avatar src={image} alt={name}/>
          <div>
            <p className="italic text-gray-300">
              “{children}”
            </p>
            <p className="mt-2 text-sm text-gray-400">—
              <a href={linkedin} target="_blank">{name} ({company})</a>
            </p>
          </div>
        </div>
      </UI.CardContent>
    </UI.Card>
  )
}

export function RecommendationsSection() {
  return (<UI.Section title="Recommendations">
    <RecommendationCard
      company={"NoFraud"}
      image={"/images/vladimir.png"}
      name={"Vladimir Stupavsky"}
      linkedin={"https://www.linkedin.com/in/vladimir-stupavsky-203ab26a/"}>
      Lucas is a strong developer, hardworking, and a great collaborator. He consistently
      goes the extra mile to deliver quality work.
    </RecommendationCard>

    <RecommendationCard
      image={"/images/yoav.png"}
      company={"NoFraud"}
      name={"Yoav Nativ"}
      linkedin={"https://www.linkedin.com/in/yoav-nativ/"}
    >
      Lucas is not only a competent Ruby developer, but also brings positivity and energy to
      the team. A pleasure to work with.
    </RecommendationCard>
    <RecommendationCard
      company={"Stape Music"}
      image={"/images/demetrio.png"}
      name={"Demetrio Guilardi"}
      linkedin={"https://www.linkedin.com/in/demetrioguilardi/"}>
      Extremely committed, he always gives his best and has a great desire to learn. He&#39;s the kind of person who&#39;s
      truly dedicated; we can always count on him for anything.
    </RecommendationCard>
  </UI.Section>)
}