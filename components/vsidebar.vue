<script lang="ts" setup>
const pages: {
  title: string;
  link: string;
}[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Product",
    link: "/product",
  },
  {
    title: "Gallery",
    link: "/gallery",

  },
  {
    title: "Carousel",
    link: "/carousel",
  },
  {
    title: "Banner",
    link: "/banner",
  },
  {
    link: "/compro",
    title: "Compro",
  },
];

const color = useColorMode();
</script>

<template>
  <div
    class="h-screen dark:bg-slate-900 bg-slate-400 py-4 flex flex-col justify-between"
  >
    <ul class="flex flex-col" >
      <li
        v-for="page in pages"
        :key="page.title"
        class="text-center px-5 py-2"
        :class="
          $route.path === page.link
            ? 'dark:bg-blue-600  bg-blue-900 text-white '
            : ''
        "
      >
        <NuxtLink :to="page.link" class="p-2">{{ page.title }}</NuxtLink>
      </li>
    </ul>
    <vtheme />
  </div>
</template>

<style scoped></style>
