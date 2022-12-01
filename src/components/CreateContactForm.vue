<template>
  <div class="mx-6 sm:mx-2 border-t-slate-400">
    <form @submit="onSubmit" class="flex flex-col gap-3">
      <div>
        <div class="flex items-center gap-2 xl:w-96">
          <v-icon name="md-personoutline-outlined" scale="1.2"></v-icon>
          <div class="form-floating flex-1">
            <Field
              name="name"
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="name"
              placeholder="Name"
            />
            <label for="name" class="text-gray-700">Name</label>
          </div>
        </div>
        <ErrorMessage
          name="name"
          class="text-red-600 hover:text-red-700 ml-8 inline-block"
        />
      </div>

      <div>
        <div class="flex items-center gap-2 xl:w-96">
          <v-icon name="md-email-outlined" scale="1.2"></v-icon>
          <div class="form-floating flex-1">
            <Field
              name="email"
              type="email"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email"
              placeholder="Email"
            />
            <label for="email" class="text-gray-700">Email</label>
          </div>
        </div>
        <ErrorMessage
          name="email"
          class="text-red-600 hover:text-red-700 ml-8 inline-block"
        />
      </div>
      <FieldArray
        v-slot="{ remove, push, fields }"
        name="phone"
        key-path="number"
      >
        <div v-for="(field, id) in fields" :key="field.key">
          <div
            class="flex items-center gap-2"
            :class="[
              field.isLast && fields.length > 1
                ? 'xl:w-[446px]'
                : 'xl:w-[414px]',
            ]"
          >
            <v-icon
              name="md-phone-outlined"
              scale="1.2"
              :class="{ invisible: id > 0 }"
            ></v-icon>
            <div class="form-floating flex-1">
              <Field
                :id="`phone_${id}`"
                :name="`phone[${id}].number`"
                type="text"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Phone"
              />

              <label :for="`phone_${id}`" class="text-gray-700">Phone</label>
            </div>
            <v-icon
              @click="push({ number: '', type: 'Mobile' })"
              name="md-addcircleoutline-outlined"
              scale="1.2"
              class="cursor-pointer fill-blue-500 hover:fill-blue-600"
              v-if="field.isLast"
            ></v-icon>
            <v-icon
              @click="remove(id)"
              name="md-deleteoutline"
              scale="1.2"
              class="cursor-pointer fill-red-400 hover:fill-red-500"
              v-if="fields.length > 1"
            ></v-icon>
          </div>
          <ErrorMessage
            :name="`phone[${id}].number`"
            class="text-red-600 hover:text-red-700 ml-8 inline-block"
          />
        </div>
      </FieldArray>
      <div>
        <div class="flex items-center gap-2 xl:w-96">
          <v-icon name="md-cake-outlined" scale="1.2"></v-icon>
          <div class="form-floating flex-1">
            <Field
              name="birthday"
              type="date"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="birthday"
              placeholder="Birthday"
            />

            <label for="birthday" class="text-gray-700">Birthday</label>
          </div>
        </div>
        <ErrorMessage
          name="birthday"
          class="text-red-600 hover:text-red-700 ml-8"
        />
      </div>
      <button class="hidden" type="submit" ref="btnRef">hidden submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Contact } from "@/models/Contact";
import { createOrEditContact } from "@/services/contacts.service";
import { ErrorMessage, Field, FieldArray, useForm } from "vee-validate";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { array, date, object, string } from "yup";

const props = defineProps<{ contact?: Contact; avatar: File | null }>();
const btnRef = ref<HTMLButtonElement | null>(null);
const loading = ref(false);
const router = useRouter();
const validationSchema = object({
  name: string().required("Name is required"),
  email: string().email("Email must be a valid email"),
  phone: array().of(
    object({
      number: string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(8, "Must has more 8 digits"),
      type: string(),
    })
  ),
  birthday: date().nullable().notRequired().typeError("Must be a date"),
});

const initialValues = reactive<Partial<Contact>>({
  phone: [{ number: "", type: "Mobile" }],
});

const { setValues, handleSubmit } = useForm({
  initialValues,
  validationSchema,
});

const onSubmit = handleSubmit(async (values: any) => {
  const contact: Partial<Contact> = values;

  try {
    loading.value = true;
    await createOrEditContact(contact, props.avatar);
  } catch (error) {
    console.log(error);
  } finally {
    router.push({ name: "home" });
    loading.value = false;
  }
});

watch(
  () => props.contact,
  (contact) => {
    if (contact) {
      setValues(
        Object.assign(contact, { birthday: contact.birthday?.split("T")[0] })
      );
    }
  }
);

defineExpose({
  clickSubmit: () => btnRef.value?.click(),
  loading: loading,
});
</script>
