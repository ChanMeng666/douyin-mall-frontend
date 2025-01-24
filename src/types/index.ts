export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface ProductResponse {
  code: string;
  info: string;
  data: Product[];
}
