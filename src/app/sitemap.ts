import type { MetadataRoute } from "next";

const BASE_URL = "https://sogyo-yushi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: BASE_URL, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/articles`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    ...["sogyo-yushi-erabikata", "hensai-futan", "tsunagi-shikin"].map((slug) => ({
      url: `${BASE_URL}/articles/${slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
