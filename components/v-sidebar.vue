<script lang="ts" setup>
const hide = ref(true);
const app = useApp();
</script>

<template>
  <div class="hidden md:block">
    <div
      class="h-full dark:bg-slate-900 bg-slate-400 pb-4 flex flex-col justify-between w-40"
    >
      <v-link />
    </div>
  </div>
</template>

<style scoped></style>
