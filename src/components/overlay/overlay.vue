<script setup lang="ts">
import { useOverlayStore } from './store/overlay-store.ts';

const overlayStore = useOverlayStore();

defineOptions({
  name: 'Overlay',
});
</script>

<template>
  <div
    v-if="overlayStore.openState"
    class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
  >
    <div class="flex items-center justify-center">
      <span class="text-white text-2xl">Loading...</span>
    </div>
  </div>
</template>

<style scoped></style>
