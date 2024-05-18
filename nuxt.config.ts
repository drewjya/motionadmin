// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@vueuse/motion/nuxt",
    "@formkit/auto-animate/nuxt",
    "@vueuse/nuxt",
    "nuxt-tiptap-editor",
    "@nuxt/image",
    ["@pinia/nuxt", { autoImports: ["defineStore", "defineStore"] }],
  ],
  css: ["~/assets/main.css"],
  tiptap: {
    prefix: "Tiptap",
  },
  ui: {
    global: true,
  },
});
