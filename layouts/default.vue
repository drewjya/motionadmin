<script lang="ts" setup></script>

<template>
  <div class="flex flex-col h-screen">
    <v-navbar />
    <div class="flex grow">
      <v-sidebar />

      <div class="p-4 grow overflow-x-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
