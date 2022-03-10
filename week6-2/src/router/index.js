import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/IndexView.vue')
      },
      {
        path: '/about',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: '/cart',
        component: () => import('../views/CartView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
