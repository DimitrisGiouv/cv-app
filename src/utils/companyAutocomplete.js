const COMPANY_AUTOCOMPLETE_ENDPOINT = 'https://autocomplete.clearbit.com/v1/companies/suggest';

const normalizeText = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const dedupeAndSort = (values, query, limit = 12) => {
  const normalizedQuery = String(query || '').trim().toLowerCase();
  const unique = new Map();

  values.forEach((value) => {
    const text = String(value || '').trim();
    if (!text) return;
    const key = text.toLowerCase();
    if (!unique.has(key)) unique.set(key, text);
  });

  return Array.from(unique.values())
    .sort((first, second) => {
      const firstLower = first.toLowerCase();
      const secondLower = second.toLowerCase();
      const firstStarts = firstLower.startsWith(normalizedQuery) ? 0 : 1;
      const secondStarts = secondLower.startsWith(normalizedQuery) ? 0 : 1;
      if (firstStarts !== secondStarts) return firstStarts - secondStarts;
      return first.localeCompare(second);
    })
    .slice(0, limit);
};

export const fetchCompanySuggestions = async ({ query, signal, limit = 12 } = {}) => {
  const trimmedQuery = String(query || '').trim();
  if (trimmedQuery.length < 2) return [];

  const url = `${COMPANY_AUTOCOMPLETE_ENDPOINT}?query=${encodeURIComponent(trimmedQuery)}`;
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Company autocomplete failed: ${response.status}`);

  const payload = await response.json();
  const names = Array.isArray(payload)
    ? payload
        .map((entry) => String(entry?.name || '').trim())
        .filter(Boolean)
    : [];

  return dedupeAndSort(names, trimmedQuery, limit);
};

export const getCompanySuggestionsFromSources = (query, sources, limit = 12) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery || normalizedQuery.length < 2) return [];

  const merged = [];
  (Array.isArray(sources) ? sources : []).forEach((source) => {
    if (!Array.isArray(source)) return;
    source.forEach((value) => {
      const text = String(value || '').trim();
      if (!text) return;
      if (!normalizeText(text).includes(normalizedQuery)) return;
      merged.push(text);
    });
  });

  return dedupeAndSort(merged, query, limit);
};
