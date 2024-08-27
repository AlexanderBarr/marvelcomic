export function extractIdFromUrl(url: string): string | null {
  const regex = /\/(\d+)$/;
  const match = regex.exec(url);
  return match ? (match[1] ?? null) : null;
}
