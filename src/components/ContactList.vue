<template>
  <div class="container mx-auto mb-6">
    <ul
      class="flex flex-col gap-2 mx-auto w-[90%] sm:w-[70%] max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-green-900 scrollbar-track-transparent"
    >
      <template v-for="(contact, idx) in filteredContacts" :key="contact.id">
        <ContactItem
          :contact="contact"
          :idx="idx"
          @delete="showConfirmModal"
          @edit="goToContactEdit"
          @view-detail="goToContactDetails"
        />
      </template>
    </ul>
  </div>
  <ConfirmModal
    v-model="show"
    @confirm="confirmDeleteContact"
    @cancel="cancelDeleteContact"
  >
    <p>Are you sure you want to delete this contact?</p>
  </ConfirmModal>
</template>

<script setup lang="ts">
import ContactItem from "@/components/ContactItem.vue";
import { deleteContact } from "@/services/contacts.service";
import useContactsStore from "@/stores/contacts.store";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ConfirmModal from "./ConfirmModal.vue";

const router = useRouter();
const store = useContactsStore();
const show = ref(false);
const deleteContactId = ref("");
const { filteredContacts } = storeToRefs(store);

const confirmDeleteContact = async (close: any) => {
  try {
    await deleteContact(deleteContactId.value);
    await store.getAllContacts();
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

const goToContactEdit = (id: string) => {
  router.push({ name: "contact-create", query: { edit: id } });
};

const goToContactDetails = (id: string) => {
  router.push({
    name: "contact-details",
    params: {
      contactId: id,
    },
  });
};

onMounted(async () => {
  await store.getAllContacts();
});
</script>
