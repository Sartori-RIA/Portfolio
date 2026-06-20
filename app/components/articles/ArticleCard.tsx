import * as UI from "@/app/components/ui";
import type {Article} from "@/content/types";
import Link from "next/link";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleCard({article}: { article: Article }) {
  return (
    <UI.Card>
      <UI.CardContent>
        <Link href={`/blog/${article.slug}`} className="group block space-y-2">
          <h2 className="text-xl font-semibold text-gray-100 group-hover:text-amber-400 transition">
            {article.title}
          </h2>
          <p className="text-sm text-gray-500">{formatDate(article.date)}</p>
          <p className="text-gray-300">{article.description}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full bg-gray-800 text-gray-400 text-xs font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </Link>
      </UI.CardContent>
    </UI.Card>
  );
}
