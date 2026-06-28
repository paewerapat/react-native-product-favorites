import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import type { Product } from '@/types/product';

const STORAGE_KEY = '@favorites';

type FavoritesContextValue = {
  favorites: Product[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: Product) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          setFavorites(JSON.parse(raw));
        }
      })
      .catch(() => {});
  }, []);

  const isFavorite = useCallback(
    (productId: number) => favorites.some((product) => product.id === productId),
    [favorites],
  );

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites((current) => {
      const next = current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product];

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      return next;
    });
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
