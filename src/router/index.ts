import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/components/ProductList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: ProductList
    }
  ]
})

export default router
