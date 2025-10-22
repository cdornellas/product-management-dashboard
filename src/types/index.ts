export interface IProduct {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
  thumbnail?: string;
}

export interface IProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}