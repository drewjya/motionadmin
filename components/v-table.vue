<script lang="ts" setup>
const loading = ref(false);

const columns = [
  {
    key: "name",
    label: "Name",

    color: getRandomHexColor(),
  },
  {
    key: "price",
    label: "Price",
    color: getRandomHexColor(),
  },
  {
    key: "stock",
    label: "Stock",
    color: getRandomHexColor(),
  },
  {
    key: "stock",
    label: "Stock",
    color: getRandomHexColor(),
  },
  {
    key: "stock",
    label: "St ashhshaock",
    color: getRandomHexColor(),
  },
  {
    key: "stock",
    label: "Sto ashsahshack",
    color: getRandomHexColor(),
  },
  {
    key: "stock",
    label: "Stock",
    color: getRandomHexColor(),
  },
];

const color = "red";
const columnLength = computed(() => columns.length);
function getRandomHexColor(): string {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const hexColor = `bg-[#${red.toString(16).padStart(2, "0")}${green
    .toString(16)
    .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}]`;
  return hexColor;
}
</script>

<template>
  <div class="w-max">
    <div v-for="(column, index) in columns">
      {{ column.label }}
    </div>
  </div>
</template>

<style scoped>
.grid-row {
  display: grid;
  overflow-x: auto;

  background-color: v-bind(color);
  grid-template-columns: repeat(
    v-bind(columnLength),
    minmax(150px, 1fr)
  ); /* Adjust minmax values as needed */
  gap: 10px;
  border: 1px solid #ccc;

  /* overflow-x: auto; */
}
</style>
