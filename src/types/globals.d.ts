export {};

declare global {
  type Project = {
    title: string;
    weight: number;
    longContent: string;
    shortContent: string;
    image: ImageMetadata;
    tech: Tech[];
    slug: string;
  };

  type Tech = (typeof TechNames)[number];
}

const TechNames = [
  "Bash",
  "Git",
  "GitHub",
  "HTML5",
  "CSS3",
  "SASS",
  "Javascript",
  "Typescript",
  "Vue",
  "Nuxt",
  "Astro",
  "Firebase",
  "Node",
  "Mongo",
  "Bulma",
  "Netlify",
  "Vite",
  "Eleventy",
  "Tailwind",
  "Alpine",
] as const;
