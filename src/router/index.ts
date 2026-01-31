import { createRouter, createWebHistory } from 'vue-router'
import ZipSearchView from '../views/ZipSearchView.vue'
import SavedZipsView from '../views/SavedZipsView.vue'

const routes = [
  {
    path: '/',
    name: 'zip-search',
    component: ZipSearchView,
  },
  {
    path: '/saved',
    name: 'saved-zips',
    component: SavedZipsView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
