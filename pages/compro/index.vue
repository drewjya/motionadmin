<script lang="ts" setup>
import type { SResponse } from "~/types/s-response";

onMounted(() => {
  initState();
});
const path = apiPath();
const data = ref<{
  id: number;
  title: string;
  subtitle: string;
  data: string;
  tanggal: string;
  image: string;
  file_name: string;
}>();
const app = useApp();
const initState = async () => {
  const req = await useFetch<
    SResponse<{
      id: number;
      title: string;
      subtitle: string;
      data: string;
      tanggal: string;
      image: string;
      file_name: string;
    }>
  >(path.getAbout(), {
    baseURL: "https://api.motionsportindonesia.id",
    method: "GET",
    headers: {
      Authorization: `Bearer ${app.accessToken ?? "invalid_token"}`,
    },
  });
  const val = req.data.value;
  if (val && val.data) {
    data.value = val.data;
  }
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <n-link label="Edit Company Profile" to="/compro/edit" />
    <div v-if="data">
      <p>{{ data.title }}</p>
      <p>{{ data.subtitle }}</p>
      <p>{{ data.tanggal }}</p>
      <img :src="data.image" alt="image" />
      <div v-html="data.data"></div>
    </div>
  </div>
</template>

<style scoped></style>
