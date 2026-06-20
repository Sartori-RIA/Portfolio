import * as UI from "@/app/components/ui";
import {education} from "@/content/education";

export function EducationsSection() {
  return (
    <UI.Section title="Education">
      {education.map((item) => (
        <UI.Card key={item.degree}>
          <UI.CardContent>
            <h3 className="font-semibold">{item.degree}</h3>
            <p className="text-gray-400">{item.institution} · {item.period}</p>
          </UI.CardContent>
        </UI.Card>
      ))}
    </UI.Section>
  );
}
