import type { Product } from '../types';
export const enabled = true;
export function filterCategory(products: Product[], category: string): Product[] {
  return !category || category === 'Todas' || category === 'Todos' ? products : products.filter(product => product.category === category);
}