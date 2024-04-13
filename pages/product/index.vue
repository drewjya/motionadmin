<script lang="ts" setup>
import { z } from "zod";
import { ColumnType } from "../../types/t-table";

const isOpen = ref(false);

const formD = useFormd({
  schema: z.object({}),
  onSubmit: async (event, d) => {},
  onError: async (event, d) => {},
});

const title = ref("");
</script>

<template>
  <div class="flex flex-col gap-2">
    <nuxt-link to="/product/add" class="bg-slate-300 p-2 rounded w-max"
      >Add New Product</nuxt-link
    >
    <v-table
      :columns="[
        {
          key: 'id',
          label: 'ID',
          type: ColumnType.TEXT,
        },
      ]"
      :items="[
        {
          id: '1',
        },
      ]"
    />
  </div>
</template>

<style scoped></style>
