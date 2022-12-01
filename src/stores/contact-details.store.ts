import type { Contact } from "@/models/Contact";
import { getContact } from "@/services/contacts.service";
import { defineStore } from "pinia";
import { ref } from "vue";
import useLoadingStore from "./loading.store";

const useContactDetailsStore = defineStore("contact-details", () => {
  const contact = ref<Contact>();
  const loading = ref(false);

  const getContactDetails = async (id: string) => {
    const loadingStore = useLoadingStore();
    try {
      loadingStore.setLoading(true);
      loading.value = true;
      const data = await getContact(id);
      if (data) {
        contact.value = data;
      }
    } catch (e) {
      console.log(e);
    } finally {
      loadingStore.setLoading(false);
      loading.value = false;
    }
  };

  return {
    contact,
    loading,
    getContactDetails,
  };
});

export default useContactDetailsStore;
