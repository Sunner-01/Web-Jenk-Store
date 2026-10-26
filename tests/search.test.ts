import { products } from '../src/data/products';
import { searchProducts } from '../src/features/search';
test('encuentra un producto ignorando mayúsculas y espacios', () => {
  expect(searchProducts(products, '  PULSE  ').map(p => p.id)).toEqual(['pulse']);
});
test('busca también dentro del nombre y no solo al principio', () => {
  expect(searchProducts(products, 'headphones').map(p => p.id)).toEqual(['aurora']);
});
test('una consulta vacía mantiene todos los productos', () => {
  expect(searchProducts(products, '  ')).toEqual(products);
});
test('normaliza acentos y devuelve vacío cuando no hay coincidencias', () => {
  expect(searchProducts([{ ...products[0], name: 'Cámara Focus' }], 'camara')).toHaveLength(1);
  expect(searchProducts(products, 'producto inexistente')).toEqual([]);
});
test('no modifica el catálogo de entrada', () => {
  const original = products.slice();
  searchProducts(products, 'pulse');
  expect(products).toEqual(original);
});