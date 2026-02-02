<script setup lang="ts">
import type { Column } from './types/column.ts';
import {
  FwbButton,
  FwbDropdown,
  FwbListGroup,
  FwbListGroupItem,
  FwbPagination,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from 'flowbite-vue';
import type { PaginateResponse } from './types/paginate-response.ts';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';

defineOptions({
  name: 'Table',
});

const props = defineProps<{
  columns: Column[];
  controller: {
    response: Ref<PaginateResponse | undefined>;
    page: Ref<number>;
    perPage: Ref<number>;
    totalPages: Ref<number>;
    fetch: () => Promise<void>;
    nextPage: () => Promise<void>;
    prevPage: () => Promise<void>;
  };
}>();

const columnsActionsExclused = computed(() =>
  props.columns.filter(column => column.field !== 'actions'),
);

const actionField = computed(() =>
  props.columns.find(column => column.field === 'actions'),
);

const rows = computed(() => {
  return props.controller.response.value?.data ?? [];
});

const pageChanged = async (page: number) => {
  props.controller.page.value = page;
  await props.controller.fetch();
};

const perPageList = ref<number[]>([1, 2, 3, 10]);

const perPageState = ref<string>('1');

const changePerPage = (perPage: number) => {
  perPageState.value = perPage.toString();
  props.controller.perPage.value = perPage;
  props.controller.fetch();
};
</script>

<template>
  <div class="space-y-2">
    <fwb-table>
      <fwb-table-head>
        <fwb-table-head-cell v-for="column in columns">{{
          column.name
        }}</fwb-table-head-cell>
      </fwb-table-head>
      <fwb-table-body>
        <fwb-table-row v-for="row in rows">
          <fwb-table-cell v-for="column in columnsActionsExclused">{{
            row[column.field]
          }}</fwb-table-cell>
          <fwb-table-cell class="space-x-1">
            <fwb-button
              size="xs"
              v-for="action in actionField?.actions"
              @click="action.onClick(row)"
              :color="action.color"
            >
              {{ action.text }}
            </fwb-button>
          </fwb-table-cell>
        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>
    <div class="w-full flex justify-end space-x-1">
      <fwb-dropdown :text="perPageState" content-class="rounded-lg">
        <fwb-list-group class="text-sm text-gray-700 dark:text-gray-200">
          <fwb-list-group-item
            v-for="item in perPageList"
            @click="changePerPage(item)"
            >{{ item }}
          </fwb-list-group-item>
        </fwb-list-group>
      </fwb-dropdown>
      <fwb-pagination
        v-model="controller.page.value"
        :totalPages="controller.totalPages.value"
        :perPage="controller.perPage.value"
        @pageChanged="pageChanged"
      />
    </div>
  </div>
</template>

<style scoped></style>
