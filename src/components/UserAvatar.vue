<template>
  <DropdownMenu :menuItems="menuItems">
    <template v-slot:button>
      <button
        data-bs-toggle="dropdown"
        class="w-10 h-10 text-white bg-blue-500 rounded-full flex justify-center items-center cursor-pointer"
      >
        <span class="text-xl">{{
          userInfo.username.charAt(0).toUpperCase()
        }}</span>
      </button>
    </template>
  </DropdownMenu>
</template>
<script setup lang="ts">
import type { MenuItem } from "@/models/MenuItem";
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuthStore from "../stores/auth.store";
import DropdownMenu from "./DropdownMenu.vue";

const authStore = useAuthStore();
const router = useRouter();

const userInfo = authStore.$state.userInfo;

const menuItems = ref<MenuItem[]>([
  {
    text: "Profile",
    icon: { name: "io-person-circle" },
    action: () => {
      router.push({ name: "profile" });
    },
  },
  {
    text: "Logout",
    icon: { name: "md-logout-outlined" },
    action: async () => {
      await authStore.logout();
    },
  },
]);
</script>
