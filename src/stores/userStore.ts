import { defineStore } from 'pinia'
import { userService } from '../services/userService'
import type { User, LoginRequest, RegisterRequest } from '../types/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as User | null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null as string | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.currentUser,
    isActive: (state) => state.currentUser?.status === 'active'
  },

  actions: {
    async login(credentials: LoginRequest) {
      this.loading = true
      this.error = null
      try {
        const response = await userService.login(credentials)
        if (response.code === '0000') {
          this.token = response.data.token
          this.currentUser = response.data.user
          localStorage.setItem('token', response.data.token)
        } else {
          throw new Error(response.info)
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '登录失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    async register(data: RegisterRequest) {
      this.loading = true
      this.error = null
      try {
        const response = await userService.register(data)
        if (response.code === '0000') {
          this.token = response.data.token
          this.currentUser = response.data.user
          localStorage.setItem('token', response.data.token)
        } else {
          throw new Error(response.info)
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '注册失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await userService.logout()
      } finally {
        this.token = null
        this.currentUser = null
        localStorage.removeItem('token')
      }
    }
  }
})
