export function formatCurrency(value) {
  const amount = Number(value) || 0;
  const sign = amount < 0 ? "-" : "";
  const [integer, cents] = Math.abs(amount).toFixed(2).split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${sign}R$ ${formattedInteger},${cents}`;
}

export function parseCurrencyInput(value) {
  const cleaned = String(value)
    .replace(/R\$/g, "")
    .replace(/\s/g, "")
    .trim();

  const normalized = cleaned.includes(",")
    ? cleaned.replace(/\./g, "").replace(",", ".")
    : cleaned;

  return Number(normalized);
}
