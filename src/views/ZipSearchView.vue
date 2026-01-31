<script setup lang="ts">
import { ref } from 'vue'
import { getZipInfo } from '../api/zippopotam'

const zip = ref('')
const loading = ref(false)
const error = ref('')
const data = ref<any>(null)

async function searchZip() {
  error.value = ''
  data.value = null

  if (zip.value.length !== 5) {
    error.value = 'Enter a 5-digit ZIP'
    return
  }

  try {
    loading.value = true
    data.value = await getZipInfo(zip.value)
  } catch (e) {
    error.value = 'ZIP not found'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h2>ZIP Search</h2>

    <input v-model="zip" placeholder="Enter ZIP" />
    <button @click="searchZip">Search</button>

    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>

    <div v-if="data">
      <p><b>City:</b> {{ data.places[0]['place name'] }}</p>
      <p><b>State:</b> {{ data.places[0].state }}</p>
      <p><b>Country:</b> {{ data.country }}</p>
      <p><b>Latitude:</b> {{ data.places[0].latitude }}</p>
      <p><b>Longitude:</b> {{ data.places[0].longitude }}</p>
    </div>
  </div>
</template>
