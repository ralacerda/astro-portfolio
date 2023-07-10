import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      Icons({
        compiler: "astro",
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import 'src/styles/_mixins.scss';",
        },
      },
    },
  },
  integrations: [
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
});
