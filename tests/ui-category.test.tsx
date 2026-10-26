import { fireEvent, render, screen, within } from '@testing-library/react';
import Store from '@/components/store';

test('seleccionar Audio filtra y Todos restaura el catálogo', () => {
  render(<Store />);
  const filters = within(screen.getByRole('group', { name: 'Filtrar por categoría' }));
  fireEvent.click(filters.getByRole('button', { name: 'Audio' }));
  expect(filters.getByRole('button', { name: 'Audio' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getAllByRole('article')).toHaveLength(3);
  expect(screen.queryByRole('heading', { name: 'Pulse Keyboard' })).not.toBeInTheDocument();
  fireEvent.click(filters.getByRole('button', { name: /^Tod[oa]s$/ }));
  expect(screen.getAllByRole('article')).toHaveLength(8);
});