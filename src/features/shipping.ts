export const enabled = false;
export function calculateShipping(subtotal: number): number {
  return Number.isFinite(subtotal) && subtotal > 0 ? 25 : 0;
}
