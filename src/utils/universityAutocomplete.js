const UNIVERSITY_AUTOCOMPLETE_ENDPOINTS = [
  'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json',
];

export const GLOBAL_AUTOCOMPLETE_LIMIT = 50;

const normalizeAutocompleteText = (value) =>
  String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const getUniversityAcronym = (name) =>
  String(name || '')
    .split(/\s+/)
    .map((part) => part.replace(/[^a-zA-Z]/g, ''))
    .filter(Boolean)
    .map((part) => part[0].toLowerCase())
    .join('');

export const matchesUniversityQuery = (entry, query) => {
  const normalizedQuery = normalizeAutocompleteText(query);
  if (!normalizedQuery) return false;

  if (normalizeAutocompleteText(entry?.name || '').includes(normalizedQuery)) {
    return true;
  }

  if (getUniversityAcronym(entry?.name || '').includes(normalizedQuery)) {
    return true;
  }

  if (normalizeAutocompleteText(entry?.country || '').includes(normalizedQuery)) {
    return true;
  }

  if (normalizeAutocompleteText(entry?.['state-province'] || '').includes(normalizedQuery)) {
    return true;
  }

  if (normalizeAutocompleteText(entry?.alpha_two_code || '').includes(normalizedQuery)) {
    return true;
  }

  return (entry?.domains || []).some((domain) =>
    normalizeAutocompleteText(domain).includes(normalizedQuery)
  );
};

export const dedupeUniversityNames = (names) =>
  Array.from(new Set((names || []).map((name) => String(name || '').trim()).filter(Boolean)));

export const sortUniversityNamesByQuery = (names, query) => {
  const normalizedQuery = String(query || '').trim().toLowerCase();
  if (!normalizedQuery) return names;

  return [...names].sort((first, second) => {
    const firstLower = first.toLowerCase();
    const secondLower = second.toLowerCase();
    const firstStarts = firstLower.startsWith(normalizedQuery) ? 0 : 1;
    const secondStarts = secondLower.startsWith(normalizedQuery) ? 0 : 1;
    if (firstStarts !== secondStarts) return firstStarts - secondStarts;
    return first.localeCompare(second);
  });
};

export const fetchUniversityPayload = async ({ query = '', signal } = {}) => {
  const trimmedQuery = String(query || '').trim();

  for (const endpoint of UNIVERSITY_AUTOCOMPLETE_ENDPOINTS) {
    try {
      const requestUrl = endpoint.includes('githubusercontent.com')
        ? endpoint
        : `${endpoint}?name=${encodeURIComponent(trimmedQuery)}`;

      const response = await fetch(requestUrl, { signal });
      if (!response.ok) continue;

      const payload = await response.json();
      if (!Array.isArray(payload)) continue;

      return payload;
    } catch {
      // Try the next endpoint.
    }
  }

  return [];
};
