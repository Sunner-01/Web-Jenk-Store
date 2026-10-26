"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { products } from "@/data/products";
import type { CartLine } from "@/types";
import { cartSubtotal, formatMoney } from "@/lib/cart";
import * as search from "@/features/search";
import * as category from "@/features/category";
import * as sorting from "@/features/sorting";
import * as availability from "@/features/availability";
import * as favorites from "@/features/favorites";
import * as quantity from "@/features/quantity";
import * as coupon from "@/features/coupon";
import * as shipping from "@/features/shipping";

export default function Store() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [order, setOrder] = useState<"featured" | "price-asc" | "price-desc">(
    "featured",
  );
  const [inStock, setInStock] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const count = cart.reduce((total, line) => total + line.quantity, 0);
  const subtotal = cartSubtotal(cart, products);
  const discount = coupon.calculateDiscount(subtotal, appliedCoupon);
  const delivery = shipping.calculateShipping(subtotal - discount);
  const total = subtotal - discount + delivery;
  const visible = useMemo(() => {
    const filtered = availability.onlyAvailable(
      category.filterCategory(
        search.searchProducts(products, query),
        selectedCategory,
      ),
      inStock,
    );
    return sorting.sortProducts(
      favoritesOnly
        ? filtered.filter((product) => favoriteIds.includes(product.id))
        : filtered,
      order,
    );
  }, [query, selectedCategory, inStock, order, favoritesOnly, favoriteIds]);

  function addToCart(id: string) {
    const product = products.find((item) => item.id === id)!;
    if (!product.stock) return;
    if (cart.some((line) => line.productId === id)) {
      setCartOpen(true);
      return;
    }
    setCart((previous) => [...previous, { productId: id, quantity: 1 }]);
    setReviewed(false);
    setNotice(`${product.name} añadido al carrito`);
  }

  function changeQuantity(id: string, requested: number) {
    const product = products.find((item) => item.id === id)!;
    setCart((previous) =>
      previous.map((line) =>
        line.productId === id
          ? {
              ...line,
              quantity: quantity.updateQuantity(
                line.quantity,
                requested,
                product.stock,
              ),
            }
          : line,
      ),
    );
    setReviewed(false);
  }

  return (
    <>
      <div className="announcement">
        Tecnología para hacer más de lo que te gusta.
        <span>Tienda de demostración · Precios en Bs</span>
      </div>
      <header className="header shell">
        <a className="brand" href="#" aria-label="Voltio Store, inicio">
          <Zap fill="currentColor" size={27} strokeWidth={1.8} />
          voltio<span>store</span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#catalogo">
            Explorar productos <ChevronDown size={14} />
          </a>
          <a href="#seleccion">Nuestra selección</a>
        </nav>
        <div className="header-actions">
          {favorites.enabled && (
            <button
              className={`icon-button ${favoritesOnly ? "selected" : ""}`}
              aria-label="Mostrar favoritos"
              aria-pressed={favoritesOnly}
              onClick={() => {
                setFavoritesOnly(!favoritesOnly);
                document
                  .getElementById("catalogo")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Heart size={20} />
              <span>{favoriteIds.length}</span>
            </button>
          )}
          <button
            className="bag-button"
            aria-label={`Carrito ${count}`}
            aria-expanded={cartOpen}
            aria-controls="cart-panel"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <ShoppingBag size={19} />
            <span>Carrito</span>
            <b>{count}</b>
          </button>
        </div>
      </header>

      <main className="shell">
        <section className="hero" id="seleccion" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              Tu mundo.
              <br />A otro nivel.
            </h1>
            <p>
              Sonido que te mueve. Accesorios que te siguen.
              <br className="desktop-break" /> Encuentra tu próxima conexión.
            </p>
            <a className="primary-button" href="#catalogo">
              Explorar la colección <ArrowRight size={18} />
            </a>
            <div className="hero-note">
              <span className="small-line" />
              Buenos dispositivos. Grandes posibilidades.
            </div>
          </div>
          <div className="hero-visual">
            <Image
              src="/products/headphones.jpg"
              alt="Audífonos sobre un fondo amarillo"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <span className="image-caption">
              Sube el volumen.
              <br />
              <strong>Baja el ruido.</strong>
            </span>
            <a
              href="#catalogo"
              className="round-link"
              aria-label="Ver catálogo"
            >
              <ArrowDown />
            </a>
          </div>
        </section>

        <section
          id="catalogo"
          className="catalog"
          aria-labelledby="catalog-title"
        >
          <div className="section-heading">
            <div>
              <h2 id="catalog-title">Encuentra tu próximo favorito.</h2>
              <p>Una selección para trabajar, crear y desconectar.</p>
            </div>
            <span className="result-count" aria-live="polite">
              {visible.length} productos
            </span>
          </div>
          {(search.enabled ||
            category.enabled ||
            sorting.enabled ||
            availability.enabled) && (
            <div className="toolbar">
              {category.enabled && (
                <div
                  className="category-tabs"
                  role="group"
                  aria-label="Filtrar por categoría"
                >
                  {[
                    "Todos",
                    ...new Set(products.map((product) => product.category)),
                  ].map((name) => (
                    <button
                      key={name}
                      className={selectedCategory === name ? "active" : ""}
                      aria-pressed={selectedCategory === name}
                      onClick={() => setSelectedCategory(name)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
              <div className="filter-controls">
                {search.enabled && (
                  <label className="search">
                    <Search size={17} />
                    <span className="sr-only">Buscar productos</span>
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Busca tu próximo upgrade"
                      type="search"
                    />
                  </label>
                )}
                {availability.enabled && (
                  <label className="stock-filter">
                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={(event) => setInStock(event.target.checked)}
                    />
                    Solo disponibles
                  </label>
                )}
                {sorting.enabled && (
                  <label className="sort">
                    <span className="sr-only">Ordenar productos</span>
                    <select
                      value={order}
                      onChange={(event) =>
                        setOrder(event.target.value as typeof order)
                      }
                    >
                      <option value="featured">Destacados</option>
                      <option value="price-asc">Menor precio</option>
                      <option value="price-desc">Mayor precio</option>
                    </select>
                  </label>
                )}
              </div>
            </div>
          )}
          {favorites.enabled && favoritesOnly && (
            <div className="favorite-notice">
              Viendo tus favoritos{" "}
              <button onClick={() => setFavoritesOnly(false)}>Ver todos</button>
            </div>
          )}
          <div className="product-grid">
            {visible.map((product) => {
              const added = cart.some((line) => line.productId === product.id);
              return (
                <article className="product" key={product.id}>
                  <div className="product-image">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 580px) 90vw, (max-width: 980px) 45vw, 25vw"
                    />
                    {!product.stock && (
                      <span className="unavailable">Agotado</span>
                    )}
                    {favorites.enabled && (
                      <button
                        className="favorite-button"
                        aria-label={`${favoriteIds.includes(product.id) ? "Quitar de" : "Añadir a"} favoritos: ${product.name}`}
                        aria-pressed={favoriteIds.includes(product.id)}
                        onClick={() =>
                          setFavoriteIds((previous) =>
                            favorites.toggleFavorite(previous, product.id),
                          )
                        }
                      >
                        <Heart
                          size={18}
                          fill={
                            favoriteIds.includes(product.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    )}
                  </div>
                  <div className="product-meta">
                    <span>{product.category}</span>
                    <span>{product.stock ? "Disponible" : "Sin stock"}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-bottom">
                    <strong>{formatMoney(product.price)}</strong>
                    <button
                      disabled={!product.stock}
                      aria-label={`${added ? "Ver en carrito" : "Añadir al carrito"}: ${product.name}`}
                      onClick={() => addToCart(product.id)}
                    >
                      {added ? <Check size={19} /> : <Plus size={19} />}
                      <span>{added ? "Añadido" : "Añadir"}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          {visible.length === 0 && (
            <div className="empty-results">
              <Search size={30} />
              <h3>No encontramos productos</h3>
              <p>Prueba otra búsqueda o cambia los filtros.</p>
              <button
                className="text-button"
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("Todos");
                  setInStock(false);
                  setFavoritesOnly(false);
                }}
              >
                Restablecer filtros
              </button>
            </div>
          )}
        </section>
        <section className="closing-banner">
          <Zap size={30} />
          <h2>
            Lo que haces merece
            <br />
            buenas herramientas.
          </h2>
          <a href="#catalogo">
            Encuentra las tuyas <ArrowRight size={20} />
          </a>
        </section>
      </main>
      <footer className="footer shell">
        <a className="brand" href="#">
          <Zap fill="currentColor" size={23} />
          voltio<span>store</span>
        </a>
        <p>Proyecto académico · Sin pagos ni pedidos reales.</p>
        <span>Hecho para conectar.</span>
      </footer>
      <div className="sr-only" role="status">
        {notice}
      </div>

      {cartOpen && (
        <aside
          id="cart-panel"
          className="cart-panel"
          aria-labelledby="cart-title"
        >
          <div className="cart-heading">
            <div>
              <h2 id="cart-title">Tu carrito</h2>
              <p>
                {count} {count === 1 ? "artículo" : "artículos"} seleccionados
              </p>
            </div>
            <button
              className="icon-button"
              aria-label="Cerrar carrito"
              onClick={() => setCartOpen(false)}
            >
              <X />
            </button>
          </div>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={42} strokeWidth={1.2} />
              <h3>El próximo upgrade te espera.</h3>
              <p>Explora la colección y añade algo que te guste.</p>
              <button
                className="primary-button"
                onClick={() => setCartOpen(false)}
              >
                Seguir explorando <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <>
              <div className="cart-lines">
                {cart.map((line) => {
                  const product = products.find(
                    (item) => item.id === line.productId,
                  )!;
                  return (
                    <div className="cart-line" key={line.productId}>
                      <Image
                        src={product.image}
                        alt=""
                        width={72}
                        height={72}
                      />
                      <div className="cart-line-info">
                        <h3>{product.name}</h3>
                        <span>{formatMoney(product.price)}</span>
                        {quantity.enabled ? (
                          <div className="quantity">
                            <button
                              aria-label={`Reducir cantidad de ${product.name}`}
                              disabled={line.quantity <= 1}
                              onClick={() =>
                                changeQuantity(product.id, line.quantity - 1)
                              }
                            >
                              <Minus size={13} />
                            </button>
                            <output aria-label={`Cantidad de ${product.name}`}>
                              {line.quantity}
                            </output>
                            <button
                              aria-label={`Aumentar cantidad de ${product.name}`}
                              disabled={line.quantity >= product.stock}
                              onClick={() =>
                                changeQuantity(product.id, line.quantity + 1)
                              }
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        ) : (
                          <small>Cantidad: {line.quantity}</small>
                        )}
                      </div>
                      <button
                        className="icon-button remove"
                        aria-label={`Eliminar ${product.name}`}
                        onClick={() => {
                          setCart((previous) =>
                            previous.filter(
                              (item) => item.productId !== product.id,
                            ),
                          );
                          setReviewed(false);
                        }}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  );
                })}
              </div>
              {coupon.enabled && (
                <form
                  className="coupon"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const amount = coupon.calculateDiscount(
                      subtotal,
                      couponInput,
                    );
                    setAppliedCoupon(amount > 0 ? couponInput : "");
                    setCouponMessage(
                      amount > 0
                        ? "Cupón aplicado: 10 % de descuento."
                        : "Ese cupón no es válido. Prueba VOLTIO10.",
                    );
                    setReviewed(false);
                  }}
                >
                  <label htmlFor="coupon">¿Tienes un cupón?</label>
                  <div>
                    <input
                      id="coupon"
                      value={couponInput}
                      onChange={(event) => setCouponInput(event.target.value)}
                      placeholder="Código de descuento"
                    />
                    <button type="submit">Aplicar</button>
                  </div>
                  <p role="status">{couponMessage}</p>
                </form>
              )}
              <div className="cart-totals">
                <div>
                  <span>Subtotal</span>
                  <strong>{formatMoney(subtotal)}</strong>
                </div>
                {discount > 0 && (
                  <div className="discount">
                    <span>Descuento</span>
                    <strong>− {formatMoney(discount)}</strong>
                  </div>
                )}
                <div>
                  <span>Envío</span>
                  <strong>
                    {delivery === 0 ? "Gratis" : formatMoney(delivery)}
                  </strong>
                </div>
                {shipping.enabled && (
                  <p className="shipping-note">
                    <Truck size={16} />
                    {delivery === 0
                      ? "Tu pedido tiene envío gratis."
                      : `Te faltan ${formatMoney(Math.max(0, 300 - subtotal + discount))} para envío gratis.`}
                  </p>
                )}
                <div className="grand-total">
                  <span>Total</span>
                  <strong>{formatMoney(total)}</strong>
                </div>
              </div>
              <button
                className="primary-button checkout"
                onClick={() => setReviewed(true)}
              >
                Revisar pedido <ArrowRight size={18} />
              </button>
              {reviewed && (
                <div className="order-review" role="status">
                  <Check size={18} />
                  <p>
                    Resumen listo: {count} artículos por {formatMoney(total)}.
                    Esta es una demostración; no se ha realizado ninguna compra.
                  </p>
                </div>
              )}
              <p className="cart-disclaimer">
                Compra simulada · Sin cobros reales
              </p>
            </>
          )}
        </aside>
      )}
    </>
  );
}
