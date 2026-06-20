import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {Article, ArticleFrontmatter} from "@/content/types";

const articlesDir = path.join(process.cwd(), "content/articles");

function parseArticle(filename: string): Article {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(articlesDir, filename), "utf8");
  const {data, content} = matter(raw);
  const frontmatter = data as ArticleFrontmatter;

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    tags: frontmatter.tags ?? [],
    published: frontmatter.published ?? false,
    content,
  };
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDir)) {
    return [];
  }

  return fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith(".md"))
    .map(parseArticle)
    .filter((article) => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getArticleSlugs(): string[] {
  return getAllArticles().map((article) => article.slug);
}
