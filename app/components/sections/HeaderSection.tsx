import * as UI from "@/app/components/ui";
import {profile} from "@/content/profile";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";

export function HeaderSection() {
  return (
    <header className="space-y-5 flex flex-col md:flex-row md:items-center md:gap-8">
      <UI.Avatar src={profile.avatar.src} alt={profile.avatar.alt}/>
      <div className="space-y-5">
        <h1 className="text-4xl md:text-5xl font-bold">{profile.name}</h1>
        <p className="text-lg md:text-xl text-gray-400">{profile.title}</p>
        <p className="max-w-3xl text-gray-300 leading-relaxed">{profile.bio}</p>
        <div className="flex flex-wrap gap-4 pt-4">
          <UI.LinkButton href={profile.links.linkedin}>
            <FontAwesomeIcon icon={faLinkedin}/> LinkedIn
          </UI.LinkButton>
          <UI.LinkButton href={profile.links.github}>
            <FontAwesomeIcon icon={faGithub}/> GitHub
          </UI.LinkButton>
        </div>
      </div>
    </header>
  );
}
