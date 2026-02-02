<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
    form?: string;
  }>(),
  {
    type: 'button',
    disabled: false,
    form: undefined,
  },
);

const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>();

defineOptions({
  name: 'Button',
});
</script>

<template>
  <button
    class="custom-button"
    :type="type"
    :disabled="disabled"
    @click="emit('click', $event)"
    :form="form"
  >
    {{ text }}
  </button>
</template>

<style scoped></style>
