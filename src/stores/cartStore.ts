import { defineStore } from 'pinia'
import { cartService } from '../services/cartService'
import type { Cart, CartItem } from '../types/cart'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: null as Cart | null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    itemCount: (state) => state.cart?.items.length || 0,
    totalAmount: (state) =>
      state.cart?.items.reduce((sum, item) => sum + item.total_price, 0) || 0
  },

  actions: {
    async fetchCart() {
      this.loading = true
      try {
        const response = await cartService.getCart()
        if (response.code === '0000') {
          this.cart = response.data
        } else {
          throw new Error(response.info)
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '获取购物车失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    async addToCart(productId: number, quantity: number) {
      try {
        const response = await cartService.addToCart({ product_id: productId, quantity })
        if (response.code === '0000') {
          this.cart = response.data
        } else {
          throw new Error(response.info)
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '添加商品失败'
        throw error
      }
    },

    async updateQuantity(cartItemId: number, quantity: number) {
      try {
        const response = await cartService.updateQuantity(cartItemId, quantity)
        if (response.code === '0000') {
          this.cart = response.data
        } else {
          throw new Error(response.info)
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '更新数量失败'
        throw error
      }
    },

    async removeItem(cartItemId: number) {
      try {
        const response = await cartService.removeItem(cartItemId)
        if (response.code === '0000') {
          this.cart = response.data
        } else {
          throw new Error(response.info)
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '删除商品失败'
        throw error
      }
    },

    async clearCart() {
      try {
        const response = await cartService.clearCart()
        if (response.code === '0000') {
          this.cart = response.data
        } else {
          throw new Error(response.info)
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '清空购物车失败'
        throw error
      }
    }
  }
})
