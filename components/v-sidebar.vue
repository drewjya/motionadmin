<script lang="ts" setup>
const auth = useAuth();
</script>

<template>
  <div class="hidden md:block h-full">
    <div
      class="h-full flex flex-col dark:bg-slate-900 bg-slate-400 pb-8 justify-between items-center"
    >
      <div class="pb-4 flex flex-col justify-between w-40">
        <v-link />
      </div>
      <div class="px-4 w-full">
        <u-button
          class="w-full justify-center"
          dynamic
          icon="i-solar-logout-2-bold"
          @click="auth.logout()"
          >Logout</u-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
