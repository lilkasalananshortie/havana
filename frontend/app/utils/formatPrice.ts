export function formatPrice(price: number, locale = "en-QA"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "QAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}