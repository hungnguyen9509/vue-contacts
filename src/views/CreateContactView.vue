<template>
  <div class="container mx-auto mt-6 min-h-full">
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
        <div class="rounded-full border border-slate-500 relative w-32 h-32">
          <img
            :src="avatar"
            :alt="contact?.name || 'default-avatar'"
            class="w-full h-full object-cover rounded-full"
          />
          <label
            for="imgInput"
            class="group absolute w-full h-full hover:bg-gray-700/20 flex justify-center items-center top-0 left-0 rounded-full cursor-pointer"
          >
            <v-icon
              name="md-photocamera-outlined"
              class="invisible group-hover:visible"
            ></v-icon>
            <input
              type="file"
              class="hidden"
              id="imgInput"
              accept="image/*"
              @change="onUploadImage($event)"
            />
          </label>
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
          <ButtonUI
            type="submit"
            class="hidden sm:inline-block"
            :class="{
              'cursor-wait': formRef?.loading,
            }"
            @click="submitCreateContactForm"
            :disabled="formRef?.loading"
            >Save</ButtonUI
          >
          <ButtonFloatUI
            class="fixed bottom-5 right-5 sm:hidden"
            @click="submitCreateContactForm"
            ><v-icon name="md-save-outlined"></v-icon
          ></ButtonFloatUI>
        </div>
      </div>
    </header>
    <hr class="my-8" />
    <main>
      <CreateContactForm ref="formRef" :contact="contact" :avatar="avatarImg" />
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Contact } from "@/models/Contact";
import { getContact } from "@/services/contacts.service";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ButtonFloatUI from "../components/ButtonFloatUI.vue";
import ButtonUI from "../components/ButtonUI.vue";
import CreateContactForm from "../components/CreateContactForm.vue";

const formRef = ref<InstanceType<typeof CreateContactForm> | null>(null);
const contact = ref<Contact>();
const router = useRouter();
const route = useRoute();
const avatar = ref(
  "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp"
);
const avatarImg = ref<File | null>(null);
const onUploadImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];
  if (file) {
    avatarImg.value = file;
    avatar.value = URL.createObjectURL(file);
  }
};

onMounted(async () => {
  if (route.query.edit) {
    const id = route.query.edit as string;
    const data = await getContact(id);
    if (data) {
      contact.value = data;
      avatar.value = data.avatar;
    }
  }
});

const backToHome = () => {
  router.go(-1);
};

const submitCreateContactForm = () => {
  formRef.value?.clickSubmit();
};
</script>
