import type { Product } from '../types';
export const enabled = true;
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
export function searchProducts(products: Product[], query: string): Product[] {
  const needle = normalize(query);
  return needle ? products.filter(product => normalize(product.name).includes(needle)) : products;
}