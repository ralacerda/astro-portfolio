export async function parseProject(
  project: Record<string, any>
): Promise<Project> {
  const content = project.compiledContent();
  const [shortContent, longContent] = content.split("<!--read more-->");

  return {
    title: project.frontmatter.title,
    slug: project.frontmatter.slug,
    weight: project.frontmatter.weight,
    shortContent,
    longContent,
    image: await getScreenshot(project.frontmatter.slug),
    tech: project.frontmatter.tech,
  };
}

async function getScreenshot(filename: string): Promise<ImageMetadata> {
  const importedImage = await import(
    `../assets/images/project-${filename}.png`
  );
  return importedImage.default;
}
