import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import { routes as modulesRoutes } from './app/routes.ts';

const routes: RouteRecordRaw[] = [...modulesRoutes];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
