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

const formD = useFormd({
  schema: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(5, { message: "Name must be at least 5 characters" })
      .trim(),

    image: z
      .custom<File>((val) => val instanceof File, "Please upload a file")
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Please choose .json format files only",
      }),
    mob_image: z
      .custom<File>((val) => val instanceof File, "Please upload a file")
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Please choose .json format files only",
      }),
  }),
  onSubmit: async (event, d) => {},
  onError: async (event, d) => {},
});

const url = ref();
const urlMob = ref();
const preview = ref(false);
const app = useApp();
const pageSelected = ref();
const uploadImage = (e: FileList) => {
  if (e.length === 0) return;

  formD.state.image = e[0];
  url.value = URL.createObjectURL(e[0]);
};
const uploadMobImage = (e: FileList) => {
  if (e.length === 0) return;

  formD.state.mob_image = e[0];
  urlMob.value = URL.createObjectURL(e[0]);
};

const isMobile = ref();
const showPreview = (mob = false) => {
  preview.value = true;
  isMobile.value = mob;
};
</script>

<template>
  <v-form :form="formD" class="flex flex-col gap-4">
    <u-form-group label="Name" name="name">
      <UInput v-model="formD.state.name" />
    </u-form-group>

    <u-form-group label="Image" name="image">
      <button v-if="url" @click="() => showPreview()" type="button">
        <img
          :src="url"
          alt="image"
          class="h-auto w-[40%] mb-2 rounded-md border"
        />
      </button>
      <UInput type="file" @change="uploadImage" />
    </u-form-group>

    <u-form-group label="Mobile Image" name="mob_image">
      <button v-if="urlMob" @click="() => showPreview(true)" type="button">
        <img
          :src="urlMob"
          alt="image"
          class="h-auto w-[40%] mb-2 rounded-md border"
        />
      </button>
      <UInput type="file" @change="uploadMobImage" />
    </u-form-group>
    <u-button
      @click="formD.submit.value"
      type="button"
      class="dark:bg-blue-600 bg-blue-900 text-white p-2 rounded hover:bg-blue-600 dark:hover:bg-blue-900 flex justify-center items-center text-base font-bold dark:text-white"
      >Submit</u-button
    >
  </v-form>
  <u-modal v-model="preview">
    <img
      :src="isMobile ? urlMob : url"
      alt="image"
      class="h-auto w-full mb-4 rounded-md"
    />
  </u-modal>
</template>

<style scoped></style>
