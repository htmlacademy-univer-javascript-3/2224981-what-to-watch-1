export function formatTime(timeMin: number) {
  if (!timeMin || timeMin <= 0) {
    return 'unknown';
  }
  const h = timeMin / 60;
  const m = timeMin % 60;

  return `${Math.floor(h)}h ${m}m`;
}

export function formatLeadZeros(num: number, maxLength: number) {
  const numString = num.toString();
  const lack = Math.max(0, maxLength - numString.length);
  return '0'.repeat(lack) + numString;
}

export function formatFilmLeftTime(filmDurationMin: number, currentPosSec: number) {
  const z = (n: number) => formatLeadZeros(n ,2);
  const floor = Math.floor;

  const durSec = filmDurationMin * 60;
  const leftSec = durSec - floor(currentPosSec);

  const h = floor(leftSec / 3600);
  const m = floor(leftSec / 60) - h * 60;
  const s = leftSec - m * 60 - h * 3600;

  if (h > 0) {
    return `-${z(h)}:${z(m)}:${z(s)}`;
  }
}
