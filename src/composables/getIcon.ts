const icons = {
  Bash: (await import("~icons/simple-icons/gnubash?raw")).default,
  Git: (await import("~icons/simple-icons/git?raw")).default,
  HTML5: (await import("~icons/simple-icons/html5?raw")).default,
  CSS3: (await import("~icons/simple-icons/css3?raw")).default,
  SASS: (await import("~icons/simple-icons/sass?raw")).default,
  Javascript: (await import("~icons/simple-icons/javascript?raw")).default,
  Typescript: (await import("~icons/simple-icons/typescript?raw")).default,
  Vue: (await import("~icons/simple-icons/vuejs?raw")).default,
  Nuxt: (await import("~icons/simple-icons/nuxtdotjs?raw")).default,
  Astro: (await import("~icons/simple-icons/astro?raw")).default,
  Firebase: (await import("~icons/simple-icons/firebase?raw")).default,
};

export type Tech = keyof typeof icons;

export function getIconFromArray(list: Tech[]): astroHTML.JSX.Element[] {
  return list.map((tech) => icons[tech]);
}

export function getIcon(tech: Tech): astroHTML.JSX.Element {
  return icons[tech];
}
