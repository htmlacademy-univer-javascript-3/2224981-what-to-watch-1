export function formatWithSeparator(d: Date, sep: string) {
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join(sep);
}

export function formatToCountryStandart(d: Date, countryCode: string) {
  const options = {year: 'numeric', month: 'long', day: 'numeric'} as const;
  return d.toLocaleDateString(countryCode, options);
}
