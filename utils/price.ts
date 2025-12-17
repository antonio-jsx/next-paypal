export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-En", {
    style: "currency",
    currency: "USD",
  }).format(n);
}
