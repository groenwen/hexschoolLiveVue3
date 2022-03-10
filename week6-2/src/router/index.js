import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  // {
  //   path: '',
  //   component: () => import('../views/IndexView.vue'),
  // },
  {
    path: '/products',
    component: () => import('../views/ProductsView.vue')
  },
  {
    path: '/cart',
    component: () => import('../views/CartView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
