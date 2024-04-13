<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
import type { OnClickOutsideOptions } from "../types/on-click-outside";
const app = useApp();

const breakPoints = useBreakpoints();

watch(breakPoints.width, (v) => {
  console.log(v);
  if (v > 768) {
    app.turnOffSidebar();
  }
});
const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    console.log(route.fullPath);

    console.log(route.path);

    app.turnOffSidebar();
  }
);
const ignoreRef = ref();
const ingnoreTheme = ref();
const onClickOutsideHandler: [(evt: any) => void, OnClickOutsideOptions] = [
  (ev: any) => {
    if (ev.target === ignoreRef.value) return;
    app.turnOffSidebar();
  },
  { ignore: [ignoreRef, ingnoreTheme] },
];
</script>

<template>
  <div
    class="dark:bg-slate-900 bg-slate-400 p-4 pl-0 flex items-center h-20 text-black dark:text-white"
  >
    <div class="md:hidden">
      <button
        class="flex flex-col h-12 w-12 justify-center items-center group"
        @click="app.clickSidebar()"
        ref="ignoreRef"
      >
        <div
          class="h-0.5 w-6 my-0.5 rounded-full bg-black dark:bg-white transition ease transform duration-300"
          :class="app.isActive.value ? 'rotate-45 translate-y-1.5' : ''"
        ></div>
        <div
          class="h-0.5 w-6 my-0.5 rounded-full bg-black dark:bg-white transition ease transform duration-300"
          :class="app.isActive.value ? 'opacity-0' : ''"
        ></div>
        <div
          class="h-0.5 w-6 my-0.5 rounded-full bg-black dark:bg-white transition ease transform duration-300"
          :class="app.isActive.value ? '-rotate-45 -translate-y-1.5' : ''"
        ></div>
        <div v-auto-animate>
          <div
            class="relative"
            v-if="app.isActive.value"
            v-on-click-outside="onClickOutsideHandler"
          >
            <div
              class="absolute dark:bg-slate-900 bg-slate-400 h-[calc(100vh-80px)] w-40 z-50 flex flex-col justify-between pb-4 top-[31px] -left-[24px]"
            >
              <v-link />
            </div>
          </div>
        </div>
      </button>
    </div>
    <div class="flex items-center justify-between w-full">
      <h1 class="text-2xl font-bold ml-5">Motion Sport Indonesia</h1>
      <s-theme />
    </div>
  </div>
</template>

<style scoped></style>
