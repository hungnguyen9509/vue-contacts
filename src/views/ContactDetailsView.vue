<template>
  <div v-if="loading">Loading...</div>
  <div v-if="!loading && contact" class="container mx-auto mt-6 min-h-full">
    <header
      class="relative flex flex-col-reverse sm:flex-row items-center px-6 sm:px-0"
    >
      <div class="self-start mr-5 hidden sm:block">
        <v-icon
          name="md-arrowback-outlined"
          class="cursor-pointer"
          scale="1.2"
          title="back"
          @click="backToHome"
        ></v-icon>
      </div>
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <div class="rounded-full border border-slate-500 w-32 h-32">
          <img
            :src="contact.avatar"
            :alt="contact.name"
            class="w-full h-full object-cover rounded-full"
          />
        </div>
        <div class="flex flex-col">
          <span class="text-2xl">{{ contact.name }}</span>
        </div>
      </div>
      <div class="sm:ml-auto w-full sm:w-auto self-end flex justify-between">
        <div class="sm:hidden">
          <v-icon
            name="md-arrowback-outlined"
            class="cursor-pointer"
            @click="backToHome"
            scale="1.2"
            title="back"
          ></v-icon>
        </div>
        <div class="flex items-center gap-5">
          <v-icon
            name="md-starborder-outlined"
            class="fill-gray-500 hover:fill-yellow-500 cursor-pointer"
            scale="1.2"
            title="Add To Favorites"
          ></v-icon>
          <DropdownMenu :menuItems="menuItems">
            <template v-slot:button>
              <v-icon
                data-bs-toggle="dropdown"
                name="md-morevert-outlined"
                class="fill-gray-500 hover:fill-black cursor-pointer"
                scale="1.2"
                title="More"
              ></v-icon>
            </template>
          </DropdownMenu>
          <ButtonUI class="hidden sm:inline-block" @click="goToContactEdit"
            >Edit</ButtonUI
          >
          <ButtonFloatUI
            class="fixed bottom-5 right-5 sm:hidden"
            @click="goToContactEdit"
            ><v-icon name="md-modeedit-outlined"></v-icon
          ></ButtonFloatUI>
        </div>
      </div>
    </header>
    <hr class="my-8" />
    <main>
      <InformationContactCard :contact="contact" />
      <ConfirmModal
        v-model="show"
        @confirm="confirmDeleteContact"
        @cancel="cancelDeleteContact"
      >
        <p>Are you sure you want to delete this contact?</p>
      </ConfirmModal>
    </main>
  </div>
</template>

<script setup lang="ts">
import ConfirmModal from "@/components/ConfirmModal.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
import type { MenuItem } from "@/models/MenuItem";
import { deleteContact } from "@/services/contacts.service";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ButtonFloatUI from "../components/ButtonFloatUI.vue";
import ButtonUI from "../components/ButtonUI.vue";
import InformationContactCard from "../components/InformationContactCard.vue";
import useContactDetailsStore from "../stores/contact-details.store";

const store = useContactDetailsStore();
const router = useRouter();
const route = useRoute();
const { contact, loading } = storeToRefs(store);
const show = ref(false);
const deleteContactId = ref("");

const backToHome = () => {
  router.go(-1);
};

const goToContactEdit = () => {
  router.push({
    name: "contact-create",
    query: { edit: route.params.contactId as string },
  });
};

const menuItems = ref<MenuItem[]>([
  {
    text: "Delete",
    icon: { name: "md-deleteoutline" },
    action: () => {
      showConfirmModal(route.params.contactId as string);
    },
  },
]);

const confirmDeleteContact = async (close: any) => {
  try {
    await deleteContact(deleteContactId.value);
    router.go(-1);
  } catch (error) {
    console.log(error);
  } finally {
    close();
  }
};

const cancelDeleteContact = (close: any) => {
  close();
};

const showConfirmModal = async (contactId: string) => {
  show.value = true;
  deleteContactId.value = contactId;
};

onMounted(() => {
  store.getContactDetails(route.params.contactId as string);
});
</script>
