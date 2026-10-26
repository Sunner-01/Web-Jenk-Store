import type { CartLine, Product } from "@/types";
export function cartSubtotal(lines: CartLine[], products: Product[]): number {
  return (
    Math.round(
      lines.reduce((sum, line) => {
        const product = products.find((item) => item.id === line.productId);
        if (
          !product ||
          !Number.isInteger(line.quantity) ||
          line.quantity < 1 ||
          line.quantity > product.stock
        ) {
          throw new Error(
            "El carrito contiene un producto o una cantidad inválida",
          );
        }
        return sum + product.price * line.quantity;
      }, 0) * 100,
    ) / 100
  );
}
export function formatMoney(value: number): string {
  return new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: "BOB",
    maximumFractionDigits: 2,
  }).format(value);
}
