export interface CartItem {
  cart_item_id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  created_at: string;
  updated_at: string;
  product?: {
    name: string;
    description: string;
    price: number;
    image_url?: string;
  };
}

export interface Cart {
  cart_id: number;
  user_id: number;
  items: CartItem[];
  created_at: string;
  updated_at: string;
}

export interface CartResponse {
  code: string;
  info: string;
  data: Cart;
}

export interface AddToCartRequest {
  product_id: number;
  quantity: number;
}
