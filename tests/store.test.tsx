import { fireEvent, render, screen, within } from "@testing-library/react";
import Store from "@/components/store";
import { products } from "@/data/products";
describe("Recorrido de compra", () => {
  it("permite añadir un producto, revisar su resumen y eliminarlo", () => {
    render(<Store />);
    const product = products.find((item) => item.stock > 0)!;
    fireEvent.click(
      screen.getByRole("button", {
        name: `Añadir al carrito: ${product.name}`,
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: /Carrito 1/ }));
    const cart = within(
      screen.getByRole("complementary", { name: "Tu carrito" }),
    );
    expect(
      cart.getByRole("heading", { name: product.name }),
    ).toBeInTheDocument();
    fireEvent.click(cart.getByRole("button", { name: "Revisar pedido" }));
    expect(
      cart.getByText(/no se ha realizado ninguna compra/),
    ).toBeInTheDocument();
    fireEvent.click(
      cart.getByRole("button", { name: `Eliminar ${product.name}` }),
    );
    expect(cart.getByText("El próximo upgrade te espera.")).toBeInTheDocument();
  });
  it("bloquea la compra de productos agotados", () => {
    render(<Store />);
    const product = products.find((item) => item.stock === 0)!;
    expect(
      screen.getByRole("button", {
        name: `Añadir al carrito: ${product.name}`,
      }),
    ).toBeDisabled();
  });
});
