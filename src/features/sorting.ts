import type { Product } from "../types";
export type SortOrder = "featured" | "price-asc" | "price-desc";
export const enabled = false;
export function sortProducts(products: Product[], order: SortOrder): Product[] {
  void order;
  return products;
}
