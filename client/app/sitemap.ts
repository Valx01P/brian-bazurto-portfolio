import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: profile.url,
      lastModified: new Date("2026-06-02"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
