App.vue
<script setup lang="ts">
import { ref } from "vue";
import type { Banner, CategoryProduct, Product, PromotionProduct, SResponse, YT } from "~/types/s-response";
import { ColumnType } from "~/types/t-table";

const youtube = ref<YT | undefined>();
const banner = ref<Banner | undefined>();
const promotion = ref<
  {
    id: number;
    name: string;
    image: string;
  }[]
  | undefined
>();
const path = apiPath();

const youtubeLoad = async () => {
  const load = await usePrivateApi<YT | undefined | null>(path.youtube(), {
    method: "GET",
  });
  if (load.code < 300) {
    youtube.value = load.data ?? undefined;
  }

}

const bannerLoad = async () => {
  const bannData = await usePrivateApi<Banner>(path.getBannerProduct(), {
    method: "GET",
  });
  if (bannData.code < 300) {
    banner.value = bannData.data;
  }
}

const promotionLoad = async () => {
  const productPromotion = await usePrivateApi<PromotionProduct[] | undefined>(
    path.getProductPromotion(),
    {
      method: "GET",
    }
  );
  if (productPromotion.code < 300) {
    promotion.value = productPromotion.data?.map((e) => {
      return {
        id: e.id,
        name: e.product.name,
        image: e.image,
      };
    });

  }
}
const initState = async () => {
  await Promise.all([
    youtubeLoad(),
    bannerLoad(),
    promotionLoad()
  ])
};

onMounted(() => {
  initState();
});

const loadYoutube = async () => {
  const load = await usePrivateApi(apiPath().youtube(), {
    method: "POST",
  });
  if (load.code < 300) {
    youtubeLoad();
  }
};

const file = ref<File | undefined>();
const notif = useNotification();
const url = ref();
const preview = ref(false);
const uploadImage = (e: FileList) => {
  if (e.length === 0) return;

  file.value = e[0];
  url.value = URL.createObjectURL(e[0]);
};

const isUploadBanner = ref(false);
const isUploadPromotion = ref(false);

const link = computed(() => apiPath().getProduct(1, 100));
const { data, error, refresh, pending } = await useFetch(link, {
  baseURL: "https://api.motionsportindonesia.id",
  transform: (data: SResponse<Product<CategoryProduct>[]>) => {
    return {
      value: data.data ?? [],
      meta: data.meta,
    };
  },
});
const addBanner = async () => {
  isUploadBanner.value = false;
  url.value = undefined;
  if (!file.value) {
    notif.info({
      title: "Warning",
      message: "Harap masukkan gambar terlebih dahulu",
    });
    return;
  }
  const formData = new FormData();
  formData.append("image", file.value);
  formData.append("label", new Date().toLocaleDateString());
  file.value = undefined;
  const add = await usePrivateApi(apiPath().postBannerProduct(), {
    method: "POST",
    body: formData,
  });
  if (add.code) {
    bannerLoad();
  }
};

const productSelected = ref<Product<CategoryProduct> | undefined>();

const addPromotion = async () => {

  if (!productSelected.value) {
    notif.info({
      title: "Warning",
      message: "Harap masukkan gambar terlebih dahulu",
    });
    return;
  }
  if (!file.value) {
    notif.info({
      title: "Warning",
      message: "Harap masukkan gambar terlebih dahulu",
    });
    return;
  }
  isUploadPromotion.value = false
  url.value = undefined;
  const formData = new FormData();

  formData.append("product_id", `${productSelected.value.id}`);
  formData.append("image", file.value);
  file.value = undefined;
  productSelected.value = undefined
  const add = await usePrivateApi(apiPath().getProductPromotion(), {
    method: "POST",
    body: formData,
  });
  if (add.code) {
    promotionLoad();
  }
};

const ui = {
  label: {
    base: "text-2xl",
  },
};
const displayed = ref("Select Product");
watch(productSelected, (v) => {

  if (!v) {
    displayed.value = "Select Categories";
    return;
  }
  displayed.value = v.name;
});

</script>

<template>
  <u-modal v-model="isUploadBanner">
    <div class="p-5 rounded flex flex-col gap-2">
      <u-input type="file" @change="uploadImage" />
      <div v-if="url">
        <img :src="url" alt="" />
      </div>
      <u-button label="Kirim" @click="addBanner" />
    </div>
  </u-modal>
  <u-modal v-model="isUploadPromotion">
    <div class="p-5 rounded flex flex-col gap-2">
      <u-form-group label="Products" name="products">
        <u-select-menu v-model="productSelected" :options="data?.value" :loading="pending" trailing
          option-attribute="name" by="id" placeholder="Select Product">
          <template #label>
            <p>{{ displayed }}</p>
          </template>
        </u-select-menu>
      </u-form-group>
      <u-input type="file" @change="uploadImage" />
      <div v-if="url">
        <img :src="url" alt="" />
      </div>
      <u-button label="Kirim" @click="addPromotion" />
    </div>
  </u-modal>
  <div class="flex flex-col gap-4">
    <u-form-group label="Youtube" :ui="ui">
      <div class="flex flex-col gap-3">
        <u-button label="Set Youtube" @click="loadYoutube" />
        <vyoutube v-if="youtube" :video-id="youtube.VideoId" />
      </div>
    </u-form-group>
    <u-form-group label="Banner Product" :ui="ui">
      <div class="flex flex-col gap-4">
        <u-button label="Set Banner" @click="isUploadBanner = !isUploadBanner" />
        <img v-if="banner" :src="banner.image" alt="" class="w-80" />
      </div>
    </u-form-group>

    <u-form-group label="Promotion Product" :ui="ui">
      <u-button label="Add Promotion" @click="isUploadPromotion = !isUploadPromotion" />
      <div class="p-2"></div>
      <div v-if="promotion">
        <v-table :items="promotion" :columns="[{
          key: 'id',
          label: 'ID',
          type: ColumnType.TEXT,
        }, {
          key: 'name',
          label: 'Name',
          type: ColumnType.TEXT,
        }, {
          key: 'image',
          label: 'Image',
          type: ColumnType.IMAGE,
        }]" />
      </div>
    </u-form-group>
  </div>
</template>
