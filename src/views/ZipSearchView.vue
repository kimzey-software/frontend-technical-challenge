<script setup lang="ts">
import { ref } from 'vue'
import { getZipInfo } from '../api/zippopotam'
import { getOrCreateUserId } from '../services/userService'
import { saveZip } from '../api/zipBackend'


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
async function onSave() {
  const userId = await getOrCreateUserId()

  await saveZip({
    userId: Number(userId),
    zipCode: String(zip.value),
    city: data.value.places[0]['place name'],
    state: data.value.places[0]['state abbreviation'],
    latitude: Number(data.value.places[0].latitude),
    longitude: Number(data.value.places[0].longitude),
    country: data.value.country,
    observations: "",
})
  alert('Saved!')
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
      <button @click="onSave">Save ZIP</button>
      

    </div>
  </div>
</template>
