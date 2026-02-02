<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserZips } from '../api/zipBackend'
import { getOrCreateUserId } from '../services/userService'

const loading = ref(false)
const error = ref('')
const zips = ref<any[]>([])

onMounted(async () => {
  try {
    loading.value = true
    const userId = await getOrCreateUserId()
    zips.value = await getUserZips(userId)
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h2>Saved ZIP Codes</h2>

    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>

    <table v-if="!loading" border="1" cellpadding="6">
  <thead>
    <tr>
      <th>ZIP</th>
      <th>City</th>
      <th>State</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    <tr v-for="z in zips" :key="z.id">
      <td>{{ z.zipCode }}</td>
      <td>{{ z.city }}</td>
      <td>{{ z.state }}</td>
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  </tbody>
</table>
    
  </div>
</template>
