import { useCallback, useEffect, useState } from 'react';

import { getProducts } from '@/api/products';
import type { Product } from '@/types/product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (isRefresh: boolean) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      setError('โหลดสินค้าไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(false);
  }, [fetchProducts]);

  const refresh = useCallback(() => fetchProducts(true), [fetchProducts]);
  const retry = useCallback(() => fetchProducts(false), [fetchProducts]);

  return { products, isLoading, isRefreshing, error, refresh, retry };
}
