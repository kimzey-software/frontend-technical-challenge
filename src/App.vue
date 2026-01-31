<script setup lang="ts">
defineOptions({
  name: 'App'
})
</script>

<template>
  <div>
    <div class="w-full h-dvh flex flex-col justify-center items-center">
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
      <h1>Frontend challenge</h1>
    </div>

    <nav>
      <router-link to="/">Search</router-link> |
      <router-link to="/saved">Saved</router-link>
    </nav>

    <router-view />
  </div>
</template>

<style scoped>

</style>
