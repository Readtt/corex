import { getBaseUrl } from "@/lib/utils";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  const pages = [
    { path: "/", priority: 1.0 },
    { path: "/auth/signin", priority: 0.8 },
    { path: "/pricing", priority: 0.8 },
    { path: "/docs", priority: 0.7 },
    { path: "/docs/seo", priority: 0.6 },
    { path: "/docs/deploying", priority: 0.6 },
    { path: "/docs/planned-features", priority: 0.6 },
    { path: "/docs/pages/admin", priority: 0.5 },
    { path: "/docs/pages/authenticated", priority: 0.5 },
    { path: "/docs/getting-started", priority: 0.7 },
    { path: "/docs/getting-started/installation", priority: 0.6 },
    { path: "/docs/getting-started/project-structure", priority: 0.6 },
    { path: "/help", priority: 0.5 },
    { path: "/legal/privacy", priority: 0.3 },
    { path: "/legal/terms", priority: 0.3 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
