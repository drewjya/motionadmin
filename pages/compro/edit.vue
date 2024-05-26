<script lang="ts" setup>
import { z } from "zod";
import type { SResponse } from "~/types/s-response";
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
const path = apiPath();

const data = ref();

onMounted(() => {
  initState();
});

const app = useApp();
const initState = async () => {
  const data = await useFetch<
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

  const val = data.data.value;
  if (val && val.data) {
    formD.state.title = val.data.title;
    formD.state.subtitle = val.data.subtitle;
    formD.state.data = val.data.data;
    formD.state.tanggal = val.data.tanggal;
    // formD.state.image = val.data.image;
    if (val.data.image) {
      const response = await fetch(val.data.image, {
        method: "GET",
      });
      const data = await response.blob();

      console.log(data);

      const file = new File([data], val.data.file_name, {
        type: data.type || "image/png",
      });
      if (file) {
        formD.state.image = file;
        url.value = URL.createObjectURL(file);
      }
    }
  }
};
const notif = useNotification();
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
    subtitle: z
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
    data: z.string({
      required_error: "data is required",
      invalid_type_error: "data must be a string",
    }),
  }),

  onSubmit: async (event, d) => {
    const form = new FormData();
    form.append("title", event.data.title);
    form.append("data", event.data.data);
    form.append("subtitle", event.data.subtitle);
    form.append("tanggal", new Date(event.data.tanggal).toISOString());
    form.append("image", event.data.image);

    const app = useApp();
    const data = await useFetch<SResponse<any>>(path.postAbout(), {
      baseURL: "https://api.motionsportindonesia.id",
      method: "POST",
      body: form,
      headers: {
        Authorization: `Bearer ${app.accessToken ?? "invalid_token"}`,
      },
    });
    const error: SResponse<any> | undefined | null = data.error.value?.data;
    if (error) {
      console.log(error);

      throw error;
    }

    const val = data.data.value;
    if (val) {
      const msg = Object.entries(val.messages).find(([key, validationCode]) => {
        return key === "@root";
      });

      notif.ok({
        message: `${msg ? msg[1] : "Success"}`,
      });
    }
    navigateTo("/compro");
  },
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
    <u-form-group label="Subtitle" name="subtitle">
      <UInput v-model="formD.state.subtitle" />
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
    <v-editor v-model="formD.state.data" />
    <div v-html="formD.state.data"></div>
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
