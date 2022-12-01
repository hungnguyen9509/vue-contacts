<script setup lang="ts">
import { onAuthStateChanged } from "firebase/auth";
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import MainLayout from "./components/MainLayout.vue";
import { auth } from "./firebase";
import useAuthStore from "./stores/auth.store";
const authStore = useAuthStore();
onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await authStore.getCurrentUser(user);
    }
  });
});
</script>

<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>
