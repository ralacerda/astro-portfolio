import { getPicture } from "@astrojs/image";
import type { GetPictureResult } from "@astrojs/image/dist/lib/get-picture";
import type { MarkdownInstance } from "astro";
import type { Tech } from "./getIcon";

async function getAstroPicture(src: string) {
  return await getPicture({
    src,
    alt: "Something",
    widths: [300],
    formats: ["webp"],
    aspectRatio: "1:1",
  });
}

export type Project = {
  title: string;
  weight: number;
  content: string;
  image: GetPictureResult;
  tech: Tech[];
};

export async function getProjects(
  projectGlob: MarkdownInstance<Record<string, any>>[]
): Promise<Project[]> {
  return await Promise.all(
    projectGlob.map(async (project) => {
      return {
        title: project.frontmatter.title,
        weight: project.frontmatter.weight,
        content: project.compiledContent(),
        image: await getAstroPicture(project.frontmatter.imageSrc),
        tech: project.frontmatter.tech,
      };
    })
  );
}
