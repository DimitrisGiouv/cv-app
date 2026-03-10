const normalizeText = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const tokenize = (value) =>
  String(value || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

const toTitleCase = (value) =>
  String(value || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

const LOCATION_STOPWORDS = [
  'university',
  'college',
  'institute',
  'technology',
  'polytechnic',
  'school',
  'national',
  'state',
  'federal',
  'academy',
  'faculty',
  'campus',
  'the',
];

const cleanupCandidate = (value) =>
  String(value || '')
    .trim()
    .replace(/[()\[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[.,;:]+$/g, '')
    .trim();

const isLikelyCityName = (value) => {
  const cleaned = cleanupCandidate(value);
  if (!cleaned) return false;

  const words = cleaned
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0 || words.length > 4) return false;
  if (words.some((word) => LOCATION_STOPWORDS.includes(word))) return false;
  if (!/^[a-z][a-z\s'.-]+$/i.test(cleaned)) return false;

  return true;
};

const extractCityFromUniversityName = (name) => {
  const text = String(name || '').trim();
  if (!text) return null;

  const ofMatch = text.match(/\bUniversity of\s+([^,]+)$/i);
  if (ofMatch) {
    const candidate = cleanupCandidate(ofMatch[1]);
    return isLikelyCityName(candidate) ? candidate : null;
  }

  const tailMatch = text.match(/\bUniversity of\s+([^,]+),/i);
  if (tailMatch) {
    const candidate = cleanupCandidate(tailMatch[1]);
    return isLikelyCityName(candidate) ? candidate : null;
  }

  return null;
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

const SKILL_SUGGESTION_POOL = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Next.js',
  'Vue.js',
  'Angular',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'Sass',
  'Python',
  'Java',
  'C',
  'C++',
  'C#',
  'Go',
  'Rust',
  'SQL',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'Firebase',
  'Git',
  'GitHub',
  'GitLab',
  'Docker',
  'Kubernetes',
  'Linux',
  'REST API',
  'GraphQL',
  'Testing',
  'Jest',
  'Cypress',
  'Playwright',
  'CI/CD',
  'Agile',
  'Scrum',
  'Problem Solving',
  'Communication',
  'Leadership',
  'Teamwork',
  'Time Management',
  'Machine Learning',
  'Data Analysis',
  'Excel',
  'Power BI',
  'Figma',
  'UI/UX Design',
];

const HEADLINE_SUGGESTION_POOL = [
  'Account Manager',
  'Accountant',
  'Administrative Assistant',
  'Architect',
  'Backend Engineer',
  'Business Analyst',
  'Business Development Manager',
  'Civil Engineer',
  'Cloud Engineer',
  'Content Creator',
  'Content Writer',
  'Customer Success Manager',
  'Customer Support Specialist',
  'Data Analyst',
  'Data Scientist',
  'Dentist',
  'DevOps Engineer',
  'Digital Marketing Specialist',
  'Electrical Engineer',
  'Elementary School Teacher',
  'Event Coordinator',
  'Financial Analyst',
  'Frontend Engineer',
  'Full-Stack Developer',
  'Graphic Designer',
  'HR Specialist',
  'High School Teacher',
  'Hospitality Manager',
  'Interior Designer',
  'Junior Accountant',
  'Junior Data Analyst',
  'Junior Frontend Engineer',
  'Junior Full-Stack Engineer',
  'Junior Marketing Specialist',
  'Junior Product Manager',
  'Junior Project Manager',
  'Junior QA Engineer',
  'Junior Software Engineer',
  'Legal Advisor',
  'Logistics Coordinator',
  'Machine Learning Engineer',
  'Marketing Manager',
  'Mechanical Engineer',
  'Medical Doctor',
  'Mobile Developer',
  'Nurse',
  'Operations Manager',
  'Pharmacist',
  'Product Designer',
  'Product Manager',
  'Project Manager',
  'QA Engineer',
  'Real Estate Agent',
  'Recruiter',
  'Registered Nurse',
  'Sales Manager',
  'Sales Representative',
  'Senior Data Analyst',
  'Senior DevOps Engineer',
  'Senior Frontend Engineer',
  'Senior Full-Stack Engineer',
  'Senior Product Manager',
  'Senior Project Manager',
  'Senior QA Engineer',
  'Senior Software Engineer',
  'Social Media Manager',
  'Software Engineer',
  'Software Engineer - Backend Systems',
  'Software Engineer - Data Platforms',
  'Software Engineer - Fintech',
  'Software Engineer - Frontend Applications',
  'Software Engineer - Web Applications',
  'Software Tester',
  'Supply Chain Analyst',
  'Teacher',
  'UI/UX Designer',
  'UX Researcher',
  'Veterinarian',
  'Video Editor',
  'Web Designer',
  'Web Developer',
];

const TARGET_ROLE_SUGGESTION_POOL = [
  'Frontend Engineer',
  'Backend Engineer',
  'Full-Stack Engineer',
  'Software Engineer',
  'Junior Software Engineer',
  'Mobile Developer',
  'DevOps Engineer',
  'Data Analyst',
  'QA Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Machine Learning Engineer',
];

const LANGUAGE_SUGGESTION_POOL = [
  'English',
  'Greek',
  'German',
  'French',
  'Spanish',
  'Italian',
  'Portuguese',
  'Dutch',
  'Russian',
  'Turkish',
  'Arabic',
  'Chinese',
  'Japanese',
  'Korean',
  'Hindi',
  'Swedish',
  'Norwegian',
  'Danish',
  'Polish',
  'Romanian',
  'Bulgarian',
  'Serbian',
  'Ukrainian',
];

const CERTIFICATION_ISSUER_POOL = [
  'Google',
  'Microsoft',
  'Amazon Web Services',
  'Cisco',
  'Oracle',
  'IBM',
  'Meta',
  'PMI',
  'Scrum.org',
  'Scrum Alliance',
  'CompTIA',
  'Udemy',
  'Coursera',
  'edX',
  'LinkedIn Learning',
  'HubSpot Academy',
  'Salesforce',
  'Kubernetes',
  'Linux Foundation',
  'MongoDB University',
];

const TECH_STACK_SUGGESTION_POOL = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Express',
  'Next.js',
  'Vue.js',
  'Angular',
  'Tailwind CSS',
  'Sass',
  'Redux',
  'Python',
  'Django',
  'Flask',
  'FastAPI',
  'Java',
  'Spring Boot',
  'C#',
  '.NET',
  'Go',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'Firebase',
  'Docker',
  'Kubernetes',
  'GitHub Actions',
  'AWS',
  'Azure',
  'GCP',
];

const LOCATION_GEOCODE_ENDPOINT = 'https://geocoding-api.open-meteo.com/v1/search';

export const getSkillSuggestions = (query, limit = 12) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery || normalizedQuery.length < 2) return [];

  const matches = SKILL_SUGGESTION_POOL.filter((skill) =>
    normalizeText(skill).includes(normalizedQuery)
  );

  return sortByQuery(matches, query).slice(0, limit);
};

export const getHeadlineSuggestions = (query, limit = 10) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery || normalizedQuery.length < 1) return [];

  const matches = HEADLINE_SUGGESTION_POOL.filter((headline) =>
    normalizeText(headline).includes(normalizedQuery)
  );

  return sortByQuery(matches, query).slice(0, limit);
};

export const getTargetRoleSuggestions = (query, limit = 10) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery || normalizedQuery.length < 1) return [];

  const matches = TARGET_ROLE_SUGGESTION_POOL.filter((role) =>
    normalizeText(role).includes(normalizedQuery)
  );

  return sortByQuery(matches, query).slice(0, limit);
};

export const getLanguageSuggestions = (query, limit = 12) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery || normalizedQuery.length < 1) return [];

  const matches = LANGUAGE_SUGGESTION_POOL.filter((language) =>
    normalizeText(language).includes(normalizedQuery)
  );

  return sortByQuery(matches, query).slice(0, limit);
};

export const getCertificationIssuerSuggestions = (query, limit = 12) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery || normalizedQuery.length < 1) return [];

  const matches = CERTIFICATION_ISSUER_POOL.filter((issuer) =>
    normalizeText(issuer).includes(normalizedQuery)
  );

  return sortByQuery(matches, query).slice(0, limit);
};

export const getTechStackSuggestions = (query, limit = 12) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery || normalizedQuery.length < 1) return [];

  const matches = TECH_STACK_SUGGESTION_POOL.filter((tech) =>
    normalizeText(tech).includes(normalizedQuery)
  );

  return sortByQuery(matches, query).slice(0, limit);
};

export const buildLocationIndexFromUniversities = (universities) => {
  if (!Array.isArray(universities)) return [];

  const set = new Set();
  universities.forEach((entry) => {
    const country = String(entry?.country || '').trim();
    const stateProvince = String(entry?.['state-province'] || '').trim();
    const cityFromName = extractCityFromUniversityName(entry?.name);

    if (cityFromName && country) {
      set.add(`${toTitleCase(cityFromName)}, ${country}`);
    }

    if (stateProvince && country) {
      // Prefer recruiter-friendly format: City/State, Country
      set.add(`${stateProvince}, ${country}`);
      return;
    }

    if (stateProvince) {
      set.add(stateProvince);
      return;
    }

    if (country) set.add(country);
  });

  return Array.from(set);
};

export const getLocationSuggestions = (query, locationIndex, limit = 12) => {
  const rawQuery = String(query || '').trim().toLowerCase();
  const normalizedQuery = normalizeText(rawQuery);
  if (!normalizedQuery || normalizedQuery.length < 2) return [];

  const source = Array.isArray(locationIndex) ? locationIndex : [];
  const scoredMatches = source
    .map((location) => {
      const lower = String(location || '').toLowerCase();
      const normalized = normalizeText(location);
      const tokens = tokenize(location);

      let score = 0;
      if (lower.startsWith(rawQuery)) score = 4;
      else if (tokens.some((token) => token.startsWith(rawQuery))) score = 3;
      else if (normalized.startsWith(normalizedQuery)) score = 2;
      else if (normalized.includes(normalizedQuery)) score = 1;

      return score > 0 ? { location, score } : null;
    })
    .filter(Boolean)
    .sort((first, second) => {
      if (second.score !== first.score) return second.score - first.score;
      return first.location.localeCompare(second.location);
    })
    .map((item) => item.location);

  return sortByQuery(scoredMatches, query).slice(0, limit);
};

export const fetchCityLocationSuggestions = async ({
  query,
  limit = 12,
  signal,
} = {}) => {
  const trimmedQuery = String(query || '').trim();
  if (trimmedQuery.length < 2) return [];

  const url = `${LOCATION_GEOCODE_ENDPOINT}?name=${encodeURIComponent(trimmedQuery)}&count=${Math.max(
    limit,
    10
  )}&language=en&format=json`;

  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Location geocode failed: ${response.status}`);

  const payload = await response.json();
  const results = Array.isArray(payload?.results) ? payload.results : [];

  const seen = new Set();
  const suggestions = [];

  const ranked = results
    .map((entry) => {
      const city = String(entry?.name || '').trim();
      const country = String(entry?.country || '').trim();
      if (!city || !country) return null;

      return {
        formatted: `${city}, ${country}`,
      };
    })
    .filter(Boolean)
    .sort((first, second) => first.formatted.localeCompare(second.formatted));

  ranked.forEach((entry) => {
    const formatted = entry.formatted;
    const key = formatted.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    suggestions.push(formatted);
  });

  return sortByQuery(suggestions, trimmedQuery).slice(0, limit);
};
