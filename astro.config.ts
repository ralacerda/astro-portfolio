import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
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
          additionalData: "@import 'src/styles/globals.scss';",
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
