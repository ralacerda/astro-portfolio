import { getPicture, getImage } from "@astrojs/image";
import type { GetPictureResult } from "@astrojs/image/dist/lib/get-picture";
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

async function getAstroPicture(slug: string, title: string) {
  const image = await getImage({
    src: projectScreenshot[slug],
    alt: `Screenshot do projeto ${title}`,
    width: 600,
    format: "webp",
    aspectRatio: "3:2",
  });

  return await getPicture({
    src: <string>image.src,
    alt: <string>image.alt,
    widths: [300, 600],
    formats: ["png", "webp"],
    aspectRatio: "3:2",
  });
}

export type Project = {
  title: string;
  weight: number;
  content: string;
  image: GetPictureResult;
  tech: Tech[];
  slug: string;
};

export async function getProjects(
  projectGlob: MarkdownInstance<Record<string, any>>[]
): Promise<Project[]> {
  return await Promise.all(
    projectGlob.map(async (project) => {
      return {
        title: project.frontmatter.title,
        slug: project.frontmatter.slug,
        weight: project.frontmatter.weight,
        content: project.compiledContent(),
        image: await getAstroPicture(
          project.frontmatter.slug,
          project.frontmatter.title
        ),
        tech: project.frontmatter.tech,
      };
    })
  );
}
