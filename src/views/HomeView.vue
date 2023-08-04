<template>
  <BaseNavbar/>
  <div class="container">
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/Auth">Auth</RouterLink>
  </div>
</template>

<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import BaseNavbar from '../components/BaseNavbar.vue'
</script>

<style scoped>

</style>