import type {MetadataRoute} from "next";
import {site} from "@/content/profile";
import {getAllArticles} from "@/lib/articles";
import {isBlogEnabled} from "@/lib/features";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = isBlogEnabled()
    ? [
        {
          url: `${site.url}/blog`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.9,
        },
        ...getAllArticles().map((article) => ({
          url: `${site.url}/blog/${article.slug}`,
          lastModified: new Date(article.date),
          changeFrequency: "yearly" as const,
          priority: 0.7,
        })),
      ]
    : [];

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...blogEntries,
    {
      url: `${site.url}/how-i-work`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
