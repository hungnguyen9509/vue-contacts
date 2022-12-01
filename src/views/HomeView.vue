<template>
  <main class="container mx-auto mt-6">
    <section class="flex flex-col items-center gap-5">
      <SearchBar class="flex-shrink" />
      <section class="w-[90%] sm:w-[70%]">
        <ButtonUI @click="navigationToCreateContact">
          <div class="flex gap-1 items-center">
            <v-icon name="md-addcircleoutline-outlined"></v-icon
            ><span>Create Contact</span>
          </div>
        </ButtonUI>
      </section>
    </section>
    <section class="mt-6">
      <ContactList />
    </section>
  </main>
</template>

<script setup lang="ts">
import SearchBar from "../components/SearchBar.vue";
import ContactList from "../components/ContactList.vue";
import ButtonUI from "../components/ButtonUI.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const navigationToCreateContact = () => {
  router.push({ name: "contact-create" });
};
</script>
