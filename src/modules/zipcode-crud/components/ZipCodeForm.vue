<template>
    <form class="max-w-md mx-auto" @submit="handleSubmit">

        <shared-input v-model="obj.zipCode" type="number" field-id="user-zip" label="Zip code" required />
        <div class="grid md:grid-cols-2 md:gap-6">
            <shared-input v-model="obj.city" type="text" field-id="user-city" label="City" required />
            <shared-input v-model="obj.state" type="text" field-id="user-state" label="State" required />
        </div>
        <shared-input v-model="obj.country" type="text" field-id="user-country" label="Country" required />
        <div class="grid md:grid-cols-2 md:gap-6">
            <shared-input v-model="obj.latitude" type="number" field-id="user-latitude" label="Latitude" required />
            <shared-input v-model="obj.longitude" type="number" field-id="user-longitude" label="Longitude" required />
        </div>
        <shared-input :tag="InputType.Textarea" v-model="obj.observations" type="textarea" field-id="user-observations"
            label="Observations" required />
        <button type="submit">Submit</button>
    </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import SharedInput from '../../../shared/components/SharedInput.vue';
import { InputType } from '../../../models/InputType';
import type { CustomForm } from '../../../models/zipcode-crud/CustomForm';
import type { ZipcodeResponse } from '../../../models/zipcode-crud/zipcode-response';
const props = defineProps<{
    initialData?: CustomForm | ZipcodeResponse;
}>();
const initialData = {
    zipCode: '',
    city: '',
    state: '',
    country: '',
    latitude: 0,
    longitude: 0,
    observations: '',
}
let obj = reactive<CustomForm | ZipcodeResponse>({
    ...initialData,
    ...props?.initialData
});
const emits = defineEmits<{
    (e: 'submit', data: CustomForm | ZipcodeResponse): void;
}>();
async function handleSubmit(event: Event) {
    event.preventDefault();
    emits('submit', obj);
}
</script>