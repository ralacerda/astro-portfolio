import IconAstro from "~icons/simple-icons/astro?raw";
import IconBash from "~icons/simple-icons/gnubash?raw";
import IconGit from "~icons/simple-icons/git?raw";
import IconHtml from "~icons/simple-icons/html5?raw";
import IconCss from "~icons/simple-icons/css3?raw";
import IconSass from "~icons/simple-icons/sass?raw";
import IconJavascript from "~icons/simple-icons/javascript?raw";
import IconTypescript from "~icons/simple-icons/typescript?raw";
import IconNuxt from "~icons/simple-icons/nuxtdotjs?raw";
import IconVue from "~icons/simple-icons/vuejs?raw";

const icons = {
  Bash: IconBash,
  Git: IconGit,
  HTML5: IconHtml,
  CSS3: IconCss,
  SASS: IconSass,
  Javascript: IconJavascript,
  Typescript: IconTypescript,
  Vue: IconVue,
  Nuxt: IconNuxt,
  Astro: IconAstro,
};

export type Tech = keyof typeof icons;

export function getIconFromArray(list: Tech[]): astroHTML.JSX.Element[] {
  return list.map((tech) => icons[tech]);
}

export function getIcon(tech: Tech): astroHTML.JSX.Element {
  return icons[tech];
}
