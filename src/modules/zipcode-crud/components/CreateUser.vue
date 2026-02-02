<template>
    <div class="max-w-md mx-auto">
        <shared-input v-model="userName" type="text" field-id="user-name" label="User name" required />
        <button @click="onSubmitZipcode()">Create User</button>
        <shared-toast class="mt-10" :toggle="showToast" :message="message" @onCloseToast="closeToast" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SharedInput from "../../../shared/components/SharedInput.vue";
import SharedToast from '../../../shared/components/SharedToast.vue';
import store from '../../../store';

const userName = ref<string>("");
const showToast = ref<boolean>(false);
const message = ref<string>("");
async function onSubmitZipcode() {
    try {
        await store.dispatch("zipcodeCrud/createUser", userName.value);
        message.value = "Zipcode added successfully."
        userName.value = "";
        showToast.value = true;
    } catch (e) {
        message.value = "Something went wrong."
        userName.value = "";
        showToast.value = true;
    }
}
function closeToast() {
    showToast.value = false;
}
</script>