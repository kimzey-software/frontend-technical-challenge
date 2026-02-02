<template>
    <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table class="w-full text-sm text-left rtl:text-right text-body">
            <thead class="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                <tr>
                    <th v-for="value in columns" :key="value" scope="col" class="px-6 py-3 font-medium">
                        {{ value }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in paginatedData ?? []" :key="JSON.stringify(item)"
                    class="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                    <td v-for="value in item" :key="JSON.stringify(value)" class="px-6 py-4">
                        {{ value }}
                    </td>
                    <slot name="actions" :zipcodeInfo="item"></slot>
                </tr>
            </tbody>
        </table>
        <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between p-4"
            aria-label="Table navigation">
            <span class="text-sm font-normal text-body mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span
                    class="font-semibold text-heading">{{ paginatedData?.length }}-{{ perPage }}</span> of <span
                    class="font-semibold text-heading">{{ total }}</span></span>
            <ul class="flex -space-x-px text-sm">
                <li v-for="value in (page ?? 0)" :key="value">
                    <a href="#" @:click="setCurrentViewPage(value)"
                        class="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none">{{
                            value }}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
const props = withDefaults(defineProps<{
    page?: number | number;
    perPage?: number;
    total?: number;
    columns: string[];
    data: any[];
}>(), {
    page: 1,
    perPage: 1,
    total: 1,
});
const currentPage = ref<number>(props.page ? Number(props.page) : 1);
const paginatedData = computed(() => {
    if (props.page && props.perPage) {
        const start = (currentPage.value - 1) * props.perPage;
        const end = start + props.perPage;
        return props.data.slice(start, end);
    }
    return props.data;
});
function setCurrentViewPage(page: number) {
    currentPage.value = page;
    // TODO: Obtener la data basado en la paginacion. No hay ejemplo o endpoint en el readme para hacerlo.
}
</script>