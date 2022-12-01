<template>
  <div class="border p-8 rounded-md bg-slate-50 mx-6 sm:mx-0">
    <h2 class="text-xl">Information Contact</h2>
    <div class="flex flex-col gap-1 mt-2">
      <p class="flex gap-3">
        <span>
          <v-icon name="md-mail-outlined"></v-icon>
        </span>
        <span class="text-blue-500">{{ contact.email }}</span>
      </p>
      <div v-if="contact.phone?.length > 0">
        <p
          v-for="(phone, index) in contact.phone"
          :key="phone.number"
          class="flex gap-3 items-center"
        >
          <span :class="{ invisible: index !== 0 }">
            <v-icon name="md-phone-outlined"></v-icon>
          </span>
          <span class="text-green-900">
            {{ phone.number }} .
            <span class="text-gray-500 text-sm self-end">
              {{ phone.type }}
            </span>
          </span>
        </p>
      </div>
      <div v-else>
        <p class="flex gap-3 items-center">
          <span>
            <v-icon name="md-phone-outlined"></v-icon>
          </span>
          <span
            class="text-blue-500 hover:text-blue-400 cursor-pointer"
            @click="goToContactEdit"
            >Add phone number</span
          >
        </p>
      </div>
      <p class="flex gap-3">
        <span>
          <v-icon name="md-cake-outlined"></v-icon>
        </span>
        <span v-if="contact.birthday">{{
          new Date(contact.birthday).toLocaleDateString()
        }}</span>
        <span
          v-else
          class="text-blue-500 hover:text-blue-400 cursor-pointer"
          @click="goToContactEdit"
          >Add birthday</span
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Contact } from "@/models/Contact";
import { useRoute, useRouter } from "vue-router";
defineProps<{ contact: Contact }>();

const router = useRouter();
const route = useRoute();

const goToContactEdit = () => {
  router.push({
    name: "contact-create",
    query: { edit: route.params.contactId as string },
  });
};
</script>
