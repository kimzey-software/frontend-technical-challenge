import type { RouteRecordRaw } from 'vue-router';
import ZipCodeSearcher from './modules/zip-codes/zip-code-searcher/zip-code-searcher.vue';
import Home from './modules/home/home.vue';
import ZipCodes from './modules/zip-codes/list-zip-codes/zip-codes.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/zip-code-searcher',
    name: 'zip-code-searcher',
    component: ZipCodeSearcher,
  },
  {
    path: '/zip-codes',
    name: 'zip-codes',
    component: ZipCodes,
  },
];
