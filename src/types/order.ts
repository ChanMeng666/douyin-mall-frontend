export interface Order {
  order_id: number;
  user_id: number;
  total_amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  pay_type: 1 | 2 | 3; // 1: alipay, 2: wechat, 3: credit card
  pay_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderRequest {
  products: Array<{
    product_id: number;
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
