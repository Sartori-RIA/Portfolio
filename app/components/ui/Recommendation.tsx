import * as UI from "@/app/components/ui";
import {ReactNode} from "react";

type RecommendationsProps = {
  linkedin: string
  name: string
  image: string
  children: ReactNode
}

export function RecommendationCard({children, linkedin, name, image}: RecommendationsProps) {
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
              <a href={linkedin} target="_blank">{name}</a>
            </p>

          </div>
        </div>
      </UI.CardContent>
    </UI.Card>
  )
}