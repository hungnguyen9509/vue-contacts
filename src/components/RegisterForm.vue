<template>
  <Form @submit="handleSubmit" :validation-schema="schema">
    <div
      class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
    >
      <p class="text-center font-semibold mx-4 mb-0">Register</p>
    </div>

    <div class="mb-6">
      <Field
        v-model="registerData.username"
        name="name"
        type="text"
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="name"
        placeholder="Username"
        autocomplete="new-password"
      />
      <ErrorMessage name="name" class="text-red-600 hover:text-red-700" />
    </div>

    <div class="mb-6">
      <Field
        v-model="registerData.email"
        name="email"
        type="email"
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="email"
        placeholder="Email address"
        autocomplete="new-password"
      />
      <ErrorMessage name="email" class="text-red-600 hover:text-red-700" />
    </div>

    <div class="mb-6">
      <Field
        v-model="registerData.password"
        name="password"
        type="password"
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="password"
        placeholder="Password"
        autocomplete="new-password"
      />
      <ErrorMessage name="password" class="text-red-600 hover:text-red-700" />
    </div>

    <div class="mb-6">
      <Field
        name="repassword"
        type="password"
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="repassword"
        placeholder="Repeat password"
        autocomplete="new-password"
      />
      <ErrorMessage name="repassword" class="text-red-600 hover:text-red-700" />
    </div>

    <div class="text-center lg:text-left">
      <button
        type="submit"
        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Register
      </button>
      <p class="text-sm font-semibold mt-2 pt-1 mb-0">
        Already have an account
        <span
          @click="emit('login')"
          class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out cursor-pointer"
          >Login</span
        >
      </p>
    </div>
  </Form>
</template>

<script setup lang="ts">
import type { RegisterCredentials } from "@/models/RegisterCredentials";
import { ErrorMessage, Field, Form } from "vee-validate";
import { reactive } from "vue";
import { object, string } from "yup";
import useAuthStore from "../stores/auth.store";
const emit = defineEmits(["login"]);

const schema = object({
  name: string().required("Username is required"),
  email: string()
    .required("Email is required")
    .email("Email must be a valid email"),
  password: string()
    .required("Password is requried")
    .min(8, "Password must be at least 8 characters"),
  repassword: string()
    .required("Repeat password is requried")
    .test("password-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

const store = useAuthStore();

const registerData = reactive<RegisterCredentials>({
  username: "",
  email: "",
  password: "",
});

const handleSubmit = async () => {
  await store.register(registerData);
};
</script>
