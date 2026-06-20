import Markdown from "react-markdown";
import type {Components} from "react-markdown";

const components: Components = {
  h1: ({children}) => (
    <h1 className="text-3xl font-bold text-gray-100 mt-10 mb-4 first:mt-0">{children}</h1>
  ),
  h2: ({children}) => (
    <h2 className="text-2xl font-semibold text-gray-100 mt-8 mb-3">{children}</h2>
  ),
  h3: ({children}) => (
    <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-2">{children}</h3>
  ),
  p: ({children}) => (
    <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({children}) => (
    <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-2">{children}</ul>
  ),
  ol: ({children}) => (
    <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4 ml-2">{children}</ol>
  ),
  li: ({children}) => <li className="leading-relaxed">{children}</li>,
  a: ({href, children}) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-amber-400 hover:text-amber-300 underline underline-offset-2"
    >
      {children}
    </a>
  ),
  code: ({children}) => (
    <code className="px-1.5 py-0.5 rounded bg-gray-800 text-amber-300 text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({children}) => (
    <pre className="p-4 rounded-xl bg-gray-900 border border-gray-800 overflow-x-auto mb-4 text-sm">
      {children}
    </pre>
  ),
  blockquote: ({children}) => (
    <blockquote className="border-l-4 border-amber-400/60 pl-4 italic text-gray-400 my-6">
      {children}
    </blockquote>
  ),
  strong: ({children}) => <strong className="font-semibold text-gray-100">{children}</strong>,
};

export function ArticleContent({content}: { content: string }) {
  return (
    <article className="max-w-3xl">
      <Markdown components={components}>{content}</Markdown>
    </article>
  );
}
