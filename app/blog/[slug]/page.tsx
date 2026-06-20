import {ArticleContent} from "@/app/components/articles/ArticleContent";
import * as UI from "@/app/components/ui";
import {getArticleBySlug, getArticleSlugs} from "@/lib/articles";
import {isBlogEnabled} from "@/lib/features";
import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  if (!isBlogEnabled()) {
    return [];
  }

  return getArticleSlugs().map((slug) => ({slug}));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  if (!isBlogEnabled()) {
    return {title: "Not found"};
  }

  const {slug} = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {title: "Article not found"};
  }

  return {
    title: article.title,
    description: article.description,
    alternates: {canonical: `/blog/${slug}`},
    openGraph: {
      type: "article",
      publishedTime: article.date,
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({params}: PageProps) {
  if (!isBlogEnabled()) {
    notFound();
  }

  const {slug} = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <UI.PageShell>
      <header className="space-y-4 max-w-3xl">
        <Link
          href="/blog"
          className="text-sm text-gray-500 hover:text-gray-300 transition"
        >
          ← Back to articles
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold">{article.title}</h1>
        <p className="text-gray-400">{formatDate(article.date)}</p>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-gray-800 text-gray-400 text-xs font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <ArticleContent content={article.content}/>

      <UI.Footer/>
    </UI.PageShell>
  );
}
