import * as UI from "@/app/components/ui";

export function EducationsSection() {
  return (<UI.Section title="Education">
    <UI.Card>
      <UI.CardContent>
        <h3 className="font-semibold">Specialization in Mobile Web Application Development</h3>
        <p className="text-gray-400">UniGuairacá Centro Universitário · 2019 – 2021</p>
      </UI.CardContent>
    </UI.Card>

    <UI.Card>
      <UI.CardContent>
        <h3 className="font-semibold">Bachelor in Internet Systems Technology</h3>
        <p className="text-gray-400">Federal University of Technology · 2014 – 2019</p>
      </UI.CardContent>
    </UI.Card>
  </UI.Section>)
}