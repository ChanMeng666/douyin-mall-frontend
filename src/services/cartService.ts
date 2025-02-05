import axios from 'axios'
import type { CartResponse, AddToCartRequest } from '../types/cart'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export const cartService = {
  async getCart(): Promise<CartResponse> {
    const response = await axios.get<CartResponse>(`${BASE_URL}/cart/get`)
    return response.data
  },

  async addToCart(data: AddToCartRequest): Promise<CartResponse> {
    const response = await axios.post<CartResponse>(`${BASE_URL}/cart/add`, data)
    return response.data
  },

  async updateQuantity(cartItemId: number, quantity: number): Promise<CartResponse> {
    const response = await axios.put<CartResponse>(`${BASE_URL}/cart/update`, {
      cart_item_id: cartItemId,
      quantity
    })
    return response.data
  },

  async removeItem(cartItemId: number): Promise<CartResponse> {
    const response = await axios.delete<CartResponse>(`${BASE_URL}/cart/remove/${cartItemId}`)
    return response.data
  },

  async clearCart(): Promise<CartResponse> {
    const response = await axios.post<CartResponse>(`${BASE_URL}/cart/clear`)
    return response.data
  }
}
