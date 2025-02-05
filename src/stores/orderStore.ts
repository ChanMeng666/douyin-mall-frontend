import { defineStore } from 'pinia'
import { orderService } from '../services/orderService'
import type { Order, CreateOrderRequest } from '../types/order'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [] as Order[],
    currentOrder: null as Order | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async createOrder(request: CreateOrderRequest) {
      this.loading = true
      try {
        const response = await orderService.createOrder(request)
        if (response.code === '0000') {
          this.currentOrder = response.data
          return response.data
        } else {
          throw new Error(response.info)
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '创建订单失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchOrders() {
      this.loading = true
      try {
        const response = await orderService.getOrders()
        if (response.code === '0000') {
          this.orders = response.data
        } else {
          throw new Error(response.info)
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '获取订单列表失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchOrderById(orderId: number) {
      this.loading = true
      try {
        const response = await orderService.getOrderById(orderId)
        if (response.code === '0000') {
          this.currentOrder = response.data
        } else {
          throw new Error(response.info)
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '获取订单详情失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    async cancelOrder(orderId: number) {
      this.loading = true
      try {
        const response = await orderService.cancelOrder(orderId)
        if (response.code === '0000') {
          const index = this.orders.findIndex(order => order.order_id === orderId)
          if (index !== -1) {
            this.orders[index] = response.data
          }
          if (this.currentOrder?.order_id === orderId) {
            this.currentOrder = response.data
          }
        } else {
          throw new Error(response.info)
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '取消订单失败'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
