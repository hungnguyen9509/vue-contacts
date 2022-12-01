import { defineStore } from "pinia";
import { ref } from "vue";

const useLoadingStore = defineStore("global-loading", () => {
  const isLoading = ref(false);
  const pendingRequest = ref(0);

  const setLoading = (value: boolean) => {
    if (value) {
      pendingRequest.value += 1;
      isLoading.value = value;
    } else {
      pendingRequest.value -= 1;
    }

    if (pendingRequest.value <= 0) {
      isLoading.value = value;
    }
  };

  return { isLoading, setLoading };
});

export default useLoadingStore;
