import { apiGet } from '@/api/client';
import type { Product } from '@/types/product';

export function getProducts() {
  return apiGet<Product[]>('/products');
}
