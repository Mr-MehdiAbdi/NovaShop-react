export function shortenText(text, maxLength = 90) {
  if (typeof text !== 'string') {
    return '';
  }

  const normalized = text.trim().replace(/\s+/g, ' ');

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trimEnd()}...`;
}
