<template>
  <header class="h-16 shadow-md bg-white px-6">
    <div class="container mx-auto h-full flex justify-between items-center">
      <RouterLink to="/" class="flex items-center gap-2">
        <v-icon name="io-person-circle" scale="2.4" fill="green"></v-icon>
        <span class="text-xl text-green-700 font-semibold">Contacts</span>
      </RouterLink>

      <div class="flex items-center gap-4">
        <UserAvatar />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import UserAvatar from "./UserAvatar.vue";
</script>
