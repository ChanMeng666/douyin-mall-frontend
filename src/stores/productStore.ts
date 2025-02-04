// import { defineStore } from 'pinia'
// import { productService } from '../services/productService'
// import type { Product } from '../types'
//
// export const useProductStore = defineStore('product', {
//   state: () => ({
//     products: [] as Product[],
//     loading: false,
//     error: null as string | null
//   }),
//
//   actions: {
//     async fetchProducts() {
//       this.loading = true
//       try {
//         const response = await productService.getProducts()
//         if (response.code === '0000') {
//           this.products = response.data
//         } else {
//           throw new Error(response.info)
//         }
//       } catch (error) {
//         this.error = error instanceof Error ? error.message : '获取商品列表失败'
//         throw error
//       } finally {
//         this.loading = false
//       }
//     }
//   }
// })

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
        console.log('API Response:', response) // 添加日志

        if (response.code === '0000' && response.data) {
          this.products = Array.isArray(response.data) ? response.data : [response.data]
          console.log('Processed Products:', this.products) // 添加日志
        } else {
          throw new Error(response.info || '获取商品列表失败')
        }
      } catch (error) {
        console.error('Error in fetchProducts:', error) // 添加错误日志
        this.error = error instanceof Error ? error.message : '获取商品列表失败'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
