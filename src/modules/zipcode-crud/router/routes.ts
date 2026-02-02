export const zipCodeCrudRoutes = [{
    path: "zipcode-crud",
    component: () => import("../view/Index.vue"),
    name: "ZipCodeCrud",
    children: [{
        path: "",
        redirect: "/zipcode-crud/zipcode-search"
    }, {
        path: "create-user",
        name: "CreateUser",
        component: () => import("../components/CreateUser.vue")
    }, {
        path: "zipcode-search",
        name: "ZipCodeSearch",
        component: () => import("../components/ZipcodeSearch.vue")
    }, {
        path: "create-zipcode",
        name: "CreateZipcode",
        component: () => import("../components/CreateZipcode.vue")
    }, {
        path: "view-zipcodes-by-user",
        name: "ViewZipcodesByUser",
        component: () => import("../components/ZipcodeByUser.vue")
    }]
}]