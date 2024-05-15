<script lang="ts" setup>
import { z } from "zod";
import type { CategoryProduct, SResponse } from "~/types/s-response";

definePageMeta({
  layout: "form",
});
const path = apiPath();
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const data = ref<CategoryProduct[]>([]);
const loading = ref(true);

onMounted(() => {
  async function load() {
    const body = await fetch(
      "https://api.motionsportindonesia.id" + path.getCategory(1, 50),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const val: SResponse<CategoryProduct[]> = await body.json();
    data.value = val.data ?? [];
    loading.value = false;
    console.log(val);
  }

  load();
});

const displayed = ref("Select Categories");
const notif = useNotification();

const formD = useFormd({
  schema: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(5, { message: "Name must be at least 5 characters" })
      .trim(),
    price: z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .min(1, { message: "Price must be at least 1" }),
    serialCode: z.string({
      required_error: "Serial Code is required",
      invalid_type_error: "Serial Code must be a string",
    }),
    stock: z
      .number({
        required_error: "Stock is required",
        invalid_type_error: "Stock must be a number",
      })
      .min(1, { message: "Stock must be at least 1" }),
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }),
    image: z
      .custom<File>((val) => val instanceof File, "Please upload a file")
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Please choose .json format files only",
      }),
    categories: z.array(z.number(), {
      required_error: "Categories is required",
      invalid_type_error: "Categories must be a number",
    }),
  }),
  initial: {},
  onSubmit: async (event, d) => {
    const form = new FormData();
    form.append("name", event.data.name);
    form.append("price", event.data.price.toString());
    form.append("serialCode", event.data.serialCode);
    form.append("stock", event.data.stock.toString());
    form.append("description", event.data.description);
    form.append("image", event.data.image);
    form.append("categories", event.data.categories.join(", "));

    const app = useApp();
    const data = await useFetch<SResponse<any>>(path.postProduct(), {
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
    navigateTo("/product");
  },
  onError: async (event, d) => {},
});

const selected = ref(<CategoryProduct[]>[]);
watch(selected, (v) => {
  const a = formD.state.categories;
  if (v.length === 0) {
    formD.state.categories = [];
    displayed.value = "Select Categories";
    return;
  }
  const cate = v.map((e) => e.id);
  formD.state.categories = cate;
  const dis = v.map((e) => `${e.name}`).join(", ");

  displayed.value = dis;
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
      <u-input v-model="formD.state.name" />
    </u-form-group>

    <u-form-group label="Price" name="price">
      <u-input v-model.number="formD.state.price" type="number" />
    </u-form-group>
    <u-form-group label="Serial Code" name="serialCode">
      <u-input v-model="formD.state.serialCode" />
    </u-form-group>
    <u-form-group label="Stock" name="stock">
      <u-input v-model.number="formD.state.stock" />
    </u-form-group>
    <u-form-group label="Description" name="description">
      <u-input v-model="formD.state.description" />
    </u-form-group>
    <u-form-group label="Categories" name="categories">
      <u-select-menu
        v-model="selected"
        :options="data"
        :loading="loading"
        multiple
        trailing
        option-attribute="name"
        by="id"
        placeholder="Select Categories"
      >
        <template #label>
          <p>{{ displayed }}</p>
        </template>
      </u-select-menu>
    </u-form-group>
    <u-form-group label="Image" name="image">
      <button v-if="url" @click="preview = !preview" type="button">
        <img
          :src="url"
          alt="image"
          class="h-auto w-[40%] mb-2 rounded-md border"
        />
      </button>
      <u-input type="file" @change="uploadImage" />
    </u-form-group>
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
