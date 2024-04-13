App.vue
<script setup>
import { ref } from "vue";
const items = ref(["assa", "csdsd", "dcsd", "sdds", "dsd"]);
function removeItem(toRemove) {
  items.value = items.value.filter((item) => item !== toRemove);
}
</script>

<template>
  <h5>Click emojis to remove them.</h5>
  <ul>
    <p>{{ items }}</p>
  </ul>
</template>
