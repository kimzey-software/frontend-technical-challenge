<script setup lang="ts">
import { Form } from 'vee-validate';
import Input from '../../../../components/form/input/input.vue';
import Button from '../../../../components/button/button.vue';
import { searchValidation, userValidation } from './common/validations.ts';
import { search } from './api/search.ts';
import type { ZipCodeApi } from './common/types/zip-code-api.ts';
import type { ZipCodeDto } from './common/types/zip-code-dto.ts';
import { useUserStore } from '../../user/store/user-store.ts';
import Card from '../../../../components/card/card.vue';
import { ref } from 'vue';
import {
  statusCodes,
  useStatusCode,
} from '../../../http/interceptors/status-code.ts';
import ErrorHandler from '../../../../components/error-handler/error-handler.vue';
import Modal from '../../../../components/modal/modal.vue';
import { createUser } from '../../user/api/create-user.ts';
import type { UserResponseDto } from '../../user/common/types/user-response-dto.ts';
import { createZipCodeValidations } from '../list-zip-codes/common/validations.ts';
import type { UserForm } from '../../user/common/types/user-form.ts';
import type { ZipCodeForm } from './common/types/zip-code-form.ts';
import type { CreateZipCodeForm } from '../list-zip-codes/common/types/create-zip-code-form.ts';
import { createZipCode } from '../list-zip-codes/api/create-zip-code.ts';

defineOptions({
  name: 'ZipCodeSearcher',
});

const userStore = useUserStore();
const nameForm = 'zip-code-searcher-form';
const createUserNameForm = 'create-user-name-form';
const createZipCodeForm = 'create-zip-code-form';
const data = ref<ZipCodeDto | undefined>(undefined);
const { statusCode } = useStatusCode();
const openCreateUser = ref<boolean>(false);
const openCreateZipCode = ref<boolean>(false);
const zipCodeInitialValues = ref<any>({});
import { useRouter } from 'vue-router';
const router = useRouter();

const searchZipCode = async (values: ZipCodeForm) => {
  data.value = await search<ZipCodeApi, ZipCodeDto>(values.zipCode);
};

const saveZipCode = (event: any) => {
  event.preventDefault();
  if (userStore.user.id === undefined) {
    openCreateUserModal();
  }

  if (userStore.user.id !== undefined) {
    zipCodeInitialValues.value = {
      zipCode: data.value?.postCode,
      city: data.value?.places[0].placeName,
      state: data.value?.places[0].state,
      latitude: data.value?.places[0].latitude,
      longitude: data.value?.places[0].longitude,
      country: data.value?.country,
    };
    openCreateZipCodeModal();
  }
};

const closeCreateUserModal = () => {
  openCreateUser.value = false;
};
const openCreateUserModal = () => {
  openCreateUser.value = true;
};

const createUserOnSubmit = async (values: UserForm) => {
  const response = await createUser<UserResponseDto>(values.name);
  userStore.createUser({
    id: response.id,
    name: response.name,
    uuid: response.uuid,
  });
  closeCreateUserModal();
};

const closeCreateZipCodeModal = () => {
  openCreateZipCode.value = false;
};
const openCreateZipCodeModal = () => {
  openCreateZipCode.value = true;
};

const createZipCodeOnSubmit = async (values: CreateZipCodeForm) => {
  await createZipCode({
    ...values,
    userId: userStore.user.id,
    zipCode: values.zipCode,
  });
  await router.push('/zip-codes');
  closeCreateZipCodeModal();
};
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center space-y-6">
    <div class="w-full grid grid-cols-12 gap-6">
      <div
        class="col-span-12 md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-5"
      >
        <Form
          :validation-schema="searchValidation"
          @submit="searchZipCode"
          :id="nameForm"
        >
          <div class="flex flex-row space-x-4">
            <div class="basis-3/3">
              <Input name="zipCode" placeholder="Enter zip code" type="text" />
            </div>
            <div class="basis-0/3">
              <Button text="Search" type="submit" :form="nameForm" />
            </div>
          </div>
        </Form>
      </div>

      <div
        class="col-span-12 md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-5"
      >
        <ErrorHandler :statusCode="statusCode" />
        <Card v-if="data && !statusCodes.includes(statusCode)">
          <div>
            <div class="p-5 space-y-6">
              <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                Zip Code: {{ data.postCode }}
              </h5>
              <p class="font-normal text-gray-700 dark:text-gray-400">
                <strong>City: </strong>{{ data.places[0].placeName }}<br />
                <strong>State: </strong>{{ data.places[0].state }}<br />
                <strong>Country: </strong>{{ data.country }}<br />
                <strong>Latitude: </strong>{{ data.places[0].latitude }}<br />
                <strong>Longitude: </strong>{{ data.places[0].longitude }}<br />
              </p>
              <div class="flex justify-end">
                <Button text="Add" @click="saveZipCode" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>

  <Modal
    :close="closeCreateUserModal"
    :show="openCreateUserModal"
    :open="openCreateUser"
    :nameForm="createUserNameForm"
    actionLabel="Add"
    title="Create user"
  >
    <Form
      :validation-schema="userValidation"
      @submit="createUserOnSubmit"
      :id="createUserNameForm"
    >
      <div class="flex flex-row space-x-4">
        <div class="basis-3/3">
          <Input name="name" placeholder="Enter your name" type="text" />
        </div>
      </div>
    </Form>
  </Modal>

  <Modal
    title="Add zip code"
    :close="closeCreateZipCodeModal"
    :show="openCreateZipCodeModal"
    :name-form="createZipCodeForm"
    action-label="Add"
    :open="openCreateZipCode"
  >
    <Form
      :validation-schema="createZipCodeValidations"
      @submit="createZipCodeOnSubmit"
      :id="createZipCodeForm"
      :initial-values="zipCodeInitialValues"
    >
      <div class="flex flex-row space-x-4">
        <div class="basis-3/3 space-y-2">
          <Input name="zipCode" placeholder="Enter your name" type="text" />
          <Input name="country" placeholder="Enter your country" type="text" />
          <Input name="city" placeholder="Enter your city" type="text" />
          <Input name="state" placeholder="Enter your state" type="text" />
          <Input
            name="latitude"
            placeholder="Enter your latitude"
            type="text"
          />
          <Input
            name="longitude"
            placeholder="Enter your longitude"
            type="text"
          />
          <Input
            name="observations"
            placeholder="Enter your observation"
            type="text"
          />
        </div>
      </div>
    </Form>
  </Modal>
</template>

<style scoped></style>
