import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import type { Product } from '@/types/product';

type FavoritesContextValue = {
  favorites: Product[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: Product) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const isFavorite = useCallback(
    (productId: number) => favorites.some((product) => product.id === productId),
    [favorites],
  );

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product],
    );
  }, []);

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite }),
    [favorites, isFavorite, toggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
}
