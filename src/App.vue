<script setup lang="ts">
defineOptions({
  name: 'App'
})
</script>

<template>
  <div>
    <nav>
      <router-link to="/"></router-link>
      <router-link to="/saved"></router-link>
    </nav>

    <router-view />
  </div>
</template>

<style scoped>

</style>
