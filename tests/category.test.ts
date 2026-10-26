import { products } from '../src/data/products';
import { filterCategory } from '../src/features/category';
test('Audio contiene exclusivamente sus tres productos', () => {
  expect(filterCategory(products, 'Audio').map(p => p.id)).toEqual(['aurora', 'echo', 'air']);
});
test('Todas y una categoría vacía mantienen el catálogo', () => {
  expect(filterCategory(products, 'Todas')).toEqual(products);
  expect(filterCategory(products, 'Todos')).toEqual(products);
  expect(filterCategory(products, '')).toEqual(products);
});
test('una categoría inexistente devuelve vacío', () => {
  expect(filterCategory(products, 'Electrodomésticos')).toEqual([]);
});