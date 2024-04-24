App.vue
<script setup>
import { ref } from "vue";
const items = ref(["assa", "csdsd", "dcsd", "sdds", "dsd"]);
function removeItem(toRemove) {
  items.value = items.value.filter((item) => item !== toRemove);
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="col-span-1 bg-red-400 h-40"></div>
    <div class="col-span-1 bg-red-400 h-40"></div>
    <div class="col-span-1 bg-red-400 h-40"></div>
  </div>
</template>
