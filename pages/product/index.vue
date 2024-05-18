<script lang="ts" setup>
import type { SResponse } from "~/types/s-response";
import type { CategoryProduct, Product } from "../../types/s-response";
import { ColumnType } from "../../types/t-table";

const page = ref(1);
const limit = 10;
const url = computed(() => apiPath().getProduct(page.value, limit));
const { data, error, refresh, pending } = await useFetch(url, {
  baseURL: "https://api.motionsportindonesia.id",
  transform: (data: SResponse<Product<CategoryProduct>[]>) => {
    return {
      value: data.data ?? [],
      meta: data.meta,
    };
  },
});

const result = computed(() => {
  console.log(data, "DATA MANA INI");

  return data?.value
    ? (data?.value.value.map((item: any) => {
        return {
          ...item,
          categories: item.categories
            .map((category: any) => category.name)
            .join(", "),
        };
      }) as Product<String>[])
    : undefined;
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <n-link label="Add Product" to="/product/add" />
    <v-table
      :columns="[
        {
          key: 'id',
          label: 'ID',
          type: ColumnType.TEXT,
        },
        {
          key: 'name',
          label: 'Name',
          type: ColumnType.TEXT,
        },
        {
          key: 'description',
          label: 'Description',
          type: ColumnType.TEXT,
        },
        {
          key: 'price',
          label: 'Price',
          type: ColumnType.NUMBER,
        },
        {
          key: 'stock',
          label: 'stock',
          type: ColumnType.NUMBER,
        },
        {
          key: 'image',
          label: 'Image',
          type: ColumnType.IMAGE,
        },
        {
          key: 'categories',
          label: 'Category',
          type: ColumnType.ARRAY,
        },
        {
          key: 'serial_code',
          label: 'Serial Code',
          type: ColumnType.TEXT,
        },
      ]"
      :items="result"
    />
  </div>
</template>

<style scoped></style>
