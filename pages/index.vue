App.vue
<script setup lang="ts">
import { ref } from "vue";


type YT = {
  ID: Number,
  VideoId: string,
  Thumbnail: string,
}

type Banner = {
  image: string
}
const youtube = ref<YT | undefined>()
const banner = ref<Banner | undefined>()
const promotion = ref()
const path = apiPath()
const initState = async () => {
  const load = await usePrivateApi<YT | undefined | null>(path.youtube(), {
    method: "GET"
  })
  if (load.code < 300) {
    youtube.value = load.data ?? undefined
  }

  const bannData = await usePrivateApi<Banner>(path.getBannerProduct(), {
    method: "GET"
  })
  if (bannData.code < 300) {
    banner.value = bannData.data
  }

  const productPromotion = await usePrivateApi(path.getProductPromotion(), {
    method: "GET"
  })
  if (productPromotion.code < 300) {
    promotion.value = productPromotion.data
  }


}

onMounted(() => {
  initState()
})

const loadYoutube = async () => {
  const load = await usePrivateApi(apiPath().youtube(), {
    method: "POST"
  })
  if (load.code < 300) {
    initState()
  }
}

const file = ref<File | undefined>()
const notif = useNotification()
const url = ref();
const preview = ref(false);
const uploadImage = (e: FileList) => {
  if (e.length === 0) return;

  file.value = e[0];
  url.value = URL.createObjectURL(e[0]);
};


const isUploadBanner = ref(false)


const addBanner = async () => {
  isUploadBanner.value = false;
  url.value = undefined
  if (!file.value) {
    notif.info({
      title: "Warning",
      message: "Harap masukkan gambar terlebih dahulu"
    })
    return
  }
  const formData = new FormData()
  formData.append('image', file.value)
  formData.append('label', (new Date()).toLocaleDateString())
  const add = await usePrivateApi(apiPath().postBannerProduct(), {
    method: "POST",
    body: formData
  })
  if (add.code) {
    initState()
  }
}

const ui = {
  label: {
    base: 'text-2xl'
  }
}


</script>

<template>

  <u-modal v-model="isUploadBanner">
    <u-input type="file" @change="uploadImage" />
    <div v-if="url">
      <img :src="url" alt="">
    </div>
    <u-button label="Kirim" @click="addBanner" />
  </u-modal>
  <div class="flex flex-col gap-4">
    <u-form-group label="Youtube" :ui="ui">
      <div class="flex  flex-col gap-3">
        <u-button label="Set Youtube" @click="loadYoutube" />
        <vyoutube v-if="youtube" :video-id="youtube.VideoId" />
      </div>
    </u-form-group>
    <u-form-group label="Banner Product" :ui=ui>
      <div class="flex flex-col gap-4">
        <u-button label="Set Banner" @click="isUploadBanner = !isUploadBanner" />
        <img v-if="banner" :src="banner.image" alt="">
      </div>
    </u-form-group>

    <u-form-group label="Promotion Product" :ui="ui">
      
    </u-form-group>
  </div>

</template>
