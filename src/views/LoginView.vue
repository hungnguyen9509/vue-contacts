<template>
  <section class="h-screen">
    <div class="px-6 h-full text-gray-800">
      <div
        class="flex flex-col sm:flex-row xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
      >
        <div
          class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
        >
          <h1 class="text-2xl text-center lg:text-left lg:text-4xl mb-2">
            Contact App
          </h1>
          <img
            src="https://c1.wallpaperflare.com/preview/755/852/33/diary-appointment-address-pen.jpg"
            class="w-full rounded-xl"
            alt="Sample image"
          />
        </div>
        <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
          <LoginForm
            @register="form = 'register'"
            @forgot-password="form = 'forgot-password'"
            v-if="form === 'login'"
          />
          <RegisterForm
            @login="form = 'login'"
            v-else-if="form === 'register'"
          />
          <ForgotPasswordForm
            @login="form = 'login'"
            v-else-if="form === 'forgot-password'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ForgotPasswordForm from "@/components/ForgotPasswordForm.vue";
import { ref } from "vue";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";
const form = ref("login");
</script>
