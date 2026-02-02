<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Table from '../../../../components/table/table.vue';
import type { Column } from '../../../../components/table/types/column.ts';
import { useUserStore } from '../../user/store/user-store.ts';
import { useRetriveZipCodes } from './api/use-retrive-zip-codes.ts';
import Modal from '../../../../components/modal/modal.vue';
import { createZipCodeValidations } from './common/validations.ts';
import { Form } from 'vee-validate';
import Input from '../../../../components/form/input/input.vue';
import { useRouter, useRoute } from 'vue-router';
import type { CreateZipCodeForm } from './common/types/create-zip-code-form.ts';
import { editZipCode } from './api/edit-zip-code.ts';
import { deleteZipCode } from './api/delete-zip-code.ts';

defineOptions({
  name: 'ZipCodes',
});
const editZipCodeForm = 'edit-zip-code-form';
const deleteZipCodeForm = 'delete-zip-code-form';
const openEdit = ref<boolean>(false);
const openDelete = ref<boolean>(false);
const zipCodeInitialValues = ref<any>({});

const closeDeleteModal = () => {
  openDelete.value = false;
};

const openDeleteModal = () => {
  openDelete.value = true;
};

const closeEditModal = () => {
  openEdit.value = false;
};

const openEditModal = () => {
  openEdit.value = true;
};

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();
const actions = [
  {
    text: 'Edit',
    color: 'default',
    onClick: (data: any) => {
      router.push({
        query: {
          zipId: data.id,
        },
      });
      openEditModal();
      zipCodeInitialValues.value = {
        zipCode: data.zipCode,
        city: data.city,
        state: data.state,
        latitude: data.latitude,
        longitude: data.longitude,
        country: data.country,
        observations: data.observations,
      };
    },
  },

  {
    text: 'Delete',
    color: 'red',
    onClick: (data: any) => {
      router.push({
        query: {
          zipId: data.id,
        },
      });
      openDeleteModal();
      zipCodeInitialValues.value = {
        zipCode: data.zipCode,
        city: data.city,
        state: data.state,
        latitude: data.latitude,
        longitude: data.longitude,
        country: data.country,
        observations: data.observations,
      };
    },
  },
];
const columns: Column[] = [
  {
    name: 'Zip codes',
    field: 'zipCode',
  },
  {
    name: 'Country',
    field: 'country',
  },
  {
    name: 'State',
    field: 'state',
  },
  {
    name: 'City',
    field: 'city',
  },
  {
    name: 'Latitude',
    field: 'latitude',
  },
  {
    name: 'Longitude',
    field: 'longitude',
  },
  {
    name: 'Observations',
    field: 'observations',
  },
  {
    name: 'Actions',
    field: 'actions',
    actions: actions,
  },
];

const controller = useRetriveZipCodes(userStore.user.id as number);

onMounted(() => {
  controller.fetch();
});

const editZipCodeOnSubmit = async (values: CreateZipCodeForm) => {
  const payload = {
    ...values,
    id: route.query.zipId,
    userId: userStore.user.id,
  };

  await editZipCode(payload);
  await controller.fetch();
  zipCodeInitialValues.value = {};
  closeEditModal();
};

const deleteZipCodeOnSubmit = async (_values: CreateZipCodeForm) => {
  await deleteZipCode(route.query.zipId);
  await controller.fetch();
  zipCodeInitialValues.value = {};
  closeDeleteModal();
};
</script>

<template>
  <Table :columns="columns" :controller="controller" />
  <Modal
    title="Edit"
    :close="closeEditModal"
    :show="openEditModal"
    :name-form="editZipCodeForm"
    action-label="Save"
    :open="openEdit"
  >
    <Form
      :validation-schema="createZipCodeValidations"
      @submit="editZipCodeOnSubmit"
      :id="editZipCodeForm"
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

  <Modal
    title="Delete"
    :close="closeDeleteModal"
    :show="openDeleteModal"
    :name-form="deleteZipCodeForm"
    action-label="Delete"
    :open="openDelete"
  >
    <Form
      :validation-schema="createZipCodeValidations"
      @submit="deleteZipCodeOnSubmit"
      :id="deleteZipCodeForm"
      :initial-values="zipCodeInitialValues"
    >
      <div class="flex flex-row space-x-4">
        <div class="basis-3/3 space-y-2">
          <Input
            name="zipCode"
            placeholder="Enter your name"
            type="text"
            :readonly="true"
          />
          <Input
            name="country"
            placeholder="Enter your country"
            type="text"
            :readonly="true"
          />
          <Input
            name="city"
            placeholder="Enter your city"
            type="text"
            :readonly="true"
          />
          <Input
            name="state"
            placeholder="Enter your state"
            type="text"
            :readonly="true"
          />
          <Input
            name="latitude"
            placeholder="Enter your latitude"
            type="text"
            :readonly="true"
          />
          <Input
            name="longitude"
            placeholder="Enter your longitude"
            type="text"
            :readonly="true"
          />
          <Input
            name="observations"
            placeholder="Enter your observation"
            type="text"
            :readonly="true"
          />
        </div>
      </div>
    </Form>
  </Modal>
</template>

<style scoped></style>
