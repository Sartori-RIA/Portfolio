import {ReactNode} from "react";

export function Card({children}: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 shadow-sm">
      {children}
    </div>
  );
}

export function CardContent({children}: { children: ReactNode }) {
  return <div className="p-6 space-y-3">{children}</div>;
}