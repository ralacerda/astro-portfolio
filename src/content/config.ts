import { defineCollection, z } from "astro:content";

const articlesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishDate: z.date().optional(),
    isDraft: z.boolean().optional(),
  }),
});
export const collections = {
  articles: articlesCollection,
};
