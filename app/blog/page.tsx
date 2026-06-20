import {ArticleCard} from "@/app/components/articles/ArticleCard";
import * as UI from "@/app/components/ui";
import {blog} from "@/content/blog";
import {getAllArticles} from "@/lib/articles";
import {isBlogEnabled} from "@/lib/features";
import type {Metadata} from "next";
import {notFound} from "next/navigation";

export const metadata: Metadata = {
  title: blog.title,
  description: blog.description,
  alternates: {canonical: "/blog"},
};

export default function BlogPage() {
  if (!isBlogEnabled()) {
    notFound();
  }

  const articles = getAllArticles();

  return (
    <UI.PageShell>
      <header className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold">{blog.title}</h1>
        <p className="text-gray-400 max-w-2xl text-lg">{blog.description}</p>
      </header>

      <section className="space-y-6">
        {articles.length === 0 ? (
          <p className="text-gray-500">No articles published yet.</p>
        ) : (
          articles.map((article) => <ArticleCard key={article.slug} article={article}/>)
        )}
      </section>

      <UI.Footer/>
    </UI.PageShell>
  );
}
