export function formatTime(timeMin: number) {
  if (!timeMin || timeMin <= 0) {
    return 'unknown';
  }
  const h = timeMin / 60;
  const m = timeMin % 60;

  return `${Math.floor(h)}h ${m}m`;
}
