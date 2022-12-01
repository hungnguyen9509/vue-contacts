<template>
  <MainHeader v-if="user" />
  <slot></slot>
  <div
    v-if="isLoading"
    class="absolute top-0 left-0 right-0 bottom-0 bg-slate-100 opacity-50 flex justify-center items-center"
  >
    <GlobalLoader />
  </div>
</template>

<script setup lang="ts">
import useAuthStore from "@/stores/auth.store";
import useLoadingStore from "@/stores/loading.store";
import { storeToRefs } from "pinia";
import GlobalLoader from "./GlobalLoader.vue";
import MainHeader from "./MainHeader.vue";
const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const { user } = storeToRefs(authStore);
const { isLoading } = storeToRefs(loadingStore);
</script>
