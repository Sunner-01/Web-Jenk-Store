import { products } from "../src/data/products";
import * as search from "../src/features/search";
import * as category from "../src/features/category";
import * as sorting from "../src/features/sorting";
import * as availability from "../src/features/availability";
import * as favorites from "../src/features/favorites";
import * as quantity from "../src/features/quantity";
import * as coupon from "../src/features/coupon";
import { calculateShipping } from "../src/features/shipping";

test("el catálogo usa ids únicos, precios positivos y stock no negativo", () => {
  expect(new Set(products.map((product) => product.id)).size).toBe(
    products.length,
  );
  expect(
    products.every((product) => product.price > 0 && product.stock >= 0),
  ).toBe(true);
});
test("los filtros neutros conservan todos los productos", () => {
  expect(search.searchProducts(products, "")).toEqual(products);
  expect(category.filterCategory(products, "Todas")).toEqual(products);
  expect(sorting.sortProducts(products, "featured")).toEqual(products);
  expect(availability.onlyAvailable(products, false)).toEqual(products);
});
test("no hay descuento para un código vacío ni envío para un carrito vacío", () => {
  expect(coupon.calculateDiscount(100, "")).toBe(0);
  expect(calculateShipping(0)).toBe(0);
});
test("los módulos pendientes no alteran la experiencia base", () => {
  if (!search.enabled)
    expect(search.searchProducts(products, "pulse")).toEqual(products);
  if (!category.enabled)
    expect(category.filterCategory(products, "Audio")).toEqual(products);
  if (!sorting.enabled)
    expect(sorting.sortProducts(products, "price-desc")).toEqual(products);
  if (!availability.enabled)
    expect(availability.onlyAvailable(products, true)).toEqual(products);
  if (!favorites.enabled)
    expect(favorites.toggleFavorite([], "pulse")).toEqual([]);
  if (!quantity.enabled) expect(quantity.updateQuantity(1, 2, 8)).toBe(1);
  if (!coupon.enabled)
    expect(coupon.calculateDiscount(100, "VOLTIO10")).toBe(0);
});
