import type { Contact } from "@/models/Contact";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { debounce } from "../utils/debounce";
import { getContacts } from "@/services/contacts.service";
import useLoadingStore from "./loading.store";

const useContactsStore = defineStore("contacts", () => {
  const contacts = ref<Contact[]>([]);
  const loading = ref(false);
  const searchTerm = ref("");

  const filteredContacts = computed(() => {
    return contacts.value.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        contact.phone.some(({ number }) => number.includes(searchTerm.value)) ||
        contact.email.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });
  });

  const updateSearchTerm = debounce((value: string) => {
    searchTerm.value = value;
  }, 300);

  const getAllContacts = async () => {
    const loadingStore = useLoadingStore();
    try {
      loadingStore.setLoading(true);
      loading.value = true;
      contacts.value = await getContacts();
    } catch (e) {
      console.log(e);
    } finally {
      loadingStore.setLoading(false);
      loading.value = false;
    }
  };

  return {
    contacts,
    filteredContacts,
    loading,
    getAllContacts,
    updateSearchTerm,
  };
});

export default useContactsStore;
