<script lang="ts" setup>
import { ColumnType } from "../../types/t-table";

const isOpen = ref(false);

const title = ref("");
</script>

<template>
  <div class="flex flex-col gap-2">
    <n-link label="Add News" to="/news/add" />
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
