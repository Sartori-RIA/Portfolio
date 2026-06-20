import {profile, site} from "@/content/profile";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: site.url,
    image: `${site.url}${profile.avatar.src}`,
    jobTitle: "Senior Backend Engineer",
    description: site.description,
    sameAs: [profile.links.linkedin, profile.links.github],
    knowsAbout: [
      "Ruby on Rails",
      "PostgreSQL",
      "AWS",
      "REST APIs",
      "Performance Engineering",
      "AI Integrations",
      "Azure AI",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  );
}
