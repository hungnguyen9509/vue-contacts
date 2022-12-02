<template>
  <form @submit.prevent="handleSearch" class="w-[90%] sm:w-[70%]">
    <div class="relative">
      <input
        data-cy="search-bar"
        type="text"
        placeholder="Search"
        class="border py-2 px-10 focus:outline-none rounded-md focus:bg-slate-100 h-full w-full"
        v-model="searchTerm"
      />
      <v-icon
        class="absolute left-0 top-1/2 -translate-y-1/2 translate-x-1/2"
        name="md-search-outlined"
        scale="1.2"
      ></v-icon>
      <v-icon
        v-if="searchTerm.length > 0"
        class="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer"
        name="md-clear-round"
        scale="1.2"
        @click="clearSearch"
      ></v-icon>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import useContactsStore from "../stores/contacts.store";

const searchTerm = ref("");
const handleSearch = () => {};
const store = useContactsStore();

const clearSearch = () => {
  searchTerm.value = "";
};

watch(searchTerm, (newSearchTerm) => {
  store.updateSearchTerm(newSearchTerm);
});
</script>
