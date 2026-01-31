<script setup lang="ts">
defineOptions({
  name: 'App'
})
</script>

<template>
  <div>
    <nav>
      <router-link to="/">Search</router-link> |
      <router-link to="/saved">Saved</router-link>
    </nav>

    <router-view />
  </div>
</template>

<style scoped>

</style>
