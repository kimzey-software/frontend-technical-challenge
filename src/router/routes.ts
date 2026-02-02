import { createWebHistory, createRouter } from "vue-router";
import Layout from "../shared/view/Layout.vue";
import { zipCodeCrudRoutes } from "../modules/zipcode-crud/router/routes";

const routes = [
    {
        path: "/",
        name: "Layout",
        component: Layout,
        children: [
            {
                path: "",
                name: "ZipCodeCrudHome",
                redirect: "/zipcode-crud"
            },
            ...zipCodeCrudRoutes
        ]
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});