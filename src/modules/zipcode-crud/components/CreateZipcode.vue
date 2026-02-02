<template>
    <div class="max-w-md mx-auto mb-10">
        <zip-code-form @submit="handleSubmit" />
        <shared-toast class="mt-10" :toggle="showToast" :message="message" @onCloseToast="closeToast" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ZipCodeForm from './ZipCodeForm.vue';
import SharedToast from '../../../shared/components/SharedToast.vue';
import store from '../../../store';
import { ZipcodeService } from '../../../services/zipcode.service';
import type { CustomForm } from '../../../models/zipcode-crud/CustomForm';
const showToast = ref<boolean>(false);
const message = ref<string>("");
async function handleSubmit(data: CustomForm) {
    try {
        const zipCodeService = new ZipcodeService()
        const userId = store.getters["zipcodeCrud/getUserId"];
        const payload = { ...data, userId, latitude: Number(data.latitude), longitude: Number(data.longitude) };
        await zipCodeService.createZipcode(payload);
        message.value = "Zipcode added successfully.";
        showToast.value = true;
    }
    catch (e) {
        console.error(e);
        message.value = "Something went wrong.";
        showToast.value = true;
    }

}
function closeToast() {
    showToast.value = false;
}
</script>