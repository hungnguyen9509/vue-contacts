<template>
  <div class="container mx-auto mt-6 px-6 sm:px-0">
    <header
      class="relative flex flex-col-reverse sm:flex-row items-center px-6 sm:px-0"
    >
      <div class="self-start mr-5 hidden sm:block">
        <v-icon
          name="md-arrowback-outlined"
          class="cursor-pointer"
          scale="1.2"
          title="back"
          @click="goBack"
        ></v-icon>
      </div>
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <div class="rounded-full border border-slate-500 w-32 h-32">
          <div
            class="w-full h-full object-cover rounded-full flex justify-center items-center text-3xl bg-blue-500 text-white"
          >
            {{ userInfo.username.charAt(0).toUpperCase() }}
          </div>
        </div>
        <div class="flex flex-col items-center sm:items-start">
          <span class="text-2xl">{{ userInfo?.username }}</span>
          <span class="text-lg text-gray-600">{{ userInfo?.email }}</span>
        </div>
      </div>
      <div class="sm:ml-auto w-full sm:w-auto self-end flex justify-between">
        <div class="sm:hidden">
          <v-icon
            name="md-arrowback-outlined"
            class="cursor-pointer"
            @click="goBack"
            scale="1.2"
            title="back"
          ></v-icon>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import useAuthStore from "@/stores/auth.store";
import { useRouter } from "vue-router";
const store = useAuthStore();
const { userInfo } = storeToRefs(store);
const router = useRouter();
const goBack = () => {
  router.go(-1);
};
</script>
