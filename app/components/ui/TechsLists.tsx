export function TechsList({techs}: { techs: string[] }) {
  return (<p className="text-sm text-gray-400">{techs.join(" · ")}</p>)
}
