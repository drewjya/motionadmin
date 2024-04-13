<script lang="ts" setup>
import { z } from "zod";

const formD = useFormd({
  schema: z.object({}),
  onSubmit: async (event, d) => {},
  onError: async (event, d) => {},
});
</script>

<template>
  <div>Page: product/add</div>
</template>

<style scoped></style>
