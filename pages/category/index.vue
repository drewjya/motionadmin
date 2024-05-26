<script lang="ts" setup>
import type { SResponse } from "~/types/s-response";
import type { CategoryProduct } from "../../types/s-response";
import { ColumnType } from "../../types/t-table";

const page = ref(1);
const limit = 10;
const notif = useNotification()
const url = computed(() => apiPath().getCategory(page.value, limit));
const { data, error, refresh, pending } = await useFetch(url, {
  baseURL: "https://api.motionsportindonesia.id",
  transform: (data: SResponse<CategoryProduct[]>) => {
    return {
      value: data.data,
      meta: data.meta,
    };
  },
});

const onDelete = async(data:CategoryProduct)=>{
  const load =await  usePrivateApi(apiPath().postCategory()+`/${data.id}`, {
    method:"DELETE"
  })
  if (load.code<300) {
    refresh()
  }else{
    notif.error({
      title:"Error",
      message:`${(load.messages as any)["@root"]}`
    })
  }
}
const onUpdate = (data:CategoryProduct)=>{}
</script>

<template>
  <div class="flex flex-col gap-2">
    <n-link label="Add Category" to="/category/add" />
    <v-table
    @update="(data:CategoryProduct)=>{
      console.log(data.id);
      
    }"
    @delete="onDelete"

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
          key: 'image',
          label: 'Image',
          type: ColumnType.IMAGE,
        },
        {
          key: '',
          label: 'Action',
          type: ColumnType.ACTION,
        },
        
      ]"
      :items="data?.value"

    />
  </div>
</template>

<style scoped></style>
