<script lang="ts" setup>
import { z } from "zod";
import type { SResponse } from "../../types/s-response";
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
const notif = useNotification()
const router =useRouter()

const path = apiPath();

const formD = useFormd({
  schema: z.object({
    name: z
      .string({
        required_error: "Nama is required",
        invalid_type_error: "Nama must be a string",
      })
      .trim(),
      image: z
      .custom<File>((val) => val instanceof File, "Please upload a file")
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Please choose .json format files only",
      }),
  }),

  onSubmit: async (event, d) => {
    const formData = new FormData()
    formData.append("name", event.data.name);
    formData.append("image", event.data.image);
    const data = await usePrivateApi<any>(path.postCategory(), {
      method: "POST",
      body: formData,
    });
    if (data.code<300) {
      router.go(-1);
    }else{
      notif.error({
        title:"Error",
        message: `${data.messages}`,
      })
    }
    
  },
  onError: async (event, d) => {
    console.log(event);
  },
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
    <u-form-group label="Name" name="name">
      <UInput v-model="formD.state.name" />
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
    <u-button
      @click="formD.submit.value"
      type="button"
      class="dark:bg-blue-600 bg-blue-900 text-white p-2 rounded hover:bg-blue-600 dark:hover:bg-blue-900 flex justify-center items-center text-base font-bold dark:text-white"
      >Submit</u-button
    >
  </v-form>
</template>

<style scoped></style>
