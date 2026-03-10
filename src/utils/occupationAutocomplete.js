const OCCUPATION_DATA_ENDPOINTS = [
  'https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/occupations.json',
  'https://raw.githubusercontent.com/jneidel/job-titles/master/job-titles.json',
];

const CURATED_OCCUPATION_SUGGESTIONS = [
  'Junior Software Engineer',
  'Software Engineer',
  'Senior Software Engineer',
  'Software Engineering Intern',
  'Junior Frontend Engineer',
  'Frontend Engineer',
  'Senior Frontend Engineer',
  'Junior Backend Engineer',
  'Backend Engineer',
  'Senior Backend Engineer',
  'Junior Full-Stack Engineer',
  'Full-Stack Engineer',
  'Senior Full-Stack Engineer',
  'Junior Data Analyst',
  'Data Analyst',
  'Senior Data Analyst',
  'Junior QA Engineer',
  'QA Engineer',
  'Senior QA Engineer',
  'Junior DevOps Engineer',
  'DevOps Engineer',
  'Senior DevOps Engineer',
  'Environmental Engineer',
  'Captain',
];

const normalizeText = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const normalizeOccupationLabel = (value) => {
  const text = String(value || '').trim().replace(/\s+/g, ' ');
  if (!text) return '';
  const first = text.charAt(0);
  const upperFirst = /[a-z]/.test(first) ? first.toUpperCase() : first;
  return `${upperFirst}${text.slice(1)}`;
};

const sortByQuery = (values, query) => {
  const normalizedQuery = String(query || '').trim().toLowerCase();
  if (!normalizedQuery) return values;

  return [...values].sort((first, second) => {
    const firstLower = first.toLowerCase();
    const secondLower = second.toLowerCase();

    const firstStarts = firstLower.startsWith(normalizedQuery) ? 0 : 1;
    const secondStarts = secondLower.startsWith(normalizedQuery) ? 0 : 1;
    if (firstStarts !== secondStarts) return firstStarts - secondStarts;

    return first.localeCompare(second);
  });
};

const normalizeOccupationPayload = (payload) => {
  if (Array.isArray(payload)) {
    return payload
      .map((value) => normalizeOccupationLabel(value))
      .filter(Boolean);
  }

  if (Array.isArray(payload?.occupations)) {
    return payload.occupations
      .map((value) => normalizeOccupationLabel(value))
      .filter(Boolean);
  }

  return [];
};

export const fetchOccupationPayload = async ({ signal } = {}) => {
  for (const endpoint of OCCUPATION_DATA_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, { signal });
      if (!response.ok) continue;

      const payload = await response.json();
      const occupations = normalizeOccupationPayload(payload);
      if (occupations.length > 0) return occupations;
    } catch (error) {
      if (error?.name === 'AbortError') throw error;
    }
  }

  return [];
};

export const getOccupationSuggestions = (query, occupations, limit = 12) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery || normalizedQuery.length < 2) return [];

  const source = [
    ...CURATED_OCCUPATION_SUGGESTIONS,
    ...(Array.isArray(occupations) ? occupations : []),
  ];
  const unique = new Map();

  source.forEach((occupation) => {
    const value = normalizeOccupationLabel(occupation);
    if (!value) return;
    const key = value.toLowerCase();
    if (!unique.has(key)) {
      unique.set(key, value);
    }
  });

  const matches = Array.from(unique.values()).filter((occupation) =>
    normalizeText(occupation).includes(normalizedQuery)
  );

  return sortByQuery(matches, query).slice(0, limit);
};
