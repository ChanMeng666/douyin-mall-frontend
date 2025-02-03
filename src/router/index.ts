import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/views/ProductList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductList
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/OrdersView.vue')
    }
  ]
})

export default router
