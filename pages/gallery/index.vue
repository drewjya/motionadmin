<script lang="ts" setup>
import type { SResponse } from "~/types/s-response";
import { ColumnType } from "../../types/t-table";

const page = ref(1);
const limit = 10;
const url = computed(() => apiPath().getGallery(page.value, limit));
const { data, error, refresh, pending } = await useFetch(url, {
  baseURL: "https://api.motionsportindonesia.id",
  transform: (data: SResponse<any>) => {
    return {
      value: data.data,
      meta: data.meta,
    };
  },
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <n-link label="Add Gallery" to="/gallery/add" />
    <v-table
      :columns="[
        {
          key: 'id',
          label: 'ID',
          type: ColumnType.TEXT,
        },
        {
          key: 'image',
          label: 'Image',
          type: ColumnType.IMAGE,
        },
      ]"
      :items="data?.value"
    />
  </div>
</template>

<style scoped></style>
