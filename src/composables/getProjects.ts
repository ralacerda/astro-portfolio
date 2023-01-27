import { getImage } from "@astrojs/image";
import type { MarkdownInstance } from "astro";
import type { Tech } from "./getIcon";

import contrasteScreenshot from "@/assets/images/project-contraste.png";
import oscarScreenshot from "@/assets/images/project-oscar.png";
import coloquioScreenshot from "@/assets/images/project-coloquio.png";

const projectScreenshot: Record<string, ImageMetadata> = {
  contraste: contrasteScreenshot,
  oscar: oscarScreenshot,
  coloquio: coloquioScreenshot,
};

export type Project = {
  title: string;
  weight: number;
  longContent: string;
  shortContent: string;
  image: ImageMetadata;
  tech: Tech[];
  slug: string;
};

export async function getProjects(
  projectGlob: MarkdownInstance<Record<string, any>>[]
): Promise<Project[]> {
  return await Promise.all(
    projectGlob.map(async (project) => {
      const content = project.compiledContent();
      const [shortContent, longContent] = content.split("<!--read more-->");

      return {
        title: project.frontmatter.title,
        slug: project.frontmatter.slug,
        weight: project.frontmatter.weight,
        shortContent,
        longContent,
        image: projectScreenshot[project.frontmatter.slug],
        tech: project.frontmatter.tech,
      };
    })
  );
}
