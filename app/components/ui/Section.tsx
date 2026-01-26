import {ReactNode} from "react";

export function Section({title, children}: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}