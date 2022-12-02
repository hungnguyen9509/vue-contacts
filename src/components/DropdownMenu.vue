<template>
  <div class="flex justify-center">
    <div>
      <div class="dropdown relative">
        <slot name="button"></slot>
        <ul
          class="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
        >
          <template v-for="item in menuItems" :key="item.text">
            <li @click="item.action" :data-cy="item.text">
              <div
                class="dropdown-item text-sm py-2 px-4 font-normal flex gap-1 w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <v-icon :name="item.icon?.name"></v-icon>
                <span>{{ item.text }}</span>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from "@/models/MenuItem";
defineProps<{ menuItems: MenuItem[] }>();
</script>
