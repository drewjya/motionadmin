<script lang="ts" setup></script>

<template>
  <div class="flex flex-col h-screen">
    <v-navbar />
    <div class="flex h-[calc(100vh-5rem)]">
      <v-sidebar />
      <div class="p-4 grow overflow-auto h-full">
        <slot />
      </div>
    </div>
    <!-- <div class="flex grow">
      <v-sidebar />

      <div class="p-4 grow overflow-auto h-full">
        <slot />
      </div>
    </div> -->
  </div>
</template>

<style scoped></style>
