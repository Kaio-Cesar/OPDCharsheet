<template>
  <div class="bg-zinc-800 container mx-auto flex flex-col gap-4 justify-center items-center h-full">
    <h1 class="text-4xl font-bold text-zinc-50">OpenOPDCharsheet</h1>
    <div class="bg-zinc-900 p-10 border border-zinc-700 shadow-md flex flex-col text-zinc-50 gap-4">
      <button 
        class="bg-blue-700 p-3"
        @click="authStore.SignIn"
        >Log in with Discord</button>
      <button 
        class="bg-blue-700 p-3"
        @click="authStore.SignOut"
        >Sign Out</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useAuthStore } from "../stores/Auth";

  const authStore = useAuthStore()
  const { userData } = storeToRefs(authStore)

</script>

<style scoped>

</style>