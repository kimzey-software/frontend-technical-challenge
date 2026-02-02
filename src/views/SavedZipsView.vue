<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserZips } from '../api/zipBackend'
import { getOrCreateUserId } from '../services/userService'
import { computed } from 'vue'
import { updateZip, deleteZip } from '../api/zipBackend'

const loading = ref(false)
const error = ref('')
const zips = ref<any[]>([])
const page = ref(1)
const perPage = ref(5)
const saving = ref(false)

const paginatedZips = computed(() => {
  const start = (page.value - 1) * perPage.value
  return zips.value.slice(start, start + perPage.value)
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(zips.value.length / perPage.value))
)

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

async function onDelete(id: string) {
  if (!confirm('Delete this ZIP?')) return

  try {
    saving.value = true
    await deleteZip(id)

    zips.value = zips.value.filter((x: any) => String(x.id) !== String(id))

    const pagesNow = Math.max(1, Math.ceil(zips.value.length / perPage.value))
    if (page.value > pagesNow) page.value = pagesNow
  } catch (e: any) {
    error.value = e.message
  } finally {
    saving.value = false
  }
}

const editingId = ref<string | null>(null)
const obsDraft = ref('')

function onEditStart(row: any) {
  editingId.value = String(row.id)
  obsDraft.value = row.observations || ''
}

function onEditCancel() {
  editingId.value = null
  obsDraft.value = ''
}

async function onEditSave(row: any) {
  try {
    saving.value = true
    await updateZip(String(row.id), { observations: obsDraft.value })

    // update UI
    const idx = zips.value.findIndex((x: any) => x.id === row.id)
    if (idx >= 0) zips.value[idx].observations = obsDraft.value

    onEditCancel()
  } catch (e: any) {
    error.value = e.message
  } finally {
    saving.value = false
  }
}

</script>

<template>
  <div class="p-6 max-w-5xl mx-auto">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-semibold">Saved ZIP Codes</h2>
    </div>

    <p v-if="loading" class="text-sm text-gray-600">Loading...</p>

    <p
      v-if="error"
      class="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
    >
      {{ error }}
    </p>

    <div v-if="!loading" class="overflow-x-auto rounded-lg border">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 text-gray-700">
          <tr>
            <th class="px-4 py-3 text-left font-medium">ZIP</th>
            <th class="px-4 py-3 text-left font-medium">City</th>
            <th class="px-4 py-3 text-left font-medium">State</th>
            <th class="px-4 py-3 text-left font-medium">Observations</th>
            <th class="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y">
          <tr v-for="z in paginatedZips" :key="z.id" class="hover:bg-gray-50">
            <td class="px-4 py-3">{{ z.zipCode }}</td>
            <td class="px-4 py-3">{{ z.city }}</td>
            <td class="px-4 py-3">{{ z.state }}</td>

            <td class="px-4 py-3">
              <!-- Edit mode -->
              <div v-if="editingId === String(z.id)" class="flex items-center gap-2">
                <input
                  v-model="obsDraft"
                  class="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring"
                  placeholder="Add notes..."
                />
                <button
                  class="rounded-md bg-green-600 px-3 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                  :disabled="saving"
                  @click="onEditSave(z)"
                >
                  Save
                </button>
                <button
                  class="rounded-md border px-3 py-2 hover:bg-gray-50 disabled:opacity-50"
                  :disabled="saving"
                  @click="onEditCancel"
                >
                  Cancel
                </button>
              </div>

              <!-- Read mode -->
              <span v-else class="text-gray-700">
                {{ z.observations || '-' }}
              </span>
            </td>

            <td class="px-4 py-3 text-right">
              <div class="flex justify-end gap-2">
                <button
                  v-if="editingId !== String(z.id)"
                  class="rounded-md border px-3 py-2 hover:bg-gray-50 disabled:opacity-50"
                  :disabled="saving"
                  @click="onEditStart(z)"
                >
                  Edit
                </button>

                <button
                  class="rounded-md bg-red-600 px-3 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                  :disabled="saving"
                  @click="onDelete(String(z.id))"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="paginatedZips.length === 0">
            <td class="px-4 py-6 text-center text-gray-500" colspan="5">
              No saved ZIP codes.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-4 flex items-center justify-between">
      <span class="text-sm text-gray-600">Page {{ page }} of {{ totalPages }}</span>

      <div class="flex gap-2">
        <button
          class="rounded-md border px-3 py-2 hover:bg-gray-50 disabled:opacity-50"
          @click="page--"
          :disabled="page === 1"
        >
          Prev
        </button>

        <button
          class="rounded-md border px-3 py-2 hover:bg-gray-50 disabled:opacity-50"
          @click="page++"
          :disabled="page === totalPages"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
