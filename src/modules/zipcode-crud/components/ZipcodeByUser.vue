<template>
    <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <shared-table :data="mapData(storeZipcodeList?.data)" :columns="tableHeaders"
            :page="storeZipcodeList?.page ?? 0" :per-page="storeZipcodeList?.perPage ?? 0"
            :total="storeZipcodeList?.total ?? 0">
            <template #actions="{ zipcodeInfo }">
                <td>
                    <button @click="onSelectedZipcode(zipcodeInfo, 'edit')"
                        class=" text-fg-brand hover:underline">Edit</button>
                    <button @click="onSelectedZipcode(zipcodeInfo, 'delete')"
                        class="text-red-600 hover:underline">Delete</button>
                </td>
            </template>
        </shared-table>
        <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div v-if="modalAction === 'edit'" class="bg-white p-6 rounded shadow-lg">
                <zip-code-form :initial-data="selectedZipcode!" @submit="onUpdate" />
                <button @click="toggle()" class="mt-4">Close</button>
            </div>
            <div v-if="modalAction === 'delete'" class="bg-white p-6 rounded shadow-lg">
                <h3>Are you sure you want to delete this zipconde information?</h3>
                <button @click="onDelete()" class="mt-4 bg-danger">Delete</button>
                <button @click="toggle()" class="mt-4">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import SharedTable from '../../../shared/components/SharedTable.vue';
import ZipCodeForm from '../components/ZipCodeForm.vue';
import store from '../../../store';
import type { ZipcodeResponse } from '../../../models/zipcode-crud/zipcode-response';
import { ZipcodeService } from '../../../services/zipcode.service';
import type { ModalActionType } from '../../../models/zipcode-crud/ModalActions';
const zipcodeService = new ZipcodeService();
const tableHeaders: string[] = [
    "Id",
    "Zip Code",
    "City",
    "State",
    "Country",
    "Latitude",
    "Longitude",
    "Observations",
    "Edit"
];
const isOpen = ref(false);
const modalAction = ref<ModalActionType | null>(null);
const selectedZipcode = ref<ZipcodeResponse | null>(null);
const storeZipcodeList = computed(() => store.getters["zipcodeCrud/getZipCodeList"]);
async function getData() {
    await store.dispatch("zipcodeCrud/fetchZipcodesByUserId");
}
getData();
async function onUpdate(data: unknown) {
    const payload = { ...selectedZipcode.value, ...(data as ZipcodeResponse) }
    await zipcodeService.updateZipcode(payload); // This function return the updated zipcode
    getData();
    toggle();
}
async function onDelete() {
    await zipcodeService.deleteZipcode(selectedZipcode.value!);
    getData();
    toggle();
}
function toggle() {
    isOpen.value = !isOpen.value;
}
function onSelectedZipcode(zipcode: ZipcodeResponse, action: ModalActionType) {
    selectedZipcode.value = { ...zipcode };
    modalAction.value = action;
    toggle();
}
function mapData(data: ZipcodeResponse[] | undefined) {
    if (!data) return [];
    return data.map(item => ({
        id: item.id,
        zipCode: item.zipCode,
        city: item.city,
        state: item.state,
        country: item.country,
        latitude: item.latitude,
        longitude: item.longitude,
        observations: item.observations
    }));
}
</script>