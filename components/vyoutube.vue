<script setup lang="ts">
// Import the 'usePlayer' function
import { usePlayer } from "@vue-youtube/core";
import { ref } from "vue";

// Use a template ref to reference the target element
const youtube = ref();

const props = defineProps({
  videoId: {
    type: String,
    required: true,
  },
});

// Call the 'usePlayer' function with the desired video ID and target ref
usePlayer(props.videoId, youtube, { width: 380, height: 180 });
</script>

<template>
  <div ref="youtube" />
</template>
