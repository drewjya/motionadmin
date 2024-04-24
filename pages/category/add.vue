<script lang="ts" setup>
import { z } from "zod";
import type { SResponse } from "../../types/s-response";
definePageMeta({
  layout: "form",
});

const path = apiPath();

const formD = useFormd({
  schema: z.object({
    name: z
      .string({
        required_error: "Nama is required",
        invalid_type_error: "Nama must be a string",
      })
      .trim(),
  }),

  onSubmit: async (event, d) => {
    const data = await useFetch(path.postCategory(), {
      baseURL: "https://api.motionsportindonesia.id",
      method: "POST",
      body: JSON.stringify(event.data),
    });
    const error: SResponse<any> | undefined | null = data.error.value?.data;
    if (error) {
      console.log(error);

      throw error;
    }
  },
  onError: async (event, d) => {
    console.log(event);
  },
});
</script>

<template>
  <v-form :form="formD" class="flex flex-col gap-4">
    <u-form-group label="Name" name="name">
      <UInput v-model="formD.state.name" />
    </u-form-group>

    <u-button
      @click="formD.submit.value"
      type="button"
      class="dark:bg-blue-600 bg-blue-900 text-white p-2 rounded hover:bg-blue-600 dark:hover:bg-blue-900 flex justify-center items-center text-base font-bold dark:text-white"
      >Submit</u-button
    >
  </v-form>
</template>

<style scoped></style>
