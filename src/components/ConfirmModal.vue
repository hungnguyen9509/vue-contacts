<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-full mx-4 p-4 border rounded bg-white"
  >
    <span class="mr-8 text-2xl font-bold">
      <slot name="title"></slot>
    </span>
    <div class="flex-grow overflow-y-auto">
      <slot v-bind:params="params"></slot>
    </div>
    <div class="flex-shrink-0 flex justify-center items-center gap-5 pt-4">
      <ButtonUI
        data-cy="confirm"
        @click="$emit('confirm', close)"
        class="bg-red-500"
        >Confirm</ButtonUI
      >
      <ButtonUI data-cy="cancel" class="vfm-btn" @click="$emit('cancel', close)"
        >cancel</ButtonUI
      >
    </div>
  </vue-final-modal>
</template>

<script setup lang="ts">
import ButtonUI from "./ButtonUI.vue";
</script>
