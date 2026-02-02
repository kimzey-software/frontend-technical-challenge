<template>
    <div v-if="localToggle" id="toast-success"
        class="flex items-center w-full max-w-sm p-4 text-body bg-neutral-primary-soft rounded-base shadow-xs border border-default"
        role="alert">
        <div class="ms-3 text-sm font-normal">{{ message }}</div>
        <button type="button" @click="onCloseToast()"
            class="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none"
            data-dismiss-target="#toast-success" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
        </button>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
    toggle: boolean;
    message: string;
}>();
const localToggle = computed(() => props.toggle);
const emit = defineEmits<{
    (e: 'onCloseToast'): void
}>();
function onCloseToast() {
    emit('onCloseToast');
}
</script>