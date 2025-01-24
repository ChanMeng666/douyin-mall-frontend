import { defineStore } from 'pinia'
import { productService } from '../services/productService'
import type { Product } from '../types'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const response = await productService.getProducts()
        if (response.code === '0000') {
          this.products = response.data
        } else {
          throw new Error(response.info)
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '获取商品列表失败'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
