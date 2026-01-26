import {ReactNode} from "react";

export function LinkButton({
                             href,
                             children,
                           }: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition"
    >
      {children}
    </a>
  );
}