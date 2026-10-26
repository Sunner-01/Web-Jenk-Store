import { cartSubtotal, formatMoney } from "@/lib/cart";
import { products } from "@/data/products";
describe("Reglas del carrito", () => {
  const product = products.find((item) => item.stock >= 2)!;
  it("suma las cantidades de productos reales", () => {
    expect(
      cartSubtotal([{ productId: product.id, quantity: 2 }], products),
    ).toBe(product.price * 2);
  });
  it("un carrito vacío tiene subtotal cero", () =>
    expect(cartSubtotal([], products)).toBe(0));
  it.each([0, -1, 1.5, Number.NaN, Infinity])(
    "rechaza cantidad inválida %s",
    (value) => {
      expect(() =>
        cartSubtotal([{ productId: product.id, quantity: value }], products),
      ).toThrow();
    },
  );
  it("no acepta cantidades superiores al stock", () => {
    expect(() =>
      cartSubtotal(
        [{ productId: product.id, quantity: product.stock + 1 }],
        products,
      ),
    ).toThrow();
  });
  it("no acepta productos inexistentes", () => {
    expect(() =>
      cartSubtotal([{ productId: "desconocido", quantity: 1 }], products),
    ).toThrow();
  });
  it("formatea los importes en bolivianos", () =>
    expect(formatMoney(120)).toContain("120"));
});
