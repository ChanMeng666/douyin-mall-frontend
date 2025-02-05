import axios from 'axios'
import type { PaymentResponse } from '../types/payment'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export const paymentService = {
  async makePayment(orderId: number, paymentMethod: number): Promise<PaymentResponse> {
    const response = await axios.post<PaymentResponse>(`${BASE_URL}/payment/pay`, {
      orderId,
      paymentMethod
    })
    return response.data
  },

  async cancelPayment(paymentId: number): Promise<PaymentResponse> {
    const response = await axios.post<PaymentResponse>(`${BASE_URL}/payment/cancel`, {
      paymentId
    })
    return response.data
  }
}
