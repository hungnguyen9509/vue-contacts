<template>
  <li
    class="flex items-center border rounded-md py-8 px-4 cursor-pointer hover:bg-slate-100 transition-[background]"
    :data-cy="'ContactItem-' + contact.id"
    @click="$emit('viewDetail', contact.id)"
  >
    <div class="w-20 h-20 border border-slate-500 rounded-full">
      <img
        data-cy="contact-avatar"
        :src="contact.avatar"
        :alt="'avatar ' + contact.name"
        class="w-full h-full object-cover rounded-full"
      />
    </div>
    <div class="flex flex-col ml-2">
      <span
        class="text-base sm:text-lg drop-shadow-md"
        data-cy="contact-name"
        >{{ contact.name }}</span
      >
      <div>
        <span class="text-green-900 text-xs sm:text-sm" data-cy="contact-phone"
          >{{ contact.phone[0]?.number }}
        </span>
        <span class="text-blue-400"> | </span>
        <span
          v-if="contact.email"
          class="text-blue-400 text-xs sm:text-sm"
          data-cy="contact-email"
        >
          {{ contact.email }}</span
        >
      </div>
    </div>
    <div class="ml-auto">
      <ul class="flex items-center gap-1 sm:gap-2">
        <li
          data-cy="edit"
          @click.stop="$emit('edit', contact.id)"
          class="hover:bg-blue-400 rounded-full p-2 group transition-all duration-200"
        >
          <v-icon
            title="Edit"
            name="md-modeedit-outlined"
            scale="1.3"
            class="cursor-pointer fill-gray-400 group-hover:fill-white transition-all duration-200"
          ></v-icon>
        </li>
        <li
          data-cy="delete"
          @click.stop="$emit('delete', contact.id)"
          class="hover:bg-red-400 rounded-full p-2 group transition-all duration-200"
        >
          <v-icon
            title="Remove"
            name="md-deleteoutline"
            scale="1.3"
            class="cursor-pointer fill-gray-400 group-hover:fill-white transition-all duration-200"
          ></v-icon>
        </li>
      </ul>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Contact } from "@/models/Contact";

defineEmits(["delete", "edit", "view-detail"]);
defineProps<{ contact: Contact }>();
</script>
