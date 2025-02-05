import axios from 'axios'
import type { CreateOrderRequest, OrderResponse, OrderListResponse } from '../types/order'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export const orderService = {
  async createOrder(request: CreateOrderRequest): Promise<OrderResponse> {
    const response = await axios.post<OrderResponse>(`${BASE_URL}/order/create`, request)
    return response.data
  },

  async getOrders(): Promise<OrderListResponse> {
    const response = await axios.get<OrderListResponse>(`${BASE_URL}/order/list`)
    return response.data
  },

  async getOrderById(orderId: number): Promise<OrderResponse> {
    const response = await axios.get<OrderResponse>(`${BASE_URL}/order/get/${orderId}`)
    return response.data
  },

  async cancelOrder(orderId: number): Promise<OrderResponse> {
    const response = await axios.post<OrderResponse>(`${BASE_URL}/order/cancel/${orderId}`)
    return response.data
  },

  async checkOrderStatus(orderId: number): Promise<OrderResponse> {
    const response = await axios.get<OrderResponse>(`${BASE_URL}/order/status/${orderId}`)
    return response.data
  }
}
