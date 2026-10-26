import type { Product } from "../types";
export const enabled = false;
export function onlyAvailable(products: Product[], active: boolean): Product[] {
  void active;
  return products;
}
