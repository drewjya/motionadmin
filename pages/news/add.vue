<script lang="ts" setup>
import { z } from "zod";
definePageMeta({
  layout: "form",
});

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const data = ref();

const formD = useFormd({
  schema: z.object({
    tanggal: z.string({
      required_error: "Tanggal is required",
      invalid_type_error: "Tanggal must be a string",
    }),
    title: z
      .string({
        required_error: "Detail is required",
        invalid_type_error: "Detail must be a string",
      })
      .trim(),
    image: z
      .custom<File>((val) => val instanceof File, "Please upload a file")
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Please choose .json format files only",
      }),
    news: z.string({
      required_error: "News is required",
      invalid_type_error: "News must be a string",
    }),
  }),

  onSubmit: async (event, d) => {},
  onError: async (event, d) => {},
});

const url = ref();
const preview = ref(false);
const uploadImage = (e: FileList) => {
  if (e.length === 0) return;

  formD.state.image = e[0];
  url.value = URL.createObjectURL(e[0]);
};
</script>

<template>
  <v-form :form="formD" class="flex flex-col gap-4">
    <u-form-group label="Title" name="title">
      <UInput v-model="formD.state.title" />
    </u-form-group>

    <u-form-group label="Tanggal" name="tanggal">
      <UInput v-model="formD.state.tanggal" type="date" />
    </u-form-group>

    <u-form-group label="Image" name="image">
      <button v-if="url" @click="preview = !preview" type="button">
        <img
          :src="url"
          alt="image"
          class="h-auto w-[40%] mb-2 rounded-md border"
        />
      </button>
      <UInput type="file" @change="uploadImage" />
    </u-form-group>
    <v-editor v-model="formD.state.news" />
    <p>{{ formD.state.news }}</p>
    <u-button
      @click="formD.submit.value"
      type="button"
      class="dark:bg-blue-600 bg-blue-900 text-white p-2 rounded hover:bg-blue-600 dark:hover:bg-blue-900 flex justify-center items-center text-base font-bold dark:text-white"
      >Submit</u-button
    >
  </v-form>
  <u-modal v-model="preview">
    <img :src="url" alt="image" class="h-auto w-full mb-4 rounded-md" />
  </u-modal>
</template>

<style scoped></style>
