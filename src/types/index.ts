// export interface Product {
//   product_id: number;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   status: 'active' | 'inactive';
//   created_at: string;
//   updated_at: string;
// }
//
// export interface ProductResponse {
//   code: string;
//   info: string;
//   data: Product[];
// }


export interface Product {
  productId: number;  // 改为 productId 以匹配后端
  name: string;
  description: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  imageUrl: string | null;  // 改为 imageUrl
  createdAt: string;  // 改为 createdAt
  updatedAt: string;  // 改为 updatedAt
}

export interface ProductResponse {
  code: string;
  info: string;
  data: Product[] | Product;
}
