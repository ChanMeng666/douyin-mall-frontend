export interface Order {
  orderId: number;
  userId: number;
  totalAmount: number;
  status: OrderStatus;
  payType?: PaymentType;
  payTime?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export type OrderStatus = 'pending' | 'paid' | 'cancelled' | 'completed';
export type PaymentType = 1 | 2 | 3; // 1: alipay, 2: wechat, 3: credit card

export interface OrderItem {
  orderItemId: number;
  productId: number;
  quantity: number;
  price: number;
  productName: string;
  productImage?: string;
}

export interface CreateOrderRequest {
  products: Array<{
    productId: number;
    quantity: number;
  }>;
}

export interface OrderResponse {
  code: string;
  info: string;
  data: Order;
}

export interface OrderListResponse {
  code: string;
  info: string;
  data: Order[];
}
