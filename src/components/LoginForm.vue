<template>
  <Form @submit="handleSubmit" :validation-schema="schema">
    <div class="flex flex-row items-center justify-center lg:justify-start">
      <p class="text-lg mb-0 mr-4">Sign in with:</p>
      <button
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        class="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
      >
        <!-- Facebook -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          class="w-4 h-4"
        >
          <path
            fill="currentColor"
            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
          />
        </svg>
      </button>
    </div>

    <div
      class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
    >
      <p class="text-center font-semibold mx-4 mb-0">Or</p>
    </div>

    <!-- Email input -->
    <div class="mb-6">
      <Field
        v-model="userCredentials.email"
        name="email"
        type="email"
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        data-cy="email"
        placeholder="Email address"
      />
      <ErrorMessage name="email" class="text-red-600 hover:text-red-700" />
    </div>

    <!-- Password input -->
    <div class="mb-6">
      <Field
        v-model="userCredentials.password"
        name="password"
        type="password"
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        data-cy="password"
        placeholder="Password"
      />
      <ErrorMessage name="password" class="text-red-600 hover:text-red-700" />
    </div>

    <div class="mb-6">
      <span
        @click="emit('forgot-password')"
        class="text-gray-800 cursor-pointer"
        >Forgot password?</span
      >
    </div>

    <div class="text-center lg:text-left">
      <button
        data-cy="login"
        type="submit"
        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Login
      </button>
      <p class="text-sm font-semibold mt-2 pt-1 mb-0">
        Don't have an account?
        <span
          @click="emit('register')"
          class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out cursor-pointer"
          >Register</span
        >
      </p>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import type { AuthCredentials } from "@/models/AuthCredentials";
import { reactive } from "vue";
import useAuthStore from "../stores/auth.store";
import { string, object } from "yup";
const emit = defineEmits(["register", "forgot-password"]);

const schema = object({
  email: string()
    .required("Email is required")
    .email("Email must be a valid email"),
  password: string()
    .required("Password is requried")
    .min(8, "Password must be at least 8 characters"),
});

const store = useAuthStore();

const userCredentials = reactive<AuthCredentials>({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  store.login(userCredentials);
};
</script>
