const STORAGE_KEY = 'cv_app_resumes_v1';

function safeParse(rawValue) {
  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readAll() {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  return safeParse(raw);
}

function writeAll(resumes) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
}

export function generateResumeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `resume_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

export function getAllResumes() {
  const resumes = readAll();
  return resumes.sort((a, b) => {
    const dateA = new Date(a.updatedAt || 0).getTime();
    const dateB = new Date(b.updatedAt || 0).getTime();
    return dateB - dateA;
  });
}

export function getResumeById(id) {
  if (!id) return null;
  const resumes = readAll();
  return resumes.find((item) => item.id === id) || null;
}

export function upsertResume(resume) {
  if (!resume?.id) return null;
  const resumes = readAll();
  const index = resumes.findIndex((item) => item.id === resume.id);

  if (index >= 0) {
    resumes[index] = resume;
  } else {
    resumes.push(resume);
  }

  writeAll(resumes);
  return resume;
}

export function deleteResumeById(id) {
  if (!id) return;
  const resumes = readAll();
  const next = resumes.filter((item) => item.id !== id);
  writeAll(next);
}
