import axios from 'axios'
import type { ProductResponse } from '../types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export const productService = {
  async getProducts(): Promise<ProductResponse> {
    const response = await axios.get<ProductResponse>(`${BASE_URL}/product/list`)
    return response.data
  }
}
