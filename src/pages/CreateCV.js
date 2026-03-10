import { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useForm, useFieldArray } from 'react-hook-form';
import clsx from 'clsx';
import { ChevronDown, ChevronUp, Palette, RotateCcw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  TextInput,
  TwoColumnTextInput,
  TextAreaInput,
  FormSkills,
  FormEducation,
  FormExperience,
  FormProjects,
  FormLanguages,
  FormCertifications,
  FormReferences,
  FormCustomSections,
} from '../components/FormInput';
import AutocompleteInput from '../components/AutocompleteInput';
import { templates } from '../templates/resumeTemplates';
import FirstTemplate from '../templates/component/firstTemplate';
import SecondTemplate from '../templates/component/secondTemplate';
import ThirdTemplate from '../templates/component/thirdTemplate';
import FourthTemplate from '../templates/component/fourthTemplate';
import FifthTemplate from '../templates/component/fifthTemplate';
import previewBlank from '../assets/templatePreviews/blank.svg';
import previewProfessionalBlue from '../assets/templatePreviews/professional-blue.svg';
import previewExecutiveSplit from '../assets/templatePreviews/executive-split.svg';
import previewEditorialClean from '../assets/templatePreviews/editorial-clean.svg';
import previewModernCards from '../assets/templatePreviews/modern-cards.svg';
import previewCleanProfessional from '../assets/templatePreviews/clean-professional.svg';
import {
  generateResumeId,
  getResumeById,
  upsertResume,
} from '../utils/resumeStorage';
import {
  dedupeUniversityNames,
  fetchUniversityPayload,
  GLOBAL_AUTOCOMPLETE_LIMIT,
  matchesUniversityQuery,
  sortUniversityNamesByQuery,
} from '../utils/universityAutocomplete';
import {
  buildLocationIndexFromUniversities,
  fetchCityLocationSuggestions,
  getCertificationIssuerSuggestions,
  getLanguageSuggestions,
  getLocationSuggestions,
  getSkillSuggestions,
  getTechStackSuggestions,
} from '../utils/fieldAutocomplete';
import {
  fetchOccupationPayload,
  getOccupationSuggestions,
} from '../utils/occupationAutocomplete';
import {
  fetchCompanySuggestions,
  getCompanySuggestionsFromSources,
} from '../utils/companyAutocomplete';

/**
 * Template component mapping for dynamic template rendering
 */
const TEMPLATE_COMPONENTS = {
  Template_1: FirstTemplate,
  Template_2: SecondTemplate,
  Template_3: ThirdTemplate,
  Template_4: FourthTemplate,
  Template_5: FifthTemplate,
  Empty: () => <div className="text-center p-8 text-gray-500">Empty Template</div>,
};

const TEMPLATE_PREVIEWS = {
  Empty: previewBlank,
  Template_1: previewProfessionalBlue,
  Template_2: previewExecutiveSplit,
  Template_3: previewEditorialClean,
  Template_4: previewModernCards,
  Template_5: previewCleanProfessional,
};

const COLOR_FIELD_KEYS = [
  'primaryColor',
  'secondaryColor',
  'tertiaryColor',
  'textColor',
  'titleColor',
  'subtitleColor',
  'sectionTitleColor',
  'mutedTextColor',
  'headerTextColor',
  'sidebarTextColor',
  'linkColor',
  'dividerColor',
  'surfaceColor',
  'surfaceAltColor',
  'skillTrackColor',
];

const TEMPLATE_COLOR_DEFAULTS = {
  Template_1: {
    primaryColor: '#1e3a8a',
    secondaryColor: '#2563eb',
    tertiaryColor: '#0ea5e9',
    textColor: '#111827',
    titleColor: '#0f172a',
    subtitleColor: '#475569',
    sectionTitleColor: '#334155',
    mutedTextColor: '#6b7280',
    headerTextColor: '#ffffff',
    sidebarTextColor: '#ffffff',
    linkColor: '#0ea5e9',
    dividerColor: '#2563eb66',
    surfaceColor: '#ffffff',
    surfaceAltColor: '#f8fafc',
    skillTrackColor: '#e5e7eb',
  },
  Template_2: {
    primaryColor: '#0f172a',
    secondaryColor: '#334155',
    tertiaryColor: '#0ea5e9',
    textColor: '#0f172a',
    titleColor: '#ffffff',
    subtitleColor: '#e2e8f0',
    sectionTitleColor: '#475569',
    mutedTextColor: '#64748b',
    headerTextColor: '#ffffff',
    sidebarTextColor: '#ffffff',
    linkColor: '#0ea5e9',
    dividerColor: '#33415544',
    surfaceColor: '#ffffff',
    surfaceAltColor: '#f8fafc',
    skillTrackColor: '#e5e7eb',
  },
  Template_3: {
    primaryColor: '#111827',
    secondaryColor: '#4b5563',
    tertiaryColor: '#0ea5e9',
    textColor: '#18181b',
    titleColor: '#0f172a',
    subtitleColor: '#475569',
    sectionTitleColor: '#334155',
    mutedTextColor: '#6b7280',
    headerTextColor: '#ffffff',
    sidebarTextColor: '#ffffff',
    linkColor: '#0ea5e9',
    dividerColor: '#4b556355',
    surfaceColor: '#ffffff',
    surfaceAltColor: '#f8fafc',
    skillTrackColor: '#e5e7eb',
  },
  Template_4: {
    primaryColor: '#27272a',
    secondaryColor: '#52525b',
    tertiaryColor: '#38bdf8',
    textColor: '#111827',
    titleColor: '#f8fafc',
    subtitleColor: '#e4e4e7',
    sectionTitleColor: '#3f3f46',
    mutedTextColor: '#6b7280',
    headerTextColor: '#ffffff',
    sidebarTextColor: '#ffffff',
    linkColor: '#0284c7',
    dividerColor: '#52525b3d',
    surfaceColor: '#ffffff',
    surfaceAltColor: '#f9fafb',
    skillTrackColor: '#e5e7eb',
  },
  Template_5: {
    primaryColor: '#0f172a',
    secondaryColor: '#334155',
    tertiaryColor: '#0ea5e9',
    textColor: '#0f172a',
    titleColor: '#0f172a',
    subtitleColor: '#334155',
    sectionTitleColor: '#0f172a',
    mutedTextColor: '#64748b',
    headerTextColor: '#ffffff',
    sidebarTextColor: '#0f172a',
    linkColor: '#0ea5e9',
    dividerColor: '#cbd5e1',
    surfaceColor: '#ffffff',
    surfaceAltColor: '#f8fafc',
    skillTrackColor: '#e5e7eb',
  },
  Empty: {
    primaryColor: '#1e3a8a',
    secondaryColor: '#2563eb',
    tertiaryColor: '#0ea5e9',
    textColor: '#111827',
    titleColor: '#0f172a',
    subtitleColor: '#475569',
    sectionTitleColor: '#334155',
    mutedTextColor: '#6b7280',
    headerTextColor: '#ffffff',
    sidebarTextColor: '#ffffff',
    linkColor: '#0ea5e9',
    dividerColor: '#cbd5e1',
    surfaceColor: '#ffffff',
    surfaceAltColor: '#f8fafc',
    skillTrackColor: '#e5e7eb',
  },
};

const cloneTemplateColorDefaults = () =>
  Object.fromEntries(
    Object.entries(TEMPLATE_COLOR_DEFAULTS).map(([templateKey, colors]) => [templateKey, { ...colors }])
  );

const DEFAULT_FORM_VALUES = {
  name: '',
  showHeadline: true,
  headline: '',
  showProfileImage: false,
  profileImage: '',
  showContactIcons: true,
  showTargetRole: true,
  showEmail: true,
  showPhone: true,
  showWebsite: true,
  showLocation: true,
  showLinkedin: true,
  showGithub: true,
  showSummary: true,
  showExperience: true,
  showProjects: true,
  showSkills: true,
  showEducation: true,
  showLanguages: true,
  showCertifications: true,
  showReferences: true,
  showCustomSections: true,
  targetRole: '',
  email: '',
  phone: '',
  website: '',
  linkedin: '',
  github: '',
  location: '',
  summary: '',
  experience: [
    {
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      bulletPoints: '',
    },
  ],
  skills: [{ name: '', description: '', category: '', level: 50 }],
  education: [{ school: '', degree: '', year: '', location: '', startDate: '', endDate: '', gpa: '' }],
  projects: [{ name: '', link: '', role: '', techStack: '', startDate: '', endDate: '', description: '' }],
  languages: [{ name: '', level: '', cefr: '' }],
  certifications: [{ name: '', issuer: '', year: '', url: '', expirationDate: '' }],
  referenceEntries: [{ name: '', title: '', company: '', contact: '' }],
  referencesNote: 'Available upon request.',
  customSections: [{ title: '', content: '' }],
};

const VISIBILITY_FIELD_KEYS = [
  'showHeadline',
  'showProfileImage',
  'showContactIcons',
  'showTargetRole',
  'showEmail',
  'showPhone',
  'showWebsite',
  'showLocation',
  'showLinkedin',
  'showGithub',
  'showSummary',
  'showExperience',
  'showProjects',
  'showSkills',
  'showEducation',
  'showLanguages',
  'showCertifications',
  'showReferences',
  'showCustomSections',
];

const toBooleanVisibility = (value, fallback = true) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['false', '0', 'off', 'no'].includes(normalized)) return false;
    if (['true', '1', 'on', 'yes'].includes(normalized)) return true;
  }
  return fallback;
};

const normalizeVisibilityValues = (formValues) => {
  const next = { ...formValues };
  VISIBILITY_FIELD_KEYS.forEach((key) => {
    next[key] = toBooleanVisibility(next[key], DEFAULT_FORM_VALUES[key]);
  });
  // Email and phone are mandatory personal fields.
  next.showEmail = true;
  next.showPhone = true;
  return next;
};

const WIZARD_FIELD_KEYS = [
  'showHeadline',
  'showTargetRole',
  'showProfileImage',
  'showContactIcons',
  'showWebsite',
  'showLocation',
  'showLinkedin',
  'showGithub',
  'showSummary',
  'showExperience',
  'showProjects',
  'showSkills',
  'showEducation',
  'showLanguages',
  'showCertifications',
  'showReferences',
  'showCustomSections',
];

const getRecommendedLiteSelections = () => ({
  showHeadline: true,
  showProfileImage: false,
  showContactIcons: true,
  showTargetRole: true,
  showEmail: true,
  showPhone: true,
  showWebsite: false,
  showLocation: true,
  showLinkedin: false,
  showGithub: false,
  showSummary: true,
  showExperience: true,
  showProjects: false,
  showSkills: true,
  showEducation: true,
  showLanguages: false,
  showCertifications: false,
  showReferences: false,
  showCustomSections: false,
});

const DEFAULT_FONT_SIZES = {
  name: 24,
  headline: 14,
  email: 14,
  phone: 14,
  website: 14,
  linkedin: 14,
  github: 14,
  location: 14,
  summary: 14,
  experienceCompany: 14,
  experienceRole: 14,
  experienceDescription: 14,
  skillName: 14,
  skillDescription: 12,
  educationSchool: 14,
  educationDegree: 12,
  educationYear: 12,
  projectName: 14,
  projectMeta: 12,
  projectDates: 12,
  projectLink: 12,
  projectDescription: 14,
  languageName: 14,
  languageLevel: 12,
  certificationName: 14,
  certificationIssuer: 12,
  certificationYear: 12,
  references: 14,
  customTitle: 14,
  customContent: 14,
  targetRole: 14,
};

const TAILWIND_TEXT_SIZE_TO_PX = {
  'text-xs': 12,
  'text-sm': 14,
  'text-base': 16,
  'text-lg': 18,
  'text-xl': 20,
  'text-2xl': 24,
};

const CREATE_SECTION_NAV_VISIBILITY_KEY = 'show_create_section_nav';

const normalizeFontSizes = (fontSizes) => {
  const next = { ...DEFAULT_FONT_SIZES };
  if (!fontSizes || typeof fontSizes !== 'object') return next;

  Object.keys(DEFAULT_FONT_SIZES).forEach((key) => {
    const raw = fontSizes[key];

    if (typeof raw === 'number' && Number.isFinite(raw)) {
      next[key] = Math.min(48, Math.max(10, Math.round(raw)));
      return;
    }

    if (typeof raw === 'string') {
      const parsed = Number.parseInt(raw, 10);
      if (Number.isFinite(parsed)) {
        next[key] = Math.min(48, Math.max(10, parsed));
        return;
      }

      if (TAILWIND_TEXT_SIZE_TO_PX[raw]) {
        next[key] = TAILWIND_TEXT_SIZE_TO_PX[raw];
      }
    }
  });

  return next;
};

/**
 * CreateCV page component - Main page for creating and editing resumes with live preview
 */
export default function CreateCV() {
  const { t } = useTranslation();

  const themeColorFields = [
    { key: 'primaryColor', label: t('form.labels.primaryColor'), hint: 'Main background areas' },
    { key: 'secondaryColor', label: t('form.labels.secondaryColor'), hint: 'Accents and emphasis' },
    { key: 'tertiaryColor', label: t('form.labels.tertiaryColor'), hint: 'Extra highlights' },
    { key: 'titleColor', label: t('form.labels.titleColor'), hint: 'Full Name' },
    { key: 'subtitleColor', label: t('form.labels.subtitleColor'), hint: 'Headline and target role' },
    { key: 'sectionTitleColor', label: t('form.labels.sectionTitleColor'), hint: 'Section headings' },
    { key: 'textColor', label: t('form.labels.textColor'), hint: 'Main body text' },
    { key: 'mutedTextColor', label: t('form.labels.mutedTextColor'), hint: 'Dates and secondary text' },
    { key: 'headerTextColor', label: t('form.labels.headerTextColor'), hint: 'Header text' },
    { key: 'sidebarTextColor', label: 'Sidebar Text Color', hint: 'Left column text', templates: ['Template_1'] },
    { key: 'linkColor', label: 'Link Color', hint: 'Website, project, LinkedIn, GitHub links' },
    { key: 'dividerColor', label: 'Divider Color', hint: 'Lines and separators' },
    { key: 'surfaceColor', label: 'Page Background Color', hint: 'Whole page background' },
    { key: 'surfaceAltColor', label: 'Card Background Color', hint: 'Card blocks', templates: ['Template_4'] },
    { key: 'skillTrackColor', label: 'Skill Track Color', hint: 'Skill progress track', templates: ['Template_1'] },
  ];

  const sectionNavItems = [
    { key: 'personal', label: t('create.personalInformation') },
    { key: 'summary', label: t('create.professionalSummary') },
    { key: 'experience', label: t('template.experience') },
    { key: 'projects', label: t('template.projects') },
    { key: 'skills', label: t('template.skills') },
    { key: 'education', label: t('template.education') },
    { key: 'languages', label: t('template.languages') },
    { key: 'certifications', label: t('template.certifications') },
    { key: 'references', label: t('template.references') },
  ];

  const A4_PAGE_WIDTH_PX = 794;
  const A4_PAGE_HEIGHT_PX = 1123;
  const PREVIEW_GUTTER_PX = 64;

  const [searchParams] = useSearchParams();
  const initialResumeIdRef = useRef(searchParams.get('id') || generateResumeId());
  const initialResumeId = initialResumeIdRef.current;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control, name: 'skills' });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: 'education' });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({ control, name: 'experience' });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({ control, name: 'projects' });

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({ control, name: 'languages' });

  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({ control, name: 'certifications' });

  const {
    fields: referenceFields,
    append: appendReference,
    remove: removeReference,
  } = useFieldArray({ control, name: 'referenceEntries' });

  const {
    fields: customSectionFields,
    append: appendCustomSection,
    remove: removeCustomSection,
  } = useFieldArray({ control, name: 'customSections' });

  const formData = watch();
  const profileImageValue = watch('profileImage');
  const [resumeId, setResumeId] = useState(initialResumeId);
  const [selectedTemplate, setSelectedTemplate] = useState('Template_1');
  const [previewScale, setPreviewScale] = useState(0.7); // Scale for preview (70% default)
  const [pageCount, setPageCount] = useState(1);
  const [isDraggingPreview, setIsDraggingPreview] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [fieldFontSizes, setFieldFontSizes] = useState(DEFAULT_FONT_SIZES);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [templateColors, setTemplateColors] = useState(cloneTemplateColorDefaults);
  const [showSectionHooks, setShowSectionHooks] = useState(() => {
    if (typeof window === 'undefined') return true;
    const value = window.localStorage.getItem(CREATE_SECTION_NAV_VISIBILITY_KEY);
    return value === null ? true : value === 'true';
  });
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const [wizardSelections, setWizardSelections] = useState(getRecommendedLiteSelections);
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const [schoolAutocompleteOptions, setSchoolAutocompleteOptions] = useState([]);
  const [headlineSearchQuery, setHeadlineSearchQuery] = useState('');
  const [headlineAutocompleteOptions, setHeadlineAutocompleteOptions] = useState([]);
  const [targetRoleSearchQuery, setTargetRoleSearchQuery] = useState('');
  const [targetRoleAutocompleteOptions, setTargetRoleAutocompleteOptions] = useState([]);
  const [experienceRoleSearchQuery, setExperienceRoleSearchQuery] = useState('');
  const [experienceRoleAutocompleteOptions, setExperienceRoleAutocompleteOptions] = useState([]);
  const [projectRoleSearchQuery, setProjectRoleSearchQuery] = useState('');
  const [projectRoleAutocompleteOptions, setProjectRoleAutocompleteOptions] = useState([]);
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [skillAutocompleteOptions, setSkillAutocompleteOptions] = useState([]);
  const [languageSearchQuery, setLanguageSearchQuery] = useState('');
  const [languageAutocompleteOptions, setLanguageAutocompleteOptions] = useState([]);
  const [issuerSearchQuery, setIssuerSearchQuery] = useState('');
  const [issuerAutocompleteOptions, setIssuerAutocompleteOptions] = useState([]);
  const [techStackSearchQuery, setTechStackSearchQuery] = useState('');
  const [techStackAutocompleteOptions, setTechStackAutocompleteOptions] = useState([]);
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [locationAutocompleteOptions, setLocationAutocompleteOptions] = useState([]);
  const [companySearchQuery, setCompanySearchQuery] = useState('');
  const [companyAutocompleteOptions, setCompanyAutocompleteOptions] = useState([]);

  const visibleThemeColorFields = themeColorFields.filter(
    (colorField) => !colorField.templates || colorField.templates.includes(selectedTemplate)
  );

  const componentRef = useRef();
  const previewScrollRef = useRef();
  const leftPanelRef = useRef(null);
  const profileImageInputRef = useRef(null);
  const sectionRefs = useRef({});
  const canAutoSaveRef = useRef(false);
  const autoSaveTimerRef = useRef(null);
  const colorUpdateQueueRef = useRef({});
  const colorRafRef = useRef(null);
  const schoolSearchDebounceRef = useRef(null);
  const schoolSearchAbortRef = useRef(null);
  const locationSearchDebounceRef = useRef(null);
  const locationSearchAbortRef = useRef(null);
  const companySearchDebounceRef = useRef(null);
  const companySearchAbortRef = useRef(null);
  const companySuggestionsCacheRef = useRef([]);
  const allOccupationsRef = useRef(null);
  const allOccupationsFetchRef = useRef(null);
  const allUniversitiesRef = useRef(null);
  const allUniversitiesFetchRef = useRef(null);
  const universityLocationIndexRef = useRef(null);
  const defaultFieldFontSizesRef = useRef(DEFAULT_FONT_SIZES);
  const dragStateRef = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  useEffect(() => {
    const resumeFromStorage = getResumeById(initialResumeId);

    if (resumeFromStorage?.data) {
      const normalizedFontSizes = normalizeFontSizes(resumeFromStorage.fontSizes);
      const loadedTemplate = resumeFromStorage.selectedTemplate || 'Template_1';
      const mergedData = { ...DEFAULT_FORM_VALUES, ...resumeFromStorage.data };
      reset(normalizeVisibilityValues(mergedData));
      setFieldFontSizes(normalizedFontSizes);
      defaultFieldFontSizesRef.current = normalizedFontSizes;
      setSelectedTemplate(loadedTemplate);

      const baseColors = cloneTemplateColorDefaults();
      if (resumeFromStorage.templateColors && typeof resumeFromStorage.templateColors === 'object') {
        Object.keys(baseColors).forEach((templateKey) => {
          baseColors[templateKey] = {
            ...baseColors[templateKey],
            ...(resumeFromStorage.templateColors[templateKey] || {}),
          };
        });
      } else {
        // Backward compatibility: map legacy global color fields to the selected template only.
        const legacyColors = {};
        COLOR_FIELD_KEYS.forEach((fieldKey) => {
          const value = resumeFromStorage.data?.[fieldKey];
          if (typeof value === 'string' && value) {
            legacyColors[fieldKey] = value;
          }
        });
        if (Object.keys(legacyColors).length > 0) {
          baseColors[loadedTemplate] = {
            ...baseColors[loadedTemplate],
            ...legacyColors,
          };
        }
      }
      setTemplateColors(baseColors);

      setLastSavedAt(resumeFromStorage.updatedAt || null);
      setResumeId(resumeFromStorage.id);
      setShowSetupWizard(false);
    } else {
      defaultFieldFontSizesRef.current = DEFAULT_FONT_SIZES;
      setTemplateColors(cloneTemplateColorDefaults());
      setWizardSelections(getRecommendedLiteSelections());
      setShowSetupWizard(true);
    }

    canAutoSaveRef.current = true;
  }, [initialResumeId, reset]);

  useEffect(() => {
    if (!canAutoSaveRef.current) return;

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(() => {
      const savedAt = new Date().toISOString();

      upsertResume({
        id: resumeId,
        title: formData.name?.trim() || t('home.untitled'),
        updatedAt: savedAt,
        data: formData,
        templateColors,
        fontSizes: fieldFontSizes,
        selectedTemplate,
      });

      setLastSavedAt(savedAt);
    }, 500);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [formData, templateColors, fieldFontSizes, selectedTemplate, resumeId, t]);

  useEffect(() => {
    const syncSectionHooksVisibility = () => {
      const value = window.localStorage.getItem(CREATE_SECTION_NAV_VISIBILITY_KEY);
      setShowSectionHooks(value === null ? true : value === 'true');
    };

    window.addEventListener('storage', syncSectionHooksVisibility);
    window.addEventListener('create-section-nav-visibility-changed', syncSectionHooksVisibility);

    return () => {
      window.removeEventListener('storage', syncSectionHooksVisibility);
      window.removeEventListener('create-section-nav-visibility-changed', syncSectionHooksVisibility);
    };
  }, []);

  useEffect(() => {
    const target = componentRef.current;
    if (!target) return;

    const updatePageCount = () => {
      const height = target.scrollHeight || A4_PAGE_HEIGHT_PX;
      // Ignore tiny overflow caused by sub-pixel rendering/borders so preview
      // does not incorrectly create a second page card.
      const OVERFLOW_TOLERANCE_PX = 8;
      const normalizedHeight = Math.max(1, height - OVERFLOW_TOLERANCE_PX);
      setPageCount(Math.max(1, Math.ceil(normalizedHeight / A4_PAGE_HEIGHT_PX)));
    };

    updatePageCount();

    const observer = new ResizeObserver(updatePageCount);
    observer.observe(target);

    return () => observer.disconnect();
  }, [formData, selectedTemplate, fieldFontSizes, A4_PAGE_HEIGHT_PX]);

  /**
   * Handles PDF download by converting the resume preview to PDF
   * Supports multi-page A4 documents with automatic page breaks
   */
  const handleDownloadPDF = () => {
    const input = componentRef.current;
    if (!input) return;

    html2pdf()
      .set({
        margin: 0,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: {
          mode: ['css', 'legacy'],
          before: '.page-break-before',
          after: '.page-break',
        },
      })
      .from(input)
      .save();
  };

  /**
   * Handles form submission and logs the resume data
   */
  const onSubmit = (data) => {
    const savedAt = new Date().toISOString();

    upsertResume({
      id: resumeId,
      title: data.name?.trim() || t('home.untitled'),
      updatedAt: savedAt,
      data,
      templateColors,
      fontSizes: fieldFontSizes,
      selectedTemplate,
    });

    setLastSavedAt(savedAt);
  };

  /**
   * Renders the selected template component dynamically
   */
  const renderTemplate = () => {
    const TemplateComponent = TEMPLATE_COMPONENTS[selectedTemplate] || FirstTemplate;
    const selectedTemplateColors = templateColors[selectedTemplate] || TEMPLATE_COLOR_DEFAULTS[selectedTemplate] || TEMPLATE_COLOR_DEFAULTS.Template_1;
    return (
      <TemplateComponent
        data={{ ...formData, ...selectedTemplateColors }}
        fontSizes={fieldFontSizes}
        className="clean-template"
      />
    );
  };

  const previewContainerWidth = A4_PAGE_WIDTH_PX * previewScale;
  const previewCanvasWidth = previewContainerWidth + PREVIEW_GUTTER_PX * 2;

  const handlePreviewMouseDown = (event) => {
    if (event.button !== 0) return;

    const scrollEl = previewScrollRef.current;
    if (!scrollEl) return;

    dragStateRef.current = {
      isDown: true,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: scrollEl.scrollLeft,
      scrollTop: scrollEl.scrollTop,
    };

    setIsDraggingPreview(true);
    event.preventDefault();
  };

  const handlePreviewMouseMove = (event) => {
    const scrollEl = previewScrollRef.current;
    const drag = dragStateRef.current;
    if (!scrollEl || !drag.isDown) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    scrollEl.scrollLeft = drag.scrollLeft - deltaX;
    scrollEl.scrollTop = drag.scrollTop - deltaY;
  };

  const stopPreviewDragging = () => {
    if (!dragStateRef.current.isDown) return;
    dragStateRef.current.isDown = false;
    setIsDraggingPreview(false);
  };

  useEffect(() => {
    if (!isDraggingPreview) return undefined;

    window.addEventListener('mouseup', stopPreviewDragging);

    return () => {
      window.removeEventListener('mouseup', stopPreviewDragging);
    };
  }, [isDraggingPreview]);

  const registerSectionRef = (sectionKey) => (node) => {
    if (node) {
      sectionRefs.current[sectionKey] = node;
    } else {
      delete sectionRefs.current[sectionKey];
    }
  };

  const scrollToFormSection = (sectionKey) => {
    const container = leftPanelRef.current;
    const target = sectionRefs.current[sectionKey];
    if (!container || !target) return;

    container.scrollTo({
      top: Math.max(0, target.offsetTop - 12),
      behavior: 'smooth',
    });
  };

  const updateFieldFontSize = (fieldKey, rawValue) => {
    const parsed = Number.parseInt(rawValue, 10);
    if (!Number.isFinite(parsed)) return;

    const clamped = Math.min(48, Math.max(10, parsed));
    setFieldFontSizes((prev) => ({ ...prev, [fieldKey]: clamped }));
  };

  const changeFieldFontSizeBy = (fieldKey, delta) => {
    const next = (fieldFontSizes[fieldKey] || DEFAULT_FONT_SIZES[fieldKey]) + delta;
    updateFieldFontSize(fieldKey, next);
  };

  const resetFieldFontSize = (fieldKey) => {
    updateFieldFontSize(fieldKey, defaultFieldFontSizesRef.current[fieldKey]);
  };

  const openProfileImagePicker = () => {
    profileImageInputRef.current?.click();
  };

  const handleProfileImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      setValue('profileImage', reader.result, { shouldDirty: true, shouldTouch: true });
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const clearProfileImage = () => {
    setValue('profileImage', '', { shouldDirty: true, shouldTouch: true });
  };

  const resetThemeColor = (fieldKey) => {
    const templateDefaults = TEMPLATE_COLOR_DEFAULTS[selectedTemplate] || TEMPLATE_COLOR_DEFAULTS.Template_1;
    const defaultColor = templateDefaults[fieldKey];
    if (!defaultColor) return;

    // Drop queued rapid updates for this template to avoid stale overwrite after reset.
    delete colorUpdateQueueRef.current[selectedTemplate];

    setTemplateColors((prev) => ({
      ...prev,
      [selectedTemplate]: {
        ...(prev[selectedTemplate] || templateDefaults),
        [fieldKey]: defaultColor,
      },
    }));
  };

  const resetAllThemeColors = () => {
    const templateDefaults = TEMPLATE_COLOR_DEFAULTS[selectedTemplate] || TEMPLATE_COLOR_DEFAULTS.Template_1;

    // Drop queued rapid updates for this template to avoid stale overwrite after reset.
    delete colorUpdateQueueRef.current[selectedTemplate];

    setTemplateColors((prev) => ({
      ...prev,
      [selectedTemplate]: { ...templateDefaults },
    }));
  };

  const updateTemplateColor = (fieldKey, value) => {
    const templateKey = selectedTemplate;
    if (!colorUpdateQueueRef.current[templateKey]) {
      colorUpdateQueueRef.current[templateKey] = {};
    }

    colorUpdateQueueRef.current[templateKey][fieldKey] = value;

    if (colorRafRef.current !== null) return;

    colorRafRef.current = window.requestAnimationFrame(() => {
      const queuedUpdates = colorUpdateQueueRef.current;
      colorUpdateQueueRef.current = {};
      colorRafRef.current = null;

      setTemplateColors((prev) => {
        let next = prev;

        Object.entries(queuedUpdates).forEach(([queuedTemplateKey, queuedFields]) => {
          if (!queuedFields || Object.keys(queuedFields).length === 0) return;
          const templateDefaults = TEMPLATE_COLOR_DEFAULTS[queuedTemplateKey] || TEMPLATE_COLOR_DEFAULTS.Template_1;
          const mergedTemplateColors = {
            ...(prev[queuedTemplateKey] || templateDefaults),
            ...queuedFields,
          };

          if (next === prev) {
            next = { ...prev };
          }

          next[queuedTemplateKey] = mergedTemplateColors;
        });

        return next;
      });
    });
  };

  useEffect(() => () => {
    if (colorRafRef.current !== null) {
      window.cancelAnimationFrame(colorRafRef.current);
    }
  }, []);

  const loadAllOccupations = async () => {
    if (Array.isArray(allOccupationsRef.current)) return allOccupationsRef.current;

    if (!allOccupationsFetchRef.current) {
      allOccupationsFetchRef.current = fetchOccupationPayload()
        .then((payload) => {
          const list = Array.isArray(payload) ? payload : [];
          allOccupationsRef.current = list;
          return list;
        })
        .catch(() => [])
        .finally(() => {
          allOccupationsFetchRef.current = null;
        });
    }

    return allOccupationsFetchRef.current;
  };

  useEffect(() => {
    const trimmedQuery = headlineSearchQuery.trim();
    if (trimmedQuery.length < 2) {
      setHeadlineAutocompleteOptions([]);
      return;
    }

    const getSuggestions = () =>
      getOccupationSuggestions(trimmedQuery, allOccupationsRef.current, 10);

    const initial = getSuggestions();
    setHeadlineAutocompleteOptions(initial);

    if (initial.length > 0) return;

    loadAllOccupations()
      .then(() => {
        const next = getSuggestions();
        setHeadlineAutocompleteOptions(next);
      })
      .catch(() => {
        setHeadlineAutocompleteOptions([]);
      });
  }, [headlineSearchQuery]);

  useEffect(() => {
    const trimmedQuery = targetRoleSearchQuery.trim();
    if (trimmedQuery.length < 2) {
      setTargetRoleAutocompleteOptions([]);
      return;
    }

    const getSuggestions = () =>
      getOccupationSuggestions(trimmedQuery, allOccupationsRef.current, 10);

    const initial = getSuggestions();
    setTargetRoleAutocompleteOptions(initial);

    if (initial.length > 0) return;

    loadAllOccupations()
      .then(() => {
        const next = getSuggestions();
        setTargetRoleAutocompleteOptions(next);
      })
      .catch(() => {
        setTargetRoleAutocompleteOptions([]);
      });
  }, [targetRoleSearchQuery]);

  useEffect(() => {
    const trimmedQuery = experienceRoleSearchQuery.trim();
    if (trimmedQuery.length < 2) {
      setExperienceRoleAutocompleteOptions([]);
      return;
    }

    const lowerQuery = trimmedQuery.toLowerCase();
    const localRoles = Array.isArray(formData?.experience)
      ? formData.experience
          .map((item) => String(item?.role || '').trim())
          .filter(Boolean)
      : [];

    const getSuggestions = () => {
      const occupationSuggestions = getOccupationSuggestions(trimmedQuery, allOccupationsRef.current, 10);
      const roleMatches = localRoles.filter((role) => role.toLowerCase().includes(lowerQuery));
      return Array.from(new Set([...occupationSuggestions, ...roleMatches])).slice(0, 12);
    };

    const initial = getSuggestions();
    setExperienceRoleAutocompleteOptions(initial);

    if (initial.length > 0) return;

    loadAllOccupations()
      .then(() => {
        const next = getSuggestions();
        setExperienceRoleAutocompleteOptions(next);
      })
      .catch(() => {
        setExperienceRoleAutocompleteOptions([]);
      });
  }, [experienceRoleSearchQuery, formData?.experience]);

  useEffect(() => {
    const trimmedQuery = projectRoleSearchQuery.trim();
    if (trimmedQuery.length < 2) {
      setProjectRoleAutocompleteOptions([]);
      return;
    }

    const lowerQuery = trimmedQuery.toLowerCase();
    const localProjectRoles = Array.isArray(formData?.projects)
      ? formData.projects
          .map((item) => String(item?.role || '').trim())
          .filter(Boolean)
      : [];

    const getSuggestions = () => {
      const occupationSuggestions = getOccupationSuggestions(trimmedQuery, allOccupationsRef.current, 10);
      const localMatches = localProjectRoles.filter((role) => role.toLowerCase().includes(lowerQuery));
      return Array.from(new Set([...occupationSuggestions, ...localMatches])).slice(0, 12);
    };

    const initial = getSuggestions();
    setProjectRoleAutocompleteOptions(initial);

    if (initial.length > 0) return;

    loadAllOccupations()
      .then(() => {
        const next = getSuggestions();
        setProjectRoleAutocompleteOptions(next);
      })
      .catch(() => {
        setProjectRoleAutocompleteOptions([]);
      });
  }, [projectRoleSearchQuery, formData?.projects]);

  useEffect(() => {
    const suggestions = getSkillSuggestions(skillSearchQuery, 12);
    setSkillAutocompleteOptions(suggestions);
  }, [skillSearchQuery]);

  useEffect(() => {
    const suggestions = getLanguageSuggestions(languageSearchQuery, 12);
    setLanguageAutocompleteOptions(suggestions);
  }, [languageSearchQuery]);

  useEffect(() => {
    const suggestions = getCertificationIssuerSuggestions(issuerSearchQuery, 12);
    setIssuerAutocompleteOptions(suggestions);
  }, [issuerSearchQuery]);

  useEffect(() => {
    const suggestions = getTechStackSuggestions(techStackSearchQuery, 12);
    setTechStackAutocompleteOptions(suggestions);
  }, [techStackSearchQuery]);

  const loadAllUniversities = async () => {
    if (Array.isArray(allUniversitiesRef.current)) return allUniversitiesRef.current;
    if (!allUniversitiesFetchRef.current) {
      allUniversitiesFetchRef.current = fetchUniversityPayload()
        .then((payload) => {
          const list = Array.isArray(payload) ? payload : [];
          allUniversitiesRef.current = list;
          universityLocationIndexRef.current = buildLocationIndexFromUniversities(list);
          return list;
        })
        .catch(() => [])
        .finally(() => {
          allUniversitiesFetchRef.current = null;
        });
    }
    return allUniversitiesFetchRef.current;
  };

  useEffect(() => {
    const trimmedQuery = schoolSearchQuery.trim();

    const getCachedMatches = () => {
      if (!Array.isArray(allUniversitiesRef.current)) return [];
      return allUniversitiesRef.current
        .filter((entry) => matchesUniversityQuery(entry, trimmedQuery))
        .map((entry) => entry.name);
    };

    if (schoolSearchDebounceRef.current) {
      clearTimeout(schoolSearchDebounceRef.current);
      schoolSearchDebounceRef.current = null;
    }

    if (schoolSearchAbortRef.current) {
      schoolSearchAbortRef.current.abort();
      schoolSearchAbortRef.current = null;
    }

    if (trimmedQuery.length < 2) {
      setSchoolAutocompleteOptions([]);
      return undefined;
    }

    const initialMatches = sortUniversityNamesByQuery(
      dedupeUniversityNames(getCachedMatches()),
      trimmedQuery
    ).slice(0, GLOBAL_AUTOCOMPLETE_LIMIT);
    setSchoolAutocompleteOptions(initialMatches);

    schoolSearchDebounceRef.current = window.setTimeout(async () => {
      const controller = new AbortController();
      schoolSearchAbortRef.current = controller;

      try {
        const payload = await fetchUniversityPayload({ query: trimmedQuery, signal: controller.signal });
        if (!Array.isArray(payload) || payload.length === 0) {
          const cachedNames = sortUniversityNamesByQuery(
            dedupeUniversityNames(getCachedMatches()),
            trimmedQuery
          ).slice(0, GLOBAL_AUTOCOMPLETE_LIMIT);
          setSchoolAutocompleteOptions(cachedNames);
          return;
        }

        const apiNames = payload
          .filter((entry) => matchesUniversityQuery(entry, trimmedQuery))
          .map((entry) => (typeof entry?.name === 'string' ? entry.name.trim() : ''))
          .filter(Boolean);

        let cachedNames = getCachedMatches();
        if (cachedNames.length === 0) {
          await loadAllUniversities();
          cachedNames = getCachedMatches();
        }

        const merged = sortUniversityNamesByQuery(
          dedupeUniversityNames([...apiNames, ...cachedNames]),
          trimmedQuery
        ).slice(0, GLOBAL_AUTOCOMPLETE_LIMIT);
        setSchoolAutocompleteOptions(merged);
      } catch (error) {
        if (error?.name !== 'AbortError') {
          let cachedNames = getCachedMatches();
          if (cachedNames.length === 0) {
            await loadAllUniversities();
            cachedNames = getCachedMatches();
          }

          const fallback = sortUniversityNamesByQuery(
            dedupeUniversityNames(cachedNames),
            trimmedQuery
          ).slice(0, GLOBAL_AUTOCOMPLETE_LIMIT);
          setSchoolAutocompleteOptions(fallback);
        }
      }
    }, 250);

    return () => {
      if (schoolSearchDebounceRef.current) {
        clearTimeout(schoolSearchDebounceRef.current);
        schoolSearchDebounceRef.current = null;
      }

      if (schoolSearchAbortRef.current) {
        schoolSearchAbortRef.current.abort();
        schoolSearchAbortRef.current = null;
      }
    };
  }, [schoolSearchQuery]);

  useEffect(() => {
    // Prime the global university index once so fallback suggestions stay global.
    if (!allUniversitiesFetchRef.current && !Array.isArray(allUniversitiesRef.current)) {
      loadAllUniversities().catch(() => {
        allUniversitiesRef.current = [];
      });
    }

    if (!allOccupationsFetchRef.current && !Array.isArray(allOccupationsRef.current)) {
      loadAllOccupations().catch(() => {
        allOccupationsRef.current = [];
      });
    }
  }, []);

  useEffect(() => {
    const trimmedQuery = locationSearchQuery.trim();

    if (locationSearchDebounceRef.current) {
      clearTimeout(locationSearchDebounceRef.current);
      locationSearchDebounceRef.current = null;
    }

    if (locationSearchAbortRef.current) {
      locationSearchAbortRef.current.abort();
      locationSearchAbortRef.current = null;
    }

    if (trimmedQuery.length < 2) {
      setLocationAutocompleteOptions([]);
      return;
    }

    const getSuggestions = () =>
      getLocationSuggestions(trimmedQuery, universityLocationIndexRef.current, 12);

    const initial = getSuggestions();
    setLocationAutocompleteOptions(initial);

    locationSearchDebounceRef.current = window.setTimeout(async () => {
      const controller = new AbortController();
      locationSearchAbortRef.current = controller;

      try {
        const citySuggestions = await fetchCityLocationSuggestions({
          query: trimmedQuery,
          limit: 12,
          signal: controller.signal,
        });

        if (citySuggestions.length > 0) {
          setLocationAutocompleteOptions(citySuggestions);
          return;
        }

        if (!Array.isArray(allUniversitiesRef.current)) {
          await loadAllUniversities();
        }

        const fallback = getSuggestions();
        setLocationAutocompleteOptions(fallback);
      } catch (error) {
        if (error?.name !== 'AbortError') {
          if (!Array.isArray(allUniversitiesRef.current)) {
            await loadAllUniversities();
          }

          const fallback = getSuggestions();
          setLocationAutocompleteOptions(fallback);
        }
      }
    }, 250);

    return () => {
      if (locationSearchDebounceRef.current) {
        clearTimeout(locationSearchDebounceRef.current);
        locationSearchDebounceRef.current = null;
      }

      if (locationSearchAbortRef.current) {
        locationSearchAbortRef.current.abort();
        locationSearchAbortRef.current = null;
      }
    };
  }, [locationSearchQuery]);

  useEffect(() => {
    const trimmedQuery = companySearchQuery.trim();

    if (companySearchDebounceRef.current) {
      clearTimeout(companySearchDebounceRef.current);
      companySearchDebounceRef.current = null;
    }

    if (companySearchAbortRef.current) {
      companySearchAbortRef.current.abort();
      companySearchAbortRef.current = null;
    }

    if (trimmedQuery.length < 2) {
      setCompanyAutocompleteOptions([]);
      return;
    }

    const localCompanyNames = Array.isArray(formData?.experience)
      ? formData.experience
          .map((item) => String(item?.company || '').trim())
          .filter(Boolean)
      : [];

    const getLocalSuggestions = () =>
      getCompanySuggestionsFromSources(
        trimmedQuery,
        [localCompanyNames, companySuggestionsCacheRef.current],
        12
      );

    const initial = getLocalSuggestions();
    setCompanyAutocompleteOptions(initial);

    companySearchDebounceRef.current = window.setTimeout(async () => {
      const controller = new AbortController();
      companySearchAbortRef.current = controller;

      try {
        const remoteSuggestions = await fetchCompanySuggestions({
          query: trimmedQuery,
          signal: controller.signal,
          limit: 12,
        });

        if (remoteSuggestions.length > 0) {
          companySuggestionsCacheRef.current = Array.from(
            new Set([...companySuggestionsCacheRef.current, ...remoteSuggestions])
          ).slice(0, 400);
        }

        const merged = getCompanySuggestionsFromSources(
          trimmedQuery,
          [remoteSuggestions, localCompanyNames, companySuggestionsCacheRef.current],
          12
        );
        setCompanyAutocompleteOptions(merged);
      } catch (error) {
        if (error?.name !== 'AbortError') {
          setCompanyAutocompleteOptions(getLocalSuggestions());
        }
      }
    }, 250);

    return () => {
      if (companySearchDebounceRef.current) {
        clearTimeout(companySearchDebounceRef.current);
        companySearchDebounceRef.current = null;
      }

      if (companySearchAbortRef.current) {
        companySearchAbortRef.current.abort();
        companySearchAbortRef.current = null;
      }
    };
  }, [companySearchQuery, formData?.experience]);

  useEffect(() => () => {
    if (schoolSearchDebounceRef.current) {
      clearTimeout(schoolSearchDebounceRef.current);
    }

    if (schoolSearchAbortRef.current) {
      schoolSearchAbortRef.current.abort();
    }

    if (locationSearchDebounceRef.current) {
      clearTimeout(locationSearchDebounceRef.current);
    }

    if (locationSearchAbortRef.current) {
      locationSearchAbortRef.current.abort();
    }

    if (companySearchDebounceRef.current) {
      clearTimeout(companySearchDebounceRef.current);
    }

    if (companySearchAbortRef.current) {
      companySearchAbortRef.current.abort();
    }
  }, []);

  const handleSchoolAutocompleteQueryChange = (rawValue) => {
    setSchoolSearchQuery(String(rawValue || ''));
  };

  const handleHeadlineAutocompleteQueryChange = (rawValue) => {
    setHeadlineSearchQuery(String(rawValue || ''));
  };

  const handleTargetRoleAutocompleteQueryChange = (rawValue) => {
    setTargetRoleSearchQuery(String(rawValue || ''));
  };

  const handleExperienceRoleAutocompleteQueryChange = (rawValue) => {
    setExperienceRoleSearchQuery(String(rawValue || ''));
  };

  const handleProjectRoleAutocompleteQueryChange = (rawValue) => {
    setProjectRoleSearchQuery(String(rawValue || ''));
  };

  const handleSkillAutocompleteQueryChange = (rawValue) => {
    setSkillSearchQuery(String(rawValue || ''));
  };

  const handleLocationAutocompleteQueryChange = (rawValue) => {
    setLocationSearchQuery(String(rawValue || ''));
  };

  const handleLanguageAutocompleteQueryChange = (rawValue) => {
    setLanguageSearchQuery(String(rawValue || ''));
  };

  const handleIssuerAutocompleteQueryChange = (rawValue) => {
    setIssuerSearchQuery(String(rawValue || ''));
  };

  const handleTechStackAutocompleteQueryChange = (rawValue) => {
    setTechStackSearchQuery(String(rawValue || ''));
  };

  const handleCompanyAutocompleteQueryChange = (rawValue) => {
    setCompanySearchQuery(String(rawValue || ''));
  };

  /**
   * Compact field-level font size control with decrement/increment and reset default
   */
  const FontSizeControl = ({ fieldKey, compact = false }) => (
    <div className={compact ? 'w-[10.5rem] shrink-0' : 'mb-2'}>
      <div className="h-7 flex items-center justify-end gap-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 px-1">
        <button
          type="button"
          onClick={() => changeFieldFontSizeBy(fieldKey, -1)}
          className="h-5 w-5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-[11px] font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={`${t('form.fontSize')} down`}
        >
          -
        </button>
        <div className="h-5 min-w-[3.2rem] rounded bg-gray-100 dark:bg-gray-800 px-1 text-[11px] font-semibold text-gray-900 dark:text-gray-100 flex items-center justify-center">
          {fieldFontSizes[fieldKey]}px
        </div>
        <button
          type="button"
          onClick={() => changeFieldFontSizeBy(fieldKey, 1)}
          className="h-5 w-5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-[11px] font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={`${t('form.fontSize')} up`}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => resetFieldFontSize(fieldKey)}
          className="h-5 w-5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          title={`Default ${defaultFieldFontSizesRef.current[fieldKey]}px`}
          aria-label={`Reset ${fieldKey} font size`}
        >
          <RotateCcw size={10} className="mx-auto" />
        </button>
      </div>
    </div>
  );

  const visibilityCheckboxClassName = 'h-3.5 w-3.5 shrink-0 cursor-pointer accent-blue-600';

  const renderVisibilityCheckbox = (fieldName) => (
    <input
      type="checkbox"
      id={`toggle-${fieldName}`}
      {...register(fieldName)}
      className={visibilityCheckboxClassName}
      title="Include in CV"
      aria-label={`Include ${fieldName} in CV`}
    />
  );

  const wizardPersonalFields = [
    { key: 'showHeadline', label: t('form.labels.professionalHeadline') },
    { key: 'showTargetRole', label: t('form.labels.targetRole') },
    { key: 'showProfileImage', label: 'Profile Image' },
    { key: 'showContactIcons', label: 'Contact Icons' },
    { key: 'showWebsite', label: t('form.labels.website') },
    { key: 'showLocation', label: t('form.labels.location') },
    { key: 'showLinkedin', label: t('form.labels.linkedin') },
    { key: 'showGithub', label: t('form.labels.github') },
  ];

  const wizardSectionFields = [
    { key: 'showSummary', label: t('create.professionalSummary') },
    { key: 'showExperience', label: t('template.experience') },
    { key: 'showProjects', label: t('template.projects') },
    { key: 'showSkills', label: t('template.skills') },
    { key: 'showEducation', label: t('template.education') },
    { key: 'showLanguages', label: t('template.languages') },
    { key: 'showCertifications', label: t('template.certifications') },
    { key: 'showReferences', label: t('template.references') },
    { key: 'showCustomSections', label: 'Custom Sections' },
  ];

  const toggleWizardOption = (fieldKey) => {
    setWizardSelections((prev) => ({ ...prev, [fieldKey]: !prev[fieldKey] }));
  };

  const setAllWizardOptions = (enabled) => {
    setWizardSelections((prev) => {
      const next = { ...prev };
      WIZARD_FIELD_KEYS.forEach((key) => {
        next[key] = enabled;
      });
      return next;
    });
  };

  const applyWizardSelections = () => {
    WIZARD_FIELD_KEYS.forEach((key) => {
      setValue(key, !!wizardSelections[key], { shouldDirty: true, shouldTouch: true });
    });
    setShowSetupWizard(false);
  };

  const skipWizard = () => {
    setShowSetupWizard(false);
  };

  const websiteRegister = register('website');
  const locationRegister = register('location');
  const headlineRegister = register('headline');
  const targetRoleRegister = register('targetRole');
  const sectionGroupClass = 'mt-8 pt-6 border-t border-gray-200 dark:border-gray-700';

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex w-full h-full min-h-0 overflow-hidden"
    >
      {showSetupWizard ? (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">New CV Setup</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Select which information you want enabled before you start editing.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setAllWizardOptions(true)}
                className="rounded border border-gray-300 dark:border-gray-600 px-3 py-1 text-xs font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Enable All
              </button>
              <button
                type="button"
                onClick={() => setAllWizardOptions(false)}
                className="rounded border border-gray-300 dark:border-gray-600 px-3 py-1 text-xs font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Disable All
              </button>
              <button
                type="button"
                onClick={() => setWizardSelections(getRecommendedLiteSelections())}
                className="rounded border border-gray-300 dark:border-gray-600 px-3 py-1 text-xs font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Recommended Lite
              </button>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200">Personal Fields</h4>
                <div className="grid gap-2">
                  {wizardPersonalFields.map((field) => (
                    <label key={field.key} className="inline-flex items-center gap-2 text-sm text-gray-800 dark:text-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!wizardSelections[field.key]}
                        onChange={() => toggleWizardOption(field.key)}
                        className="h-4 w-4 cursor-pointer accent-blue-600"
                      />
                      {field.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200">Sections</h4>
                <div className="grid gap-2">
                  {wizardSectionFields.map((field) => (
                    <label key={field.key} className="inline-flex items-center gap-2 text-sm text-gray-800 dark:text-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!wizardSelections[field.key]}
                        onChange={() => toggleWizardOption(field.key)}
                        className="h-4 w-4 cursor-pointer accent-blue-600"
                      />
                      {field.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={skipWizard}
                className="rounded border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={applyWizardSelections}
                className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Start Editing
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* ===== LEFT PANEL: FORM INPUTS ===== */}
        <div
          ref={leftPanelRef}
          className={clsx(
            'w-[35%] h-full min-h-0',
            'bg-gray-200 dark:bg-gray-800',
            'p-6 overflow-y-auto scroll-smooth',
            'border-r border-gray-300 dark:border-gray-700'
          )}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('create.title')}
            </h2>
            <div className="flex shrink-0 items-center gap-3">
              <label className="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                <input type="checkbox" {...register('showContactIcons')} className="h-3.5 w-3.5" />
                Show contact icons
              </label>
              <button
                type="button"
                onClick={() => setShowColorModal((prev) => !prev)}
                aria-expanded={showColorModal}
                aria-controls="theme-colors-panel"
                className="flex shrink-0 items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 whitespace-nowrap"
              >
                <Palette size={14} />
                {t('create.colorThemeButton')}
                {showColorModal ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          </div>

          {showSectionHooks ? (
            <div className="mb-5 rounded-lg border border-gray-300 bg-white/70 p-3 dark:border-gray-700 dark:bg-gray-900/50">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">Quick navigation</p>
              <div className="flex flex-wrap gap-2">
                {sectionNavItems.map((section) => (
                  <button
                    key={section.key}
                    type="button"
                    onClick={() => scrollToFormSection(section.key)}
                    className="rounded-full border border-gray-300 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {showColorModal && (
            <div className="mb-6 rounded-lg border border-gray-300 bg-white/80 p-4 dark:border-gray-700 dark:bg-gray-900/70">
              <div id="theme-colors-panel" className="grid gap-3">
                <div className="flex items-center justify-between gap-2 rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs text-blue-800 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
                  <span>
                    Editing colors for: <span className="font-semibold">{templates[selectedTemplate] || selectedTemplate}</span>
                  </span>
                  <button
                    type="button"
                    onClick={resetAllThemeColors}
                    className="inline-flex items-center gap-1 rounded border border-blue-300 bg-white px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-800/50"
                    title="Reset all colors for this template"
                    aria-label="Reset all colors for this template"
                  >
                    <RotateCcw size={11} />
                    Reset All
                  </button>
                </div>

                {visibleThemeColorFields.map((colorField) => (
                  <div key={colorField.key} className="flex items-center justify-between gap-3 text-sm text-gray-800 dark:text-gray-100">
                    <div className="min-w-0">
                      <p className="font-medium leading-tight">{colorField.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{colorField.hint}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={
                          templateColors[selectedTemplate]?.[colorField.key] ||
                          TEMPLATE_COLOR_DEFAULTS[selectedTemplate]?.[colorField.key] ||
                          TEMPLATE_COLOR_DEFAULTS.Template_1[colorField.key]
                        }
                        onChange={(event) => updateTemplateColor(colorField.key, event.target.value)}
                        className="h-8 w-10 cursor-pointer rounded border border-gray-300 bg-transparent p-0.5 dark:border-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() => resetThemeColor(colorField.key)}
                        className="rounded border border-gray-300 p-1 text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                        aria-label={`Reset ${colorField.label}`}
                        title={`Reset ${colorField.label}`}
                      >
                        <RotateCcw size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Information Section */}
          <div ref={registerSectionRef('personal')} className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {t('create.personalInformation')}
            </h3>

            <TextInput
              label={t('form.labels.fullName')}
              error={errors.name?.message}
              registerProps={register('name', {
                required: t('form.errors.nameRequired'),
              })}
              fontSizeDropdown={
                <FontSizeControl fieldKey="name" compact />
              }
            />

            <TextInput
              label={t('form.labels.professionalHeadline')}
              labelSuffix={renderVisibilityCheckbox('showHeadline')}
              error={errors.headline?.message}
              registerProps={{
                ...headlineRegister,
                placeholder: t('form.placeholders.professionalHeadline'),
              }}
              customInput={
                <AutocompleteInput
                  name="headline"
                  registerReturn={headlineRegister}
                  setValue={setValue}
                  suggestions={headlineAutocompleteOptions}
                  onInputChange={handleHeadlineAutocompleteQueryChange}
                  placeholder={t('form.placeholders.professionalHeadline')}
                  className="h-7"
                />
              }
              fontSizeDropdown={
                <FontSizeControl fieldKey="headline" compact />
              }
            />

            <TextInput
              label={t('form.labels.targetRole')}
              labelSuffix={renderVisibilityCheckbox('showTargetRole')}
              error={errors.targetRole?.message}
              registerProps={{
                ...targetRoleRegister,
                placeholder: t('form.placeholders.targetRole'),
              }}
              customInput={
                <AutocompleteInput
                  name="targetRole"
                  registerReturn={targetRoleRegister}
                  setValue={setValue}
                  suggestions={targetRoleAutocompleteOptions}
                  onInputChange={handleTargetRoleAutocompleteQueryChange}
                  placeholder={t('form.placeholders.targetRole')}
                  className="h-7"
                />
              }
              fontSizeDropdown={
                <FontSizeControl fieldKey="targetRole" compact />
              }
            />

            <div className="mb-4 rounded border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 p-3">
              <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
                <input type="checkbox" {...register('showProfileImage')} className="h-4 w-4" />
                Add profile image
              </label>

              {formData.showProfileImage ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      type="button"
                      onClick={openProfileImagePicker}
                      className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Upload image
                    </button>
                    <button
                      type="button"
                      onClick={clearProfileImage}
                      disabled={!profileImageValue}
                      className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Remove
                    </button>
                    <input
                      ref={profileImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                    />
                  </div>
                  <input
                    type="text"
                    value={/^https?:\/\//i.test(profileImageValue || '') ? profileImageValue : ''}
                    onChange={(event) =>
                      setValue('profileImage', event.target.value, { shouldDirty: true, shouldTouch: true })
                    }
                    placeholder="Or paste image URL (https://...)"
                    className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 w-full h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
                  />
                  {profileImageValue ? (
                    <img
                      src={profileImageValue}
                      alt="Profile preview"
                      className="mt-2 h-14 w-14 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                    />
                  ) : (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">No image selected</p>
                  )}
                </>
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">Enable this to add a profile image.</p>
              )}
            </div>

            <TwoColumnTextInput
              label1={t('form.labels.email')}
              label2={t('form.labels.phone')}
              error1={errors.email?.message}
              error2={errors.phone?.message}
              registerProps1={register('email', {
                validate: {
                  required: (value) => {
                    return String(value || '').trim() ? true : t('form.errors.emailRequired');
                  },
                  format: (value) => {
                    if (!String(value || '').trim()) return true;
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim()) || t('form.errors.invalidEmail');
                  },
                },
              })}
              registerProps2={register('phone', {
                validate: {
                  required: (value) => {
                    return String(value || '').trim() ? true : t('form.errors.phoneRequired');
                  },
                },
              })}
              fontSizeDropdown1={
                <FontSizeControl fieldKey="email" compact />
              }
              fontSizeDropdown2={
                <FontSizeControl fieldKey="phone" compact />
              }
            />

            <TwoColumnTextInput
              label1={t('form.labels.website')}
              label2={t('form.labels.location')}
              labelSuffix1={renderVisibilityCheckbox('showWebsite')}
              labelSuffix2={renderVisibilityCheckbox('showLocation')}
              error1={errors.website?.message}
              error2={errors.location?.message}
              registerProps1={websiteRegister}
              registerProps2={locationRegister}
              customInput2={
                <AutocompleteInput
                  name="location"
                  registerReturn={locationRegister}
                  setValue={setValue}
                  suggestions={locationAutocompleteOptions}
                  onInputChange={handleLocationAutocompleteQueryChange}
                  placeholder={t('form.labels.location')}
                  className="h-7"
                />
              }
              fontSizeDropdown1={
                <FontSizeControl fieldKey="website" compact />
              }
              fontSizeDropdown2={
                <FontSizeControl fieldKey="location" compact />
              }
            />

            <TwoColumnTextInput
              label1={t('form.labels.linkedin')}
              label2={t('form.labels.github')}
              labelSuffix1={renderVisibilityCheckbox('showLinkedin')}
              labelSuffix2={renderVisibilityCheckbox('showGithub')}
              registerProps1={register('linkedin')}
              registerProps2={register('github')}
              fontSizeDropdown1={
                <FontSizeControl fieldKey="linkedin" compact />
              }
              fontSizeDropdown2={
                <FontSizeControl fieldKey="github" compact />
              }
            />
          </div>

          {/* Professional Summary Section */}
          <div ref={registerSectionRef('summary')} className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2">
              <label htmlFor="toggle-showSummary" className="text-lg font-semibold text-gray-800 dark:text-gray-200 cursor-pointer">
                {t('create.professionalSummary')}
              </label>
              {renderVisibilityCheckbox('showSummary')}
            </div>
            <TextAreaInput
              label={t('create.summary')}
              error={errors.summary?.message}
              registerProps={register('summary')}
              fontSizeDropdown={
                <FontSizeControl fieldKey="summary" compact />
              }
            />
          </div>

          {/* Skills Section */}
          <div ref={registerSectionRef('experience')} className={sectionGroupClass}>
            <FormExperience
              fields={experienceFields}
              register={register}
              setValue={setValue}
              errors={errors}
              remove={removeExperience}
              append={appendExperience}
              companySuggestions={companyAutocompleteOptions}
              onCompanyInputChange={handleCompanyAutocompleteQueryChange}
              roleSuggestions={experienceRoleAutocompleteOptions}
              onRoleInputChange={handleExperienceRoleAutocompleteQueryChange}
              locationSuggestions={locationAutocompleteOptions}
              onLocationInputChange={handleLocationAutocompleteQueryChange}
              sectionToggle={renderVisibilityCheckbox('showExperience')}
              sectionToggleId="toggle-showExperience"
              fontSizeControls={{
                company: <FontSizeControl fieldKey="experienceCompany" compact />,
                role: <FontSizeControl fieldKey="experienceRole" compact />,
                description: <FontSizeControl fieldKey="experienceDescription" compact />,
              }}
            />
          </div>

          <div ref={registerSectionRef('projects')} className={sectionGroupClass}>
            <FormProjects
              fields={projectFields}
              register={register}
              setValue={setValue}
              remove={removeProject}
              append={appendProject}
              roleSuggestions={projectRoleAutocompleteOptions}
              onRoleInputChange={handleProjectRoleAutocompleteQueryChange}
              techStackSuggestions={techStackAutocompleteOptions}
              onTechStackInputChange={handleTechStackAutocompleteQueryChange}
              sectionToggle={renderVisibilityCheckbox('showProjects')}
              sectionToggleId="toggle-showProjects"
              fontSizeControls={{
                name: <FontSizeControl fieldKey="projectName" compact />,
                role: <FontSizeControl fieldKey="projectMeta" compact />,
                dates: <FontSizeControl fieldKey="projectDates" compact />,
                link: <FontSizeControl fieldKey="projectLink" compact />,
                description: <FontSizeControl fieldKey="projectDescription" compact />,
              }}
            />
          </div>

          <div ref={registerSectionRef('skills')} className={sectionGroupClass}>
            <FormSkills
              fields={skillFields}
              register={register}
              setValue={setValue}
              errors={errors}
              remove={removeSkill}
              append={appendSkill}
              skillSuggestions={skillAutocompleteOptions}
              onSkillInputChange={handleSkillAutocompleteQueryChange}
              sectionToggle={renderVisibilityCheckbox('showSkills')}
              sectionToggleId="toggle-showSkills"
              fontSizeControls={{
                name: <FontSizeControl fieldKey="skillName" compact />,
                description: <FontSizeControl fieldKey="skillDescription" compact />,
              }}
            />
          </div>

          {/* Education Section */}
          <div ref={registerSectionRef('education')} className={sectionGroupClass}>
            <FormEducation
              fields={educationFields}
              register={register}
              setValue={setValue}
              errors={errors}
              remove={removeEducation}
              append={appendEducation}
              sectionToggle={renderVisibilityCheckbox('showEducation')}
              sectionToggleId="toggle-showEducation"
              schoolSuggestions={schoolAutocompleteOptions}
              onSchoolInputChange={handleSchoolAutocompleteQueryChange}
              locationSuggestions={locationAutocompleteOptions}
              onLocationInputChange={handleLocationAutocompleteQueryChange}
              fontSizeControls={{
                school: <FontSizeControl fieldKey="educationSchool" compact />,
                degree: <FontSizeControl fieldKey="educationDegree" compact />,
                year: <FontSizeControl fieldKey="educationYear" compact />,
              }}
            />
          </div>

          <div ref={registerSectionRef('languages')} className={sectionGroupClass}>
            <FormLanguages
              fields={languageFields}
              register={register}
              setValue={setValue}
              remove={removeLanguage}
              append={appendLanguage}
              languageSuggestions={languageAutocompleteOptions}
              onLanguageInputChange={handleLanguageAutocompleteQueryChange}
              sectionToggle={renderVisibilityCheckbox('showLanguages')}
              sectionToggleId="toggle-showLanguages"
              fontSizeControls={{
                name: <FontSizeControl fieldKey="languageName" compact />,
                level: <FontSizeControl fieldKey="languageLevel" compact />,
              }}
            />
          </div>

          <div ref={registerSectionRef('certifications')} className={sectionGroupClass}>
            <FormCertifications
              fields={certificationFields}
              register={register}
              setValue={setValue}
              remove={removeCertification}
              append={appendCertification}
              issuerSuggestions={issuerAutocompleteOptions}
              onIssuerInputChange={handleIssuerAutocompleteQueryChange}
              sectionToggle={renderVisibilityCheckbox('showCertifications')}
              sectionToggleId="toggle-showCertifications"
              fontSizeControls={{
                name: <FontSizeControl fieldKey="certificationName" compact />,
                issuer: <FontSizeControl fieldKey="certificationIssuer" compact />,
                year: <FontSizeControl fieldKey="certificationYear" compact />,
              }}
            />
          </div>

          <div ref={registerSectionRef('references')} className={sectionGroupClass}>
            <FormReferences
              fields={referenceFields}
              register={register}
              remove={removeReference}
              append={appendReference}
              sectionToggle={renderVisibilityCheckbox('showReferences')}
              sectionToggleId="toggle-showReferences"
              fontSizeControls={{
                references: <FontSizeControl fieldKey="references" compact />,
              }}
            />
          </div>

          <div ref={registerSectionRef('customSections')} className={sectionGroupClass}>
            <FormCustomSections
              fields={customSectionFields}
              register={register}
              remove={removeCustomSection}
              append={appendCustomSection}
              sectionToggle={renderVisibilityCheckbox('showCustomSections')}
              sectionToggleId="toggle-showCustomSections"
              fontSizeControls={{
                title: <FontSizeControl fieldKey="customTitle" compact />,
                content: <FontSizeControl fieldKey="customContent" compact />,
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={clsx(
              'w-full',
              'bg-blue-600 hover:bg-blue-700',
              'text-white font-semibold',
              'py-2 px-4 rounded',
              'transition-colors',
              'mb-4'
            )}
          >
            💾 {t('create.saveDraft')}
          </button>

          <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
            {lastSavedAt
              ? `${t('create.lastSaved')}: ${new Date(lastSavedAt).toLocaleString()}`
              : t('create.draftNotSavedYet')}
          </p>
        </div>

        {/* ===== MIDDLE PANEL: LIVE PREVIEW ===== */}
        <div
          className={clsx(
            'w-[45%] h-full min-h-0',
            'flex flex-col',
            'px-4 py-6',
            'bg-gray-400 dark:bg-gray-950',
            'text-black dark:text-white',
            'overflow-hidden'
          )}
        >
          {/* Preview Controls */}
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <span className="text-sm font-medium">{t('create.zoom')}:</span>
            <button
              type="button"
              onClick={() => setPreviewScale(Math.max(0.3, previewScale - 0.1))}
              className={clsx(
                'px-3 py-1 rounded',
                'bg-gray-300 dark:bg-gray-700',
                'hover:bg-gray-400 dark:hover:bg-gray-600',
                'text-sm font-medium'
              )}
            >
              −
            </button>
            <span className="text-sm font-mono min-w-[3rem] text-center">
              {Math.round(previewScale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setPreviewScale(Math.min(1.5, previewScale + 0.1))}
              className={clsx(
                'px-3 py-1 rounded',
                'bg-gray-300 dark:bg-gray-700',
                'hover:bg-gray-400 dark:hover:bg-gray-600',
                'text-sm font-medium'
              )}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setPreviewScale(0.7)}
              className={clsx(
                'px-3 py-1 rounded text-xs',
                'bg-gray-300 dark:bg-gray-700',
                'hover:bg-gray-400 dark:hover:bg-gray-600'
              )}
            >
              {t('create.reset')}
            </button>
          </div>
          <div
            ref={previewScrollRef}
            className={clsx(
              'w-full flex-1 min-h-0 overflow-auto',
              'bg-gray-500 dark:bg-black',
              isDraggingPreview ? 'cursor-grabbing select-none' : 'cursor-grab'
            )}
            onMouseDown={handlePreviewMouseDown}
            onMouseMove={handlePreviewMouseMove}
            onMouseLeave={stopPreviewDragging}
          >
            <div className="min-h-full p-4">
              <div className="relative mx-auto" style={{ width: `${previewCanvasWidth}px` }}>
                {/* Hidden full template used for PDF export + height/page calculation */}
                <div className="absolute -left-[99999px] top-0 opacity-0 pointer-events-none">
                  <div ref={componentRef}>{renderTemplate()}</div>
                </div>

                {/* Visual paged preview (PDF-like) */}
                <div className="space-y-4">
                  {[...Array(pageCount)].map((_, i) => (
                    <div
                      key={i}
                      className="relative mx-auto overflow-hidden bg-white shadow-2xl border border-gray-400"
                      style={{
                        width: `${A4_PAGE_WIDTH_PX * previewScale}px`,
                        height: `${A4_PAGE_HEIGHT_PX * previewScale}px`,
                      }}
                    >
                      <div
                        className="absolute left-0 right-0 overflow-hidden"
                        style={{
                          top: 0,
                          height: `${A4_PAGE_HEIGHT_PX * previewScale}px`,
                        }}
                      >
                        <div
                          className="absolute top-0 left-0 origin-top-left"
                          style={{ transform: `scale(${previewScale})` }}
                        >
                          <div style={{ transform: `translateY(-${i * A4_PAGE_HEIGHT_PX}px)` }}>
                            {renderTemplate()}
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-600 font-medium bg-white px-2 py-1 rounded border border-gray-200">
                        Page {i + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RIGHT PANEL: TEMPLATE & DOWNLOAD ===== */}
        <div
          className={clsx(
            'w-[20%] h-full min-h-0',
            'bg-gray-200 dark:bg-gray-800',
            'p-6 overflow-y-auto',
            'border-l border-gray-300 dark:border-gray-700'
          )}
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            {t('create.templates')}
          </h3>

          {/* Template Buttons Grid */}
          <div className="grid gap-3 mt-4">
            {Object.entries(templates).map(([key, name]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedTemplate(key)}
                className={clsx(
                  'rounded-lg overflow-hidden',
                  'transition-colors',
                  'border',
                  'text-left',
                  selectedTemplate === key
                    ? 'border-blue-600 ring-2 ring-blue-500/40 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800'
                )}
              >
                <img
                  src={TEMPLATE_PREVIEWS[key]}
                  alt={`${name} preview`}
                  className="w-full h-24 object-cover bg-white"
                />
                <div
                  className={clsx(
                    'px-2 py-2 text-xs font-semibold',
                    selectedTemplate === key
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-gray-900 dark:text-gray-100'
                  )}
                >
                  {name}
                </div>
              </button>
            ))}
          </div>

          {/* Download PDF Button */}
          <button
            type="button"
            onClick={handleDownloadPDF}
            className={clsx(
              'w-full mt-6',
              'bg-green-600 hover:bg-green-700',
              'text-white font-semibold',
              'py-3 px-4 rounded',
              'transition-colors',
              'flex items-center justify-center gap-2'
            )}
          >
            📥 {t('create.downloadPdf')}
          </button>
        </div>
    </form>
  );
}