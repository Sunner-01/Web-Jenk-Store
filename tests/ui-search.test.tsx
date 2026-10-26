import { fireEvent, render, screen } from '@testing-library/react';
import Store from '@/components/store';

test('el buscador visible filtra y permite recuperar el catálogo', () => {
  render(<Store />);
  const input = screen.getByRole('searchbox', { name: 'Buscar productos' });
  fireEvent.change(input, { target: { value: 'headphones' } });
  expect(screen.getAllByRole('article')).toHaveLength(1);
  expect(screen.getByRole('heading', { name: 'Aurora Headphones' })).toBeInTheDocument();
  fireEvent.change(input, { target: { value: 'inexistente' } });
  expect(screen.getByText('No encontramos productos')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Restablecer filtros' }));
  expect(screen.getAllByRole('article')).toHaveLength(8);
});