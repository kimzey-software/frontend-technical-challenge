<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  readonly?: boolean;
}>();

defineOptions({
  name: 'Input',
});

const { value, errorMessage } = useField(props.name);
</script>

<template>
  <div>
    <label class="block mb-2 text-sm font-medium" v-if="label" :for="name">{{
      label
    }}</label>
    <div class="custom-form-input-container">
      <input
        :placeholder="placeholder"
        :id="name"
        autocomplete="off"
        class="custom-form-input"
        :type="type ?? 'text'"
        :name="name"
        v-model="value"
        :disabled="readonly"
      />
    </div>
    <p v-if="errorMessage" class="text-red-600 text-sm mt-1">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped></style>
