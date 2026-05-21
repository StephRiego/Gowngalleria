/** Format amounts in Philippine Peso (₱) */
export function formatPeso(value, { compact = false } = {}) {
  const num = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;

  if (compact && num >= 1000) {
    const k = num / 1000;
    return `₱${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`;
  }

  return `₱${num.toLocaleString('en-PH', { maximumFractionDigits: 0 })}`;
}
