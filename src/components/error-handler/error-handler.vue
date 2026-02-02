<script setup lang="ts">
defineOptions({
  name: 'ErrorHandler',
});

const props = defineProps<{
  statusCode?: number;
}>();
</script>

<template>
  <div>
    <strong v-if="statusCode == 404">Zip code not found</strong>
    <strong v-else></strong>
  </div>
</template>

<style scoped></style>
