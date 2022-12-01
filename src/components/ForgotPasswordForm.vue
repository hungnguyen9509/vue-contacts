<template>
  <Form @submit="handleSubmit" :validation-schema="schema">
    <!-- Email input -->
    <div>
      <h1 class="text-xl mb-4">Please provide your email</h1>
    </div>
    <div class="mb-6">
      <Field
        v-model="userEmail.email"
        name="email"
        type="email"
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="exampleFormControlInput2"
        placeholder="Email address"
      />
      <ErrorMessage name="email" class="text-red-600 hover:text-red-700" />
    </div>

    <div class="text-center lg:text-left">
      <button
        type="submit"
        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Submit
      </button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { reactive } from "vue";
import useAuthStore from "../stores/auth.store";
import { string, object } from "yup";
const emit = defineEmits(["login"]);

const schema = object({
  email: string()
    .required("Email is required")
    .email("Email must be a valid email"),
});

const authStore = useAuthStore();

const userEmail = reactive<{ email: string }>({
  email: "",
});

const handleSubmit = async () => {
  await authStore.forgotPassword(userEmail);
  emit("login");
};
</script>
