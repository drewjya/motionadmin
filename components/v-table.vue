<script lang="ts" setup>
import { ColumnType, type Column } from "../types/t-table";

const props = defineProps({
  columns: {
    type: Array<Column>,
    required: true,
  },
  items: {
    type: Object as PropType<any[]>,
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    required: false,
  },
});

const color = "red";
const columnLength = computed(() => props.columns.length);
const itemsLength = computed(() => props.items?.length ?? 0);

const getItem = (val: any, key: string) => {
  return val[key];
};
</script>

<template>
  <div class="w-full overflow-auto border dark:border-gray-400 max-h-[80vh]">
    <div class="w-full">
      <div class="grid-row">
        <div
          v-for="(column, index) in columns"
          class="dark:bg-slate-900 text-black dark:text-white py-2 text-center border dark:border-gray-400 bg-slate-300"
        >
          {{ column.label }}
        </div>
      </div>

      <div v-if="!loading || error === undefined">
        <div v-for="item in items" class="grid-row">
          <div
            v-for="(column, index) in columns"
            class="dark:bg-slate-700 text-black dark:text-white py-2 text-center border dark:border-gray-400"
          >
            <img
              v-if="column.type === ColumnType.IMAGE"
              :src="getItem(item, column.key)"
            />
            <p v-else-if="column.type === ColumnType.ARRAY">
              {{ getItem(item, column.key) }}
            </p>

            <p v-else>{{ getItem(item, column.key) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="loading"
    class="h-52 grid place-items-center border dark:border-gray-400"
  >
    <div>Loading...</div>
  </div>
  <div
    v-if="error"
    class="h-52 grid place-items-center border dark:border-gray-400"
  >
    <div>{{ error }}</div>
  </div>
</template>

<style scoped>
.grid-row {
  display: grid;

  grid-template-columns: repeat(
    v-bind(columnLength),
    minmax(200px, 1fr)
  ); /* Adjust minmax values as needed */
}
::-webkit-scrollbar {
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
