<template>
    <div class="relative z-0 w-full mb-5 group">
        <component v-model="initialValue" :value="initialValue" @input="emitEvent" :is="tag" placeholder=""
            :required="required" :type="type" :id="fieldId" :name="fieldId" autocomplete="false"
            class="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer">
        </component>
        <label :for="fieldId"
            class="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{{
                label }}</label>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { InputType } from '../../models/InputType';
const props = withDefaults(defineProps<{
    fieldId: string;
    type: string;
    label: string;
    required?: boolean;
    tag?: InputType;
    modelValue?: string | number;
}>(), {
    tag: InputType.Text,
});
const initialValue = ref(props.modelValue ?? '');
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | null): void
}>();
function emitEvent(e: Event) {
    initialValue.value = (e.target as HTMLInputElement).value;
    emit('update:modelValue', initialValue.value);
}
</script>