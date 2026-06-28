import type { Product } from '@/types/product';

export type ProductsStackParamList = {
  ProductList: undefined;
  ProductDetail: { product: Product };
};

export type RootTabParamList = {
  Products: undefined;
  Favorites: undefined;
};
