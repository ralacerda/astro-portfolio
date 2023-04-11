import { getCollection } from "astro:content";

export async function getBlogPosts() {
  const blogPosts = await getCollection(
    "articles",
    ({ data }) => data.isDraft != true
  );

  return blogPosts.sort(
    (a, b) =>
      (b.data.publishDate?.getTime() || 0) -
      (a.data.publishDate?.getTime() || 0)
  );
}
