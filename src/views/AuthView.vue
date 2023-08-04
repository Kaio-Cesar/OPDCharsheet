<template>
  <!-- bg-gradient-to-tr from-black to-zinc-600 -->
  <SigilWaterfall/>
  <div class=" h-screen flex justify-center items-center">
    <div class="flex flex-col gap-16  bg-zinc-800 p-4 pt-10 w-80 md:w-96 rounded-md shadow-xl shadow-black">

      <div class="flex flex-col items-center justify-center gap-4 ">
        <img 
          src="../assets/images/open_opd_charsheet.webp" 
          alt="Logo"
          class="w-32"
        >
        <div class="text-center">
          <h1 class="text-2xl font-bold text-zinc-50">OpenOPDCharsheet</h1>
          <p class="text-zinc-100">Connect with discord to play</p>
        </div>
      </div>

      <div class="  flex flex-col text-zinc-50 gap-4">
        <button 
          class="bg-blue-700 p-3"
          @click="authStore.SignIn"
        >
          Log in with Discord
        </button>
        <button 
          class="bg-blue-700 p-3"
          @click="authStore.SignOut"
        >
          Sign Out
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useAuthStore } from "../stores/Auth";

  const authStore = useAuthStore()
  const { userData } = storeToRefs(authStore)

  import SigilWaterfall from "@/components/SigilWaterfall.vue";
</script>

<style scoped>

</style>