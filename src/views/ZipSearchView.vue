<script setup lang="ts">
import { ref } from 'vue'
import { getZipInfo } from '../api/zippopotam'
import { getOrCreateUserId } from '../services/userService'
import { saveZip } from '../api/zipBackend'
import { getUserZips } from '../api/zipBackend'

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
  const existing = await getUserZips(String(userId))
  const already = existing.some((z: any) => String(z.zipCode) === String(zip.value))
  if (already) {
    error.value = 'This ZIP is already saved.'
    return
  }
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
  <div class="p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-semibold mb-4">ZIP Search</h2>

    <div class="flex gap-2 mb-3">
      <input
        v-model="zip"
        placeholder="Enter ZIP"
        class="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring"
      />
      <button
        @click="searchZip"
        :disabled="loading"
        class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        Search
      </button>
    </div>

    <p v-if="loading" class="text-sm text-gray-600">Loading...</p>

    <p
      v-if="error"
      class="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
    >
      {{ error }}
    </p>

    <div v-if="data" class="rounded-lg border p-4 space-y-2">
      <p><b>City:</b> {{ data.places[0]['place name'] }}</p>
      <p><b>State:</b> {{ data.places[0].state }}</p>
      <p><b>Country:</b> {{ data.country }}</p>
      <p><b>Latitude:</b> {{ data.places[0].latitude }}</p>
      <p><b>Longitude:</b> {{ data.places[0].longitude }}</p>

      <button
        @click="onSave"
        :disabled="loading"
        class="mt-3 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
      >
        Save ZIP
      </button>
    </div>
  </div>
</template>
