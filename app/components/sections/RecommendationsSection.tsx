import * as UI from "@/app/components/ui";
import {recommendations} from "@/content/recommendations";

export function RecommendationsSection() {
  return (
    <UI.Section title="Recommendations">
      {recommendations.map((rec) => (
        <UI.Card key={rec.name}>
          <UI.CardContent>
            <div className="flex items-start gap-4">
              <UI.Avatar src={rec.image} alt={rec.name} size={64}/>
              <div>
                <p className="italic text-gray-300">&ldquo;{rec.quote}&rdquo;</p>
                <p className="mt-2 text-sm text-gray-400">
                  —{" "}
                  <a
                    href={rec.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-200 transition"
                  >
                    {rec.name} ({rec.company})
                  </a>
                </p>
              </div>
            </div>
          </UI.CardContent>
        </UI.Card>
      ))}
    </UI.Section>
  );
}
