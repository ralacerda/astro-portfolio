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
    images: project.frontmatter.screenshots,
    tech: project.frontmatter.tech,
    headings: await project.getHeadings(),
    link: project.frontmatter.link,
    repoLink: project.frontmatter.repoLink,
  };
}
