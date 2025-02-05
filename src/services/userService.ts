import axios from 'axios'
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/user'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export const userService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${BASE_URL}/user/login`, data)
    return response.data
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${BASE_URL}/user/register`, data)
    return response.data
  },

  async logout(): Promise<void> {
    await axios.post(`${BASE_URL}/user/logout`)
  }
}
