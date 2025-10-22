import axios from 'axios';
import type { IProduct, IProductsResponse } from '../types';

const API_URL = 'https://dummyjson.com/products';

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await axios.get<IProductsResponse>(`${API_URL}?limit=100`);
  return response.data.products;
};

export const addProduct = async (productData: Omit<IProduct, 'id'>): Promise<IProduct> => {
  const response = await axios.post<IProduct>(`${API_URL}/add`, productData, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const updateProduct = async (product: IProduct): Promise<IProduct> => {
  try {
    const response = await axios.put<IProduct>(`${API_URL}/${product.id}`, product, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.warn('Update failed, returning original product data:', error);
    return product;
  }
};

export const deleteProduct = async (id: number): Promise<IProduct> => {
  try {
    const response = await axios.delete<IProduct>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Delete failed, returning dummy deleted product data:', error);
    return { id, title: '', price: 0, stock: 0, category: '' };
  }
};