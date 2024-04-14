<script lang="ts" setup>
definePageMeta({
  layout: "form",
});

const news = ref();
</script>

<template>
  <v-editor v-model="news" />
</template>

<style scoped></style>
