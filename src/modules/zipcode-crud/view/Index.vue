<template>
    <div>
        <ul class="flex flex-wrap text-sm font-medium text-center text-body border-b border-default">
            <li class="me-2">
                <RouterLink to="/zipcode-crud/zipcode-search" aria-current="page"
                    class="inline-block p-4 text-fg-brand bg-neutral-secondary-soft rounded-t-base active">Search by
                    Zipcode
                </RouterLink>
            </li>
            <li class="me-2">
                <RouterLink to="/zipcode-crud/create-user" aria-current="page"
                    class="inline-block p-4 rounded-t-base hover:text-heading hover:bg-neutral-secondary-soft">Create
                    User
                </RouterLink>
            </li>
            <li class="me-2">
                <RouterLink to="/zipcode-crud/create-zipcode" aria-current="page"
                    class="inline-block p-4 rounded-t-base hover:text-heading hover:bg-neutral-secondary-soft">Create
                    Zipcode
                </RouterLink>
            </li>
            <li class="me-2">
                <RouterLink to="/zipcode-crud/view-zipcodes-by-user" aria-current="page"
                    class="inline-block p-4 rounded-t-base hover:text-heading hover:bg-neutral-secondary-soft">
                    View Data by User
                </RouterLink>
            </li>
        </ul>
    </div>
    <div class="mt-4">
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>