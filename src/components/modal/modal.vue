<script setup lang="ts">
import { FwbModal } from 'flowbite-vue';
import Button from '../button/button.vue';
defineOptions({
  name: 'Modal',
});

const props = withDefaults(
  defineProps<{
    close: () => void;
    show: () => void;
    open: boolean;
    nameForm: string;
    actionLabel: string;
    title: string;
  }>(),
  {
    open: false,
  },
);
</script>

<template>
  <fwb-modal v-if="open" @close="close">
    <template #header>
      <div
        class="flex items-center text-lg font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ title }}
      </div>
    </template>
    <template #body>
      <slot />
    </template>
    <template #footer>
      <div class="flex justify-end">
        <div class="basis-0/3">
          <Button :text="actionLabel" type="submit" :form="nameForm" />
        </div>
      </div>
    </template>
  </fwb-modal>
</template>

<style scoped></style>
