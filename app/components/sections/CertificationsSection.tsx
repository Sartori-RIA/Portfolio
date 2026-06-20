import * as UI from "@/app/components/ui";
import {certifications} from "@/content/certifications";

export function CertificationsSection() {
  return (
    <UI.Section title="Certifications">
      {certifications.map((cert) => (
        <UI.Card key={cert.name}>
          <UI.CardContent>
            <h3 className="text-lg font-semibold text-gray-100">{cert.name}</h3>
            <p className="text-gray-400 text-sm">
              {cert.issuer} · {cert.issued}
            </p>
            <p className="text-gray-300">{cert.description}</p>
            {cert.credentialUrl && (
              <p className="text-sm">
                <UI.Link href={cert.credentialUrl} text="View certification"/>
              </p>
            )}
          </UI.CardContent>
        </UI.Card>
      ))}
    </UI.Section>
  );
}
