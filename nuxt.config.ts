// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@vueuse/motion/nuxt",
    "@formkit/auto-animate/nuxt",
    "@vueuse/nuxt",
  ],
  ui: {
    global: true,
  },
});
