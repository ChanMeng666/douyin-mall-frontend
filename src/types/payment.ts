import type { PaymentType } from './order'

export interface PaymentInfo {
  orderId: number;
  totalAmount: number;
  status: PaymentStatus;
  payType?: PaymentType;
  payTime?: string;
}

export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed' | 'cancelled';

export interface PaymentResponse {
  code: string;
  info: string;
  data: {
    success: boolean;
    paymentId?: number;
    status?: PaymentStatus;
  };
}

export interface PaymentMethod {
  id: PaymentType;
  name: string;
  icon: string;
}
