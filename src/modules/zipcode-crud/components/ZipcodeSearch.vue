<template>
    <div class="grid md:grid-cols-2 md:gap-6 ml-10 mr-10">
        <shared-input v-model="input" type="number" field-id="user-zip" label="Zip code" required />
        <button @click="getData()">Search</button>
    </div>
    <shared-table :data="zipcodeList" :columns="tableHeaders" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import SharedInput from '../../../shared/components/SharedInput.vue';
import SharedTable from '../../../shared/components/SharedTable.vue';
import { ZipcodeService } from '../../../services/zipcode.service';
import type { Place, ZipCode } from '../../../models/zipcode-crud/ZipCode';
const input = ref<string>("");
const zipcodeList = reactive<ZipCode[]>([]);
const tableHeaders: string[] = [
    "Zip Code",
    "City",
    "State",
    "Country",
    "Latitude",
    "Longitude"
];
async function getData() {
    const zipcodeService = new ZipcodeService();
    const response = await zipcodeService.getZipcodeInfo(input.value);
    if (response !== null) {
        zipcodeList.length = 0;
        zipcodeList.push(...response.places.map((place: Place) => {
            return {
                zipCode: response['post code'],
                city: place["place name"],
                state: place.state,
                country: response.country,
                latitude: Number(place?.latitude || 0),
                longitude: Number(place?.longitude || 0)
            };
        }));
    } else {
        zipcodeList.length = 0;
    }
}
</script>
