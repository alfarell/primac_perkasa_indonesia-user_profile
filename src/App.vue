<script setup lang="ts">
  import BaseNavbar from "./components/layout/BaseNavbar.vue";
  import ProfileForm from "./components/profile/ProfileForm.vue";
</script>

<template>
  <div class="w-full min-h-screen flex flex-col">
    <BaseNavbar />
    <div class="container mx-auto py-2">
      <div class="flex-2 rounded-lg shadow-lg p-8 bg-card">
        <ProfileForm />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
