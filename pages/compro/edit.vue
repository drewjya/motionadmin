<script lang="ts" setup>
definePageMeta({
  layout: "form",
});

const news = ref();
</script>

<template>
  <div class="flex flex-col gap-2">
    <u-form-group label="Title">
      <u-input />
    </u-form-group>
    <u-form-group label="Subtitle">
      <u-input />
    </u-form-group>
    <u-form-group label="Keterangan">
      <u-input />
    </u-form-group>
    <u-form-group label="Gambar">
      <p>Image Upload</p>
    </u-form-group>

    <v-editor v-model="news" />
  </div>
</template>

<style scoped></style>
