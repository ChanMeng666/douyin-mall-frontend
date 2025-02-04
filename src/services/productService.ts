// import axios from 'axios'
// import type { ProductResponse } from '../types'
//
// const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
//
// export const productService = {
//   async getProducts(): Promise<ProductResponse> {
//     const response = await axios.get<ProductResponse>(`${BASE_URL}/product/list`)
//     return response.data
//   }
// }


// import axios from 'axios'
// import type { ProductResponse } from '@/types'
//
// const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
//
// export const productService = {
//   async getProducts() {
//     const response = await axios.get<ProductResponse>(`${BASE_URL}/product/list`)
//     return response.data
//   },
//
//   async getProduct(id: number) {
//     const response = await axios.get<ProductResponse>(`${BASE_URL}/product/get`, {
//       params: { productId: [id] }
//     })
//     return response.data
//   }
// }



import axios from 'axios'
import type { ProductResponse } from '@/types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export const productService = {
  async getProducts() {
    try {
      console.log('Fetching products from:', `${BASE_URL}/product/list`) // 添加日志
      const response = await axios.get<ProductResponse>(`${BASE_URL}/product/list`)
      console.log('Raw API response:', response.data) // 添加日志
      return response.data
    } catch (error) {
      console.error('Error in getProducts:', error) // 添加错误日志
      throw error
    }
  },

  async getProduct(id: number) {
    try {
      const response = await axios.get<ProductResponse>(`${BASE_URL}/product/get`, {
        params: { productId: id }
      })
      console.log('Single product response:', response.data) // 添加日志
      return response.data
    } catch (error) {
      console.error('Error in getProduct:', error)
      throw error
    }
  }
}
