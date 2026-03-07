// FirstTemplate.js
import React, { forwardRef } from 'react';
import { Phone, Mail, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createTemplateTypography, safeText } from '../../utils/templateTypography';

const toExternalUrl = (value) => {
  if (!value) return undefined;
  const trimmed = String(value).trim();
  if (!trimmed) return undefined;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const hasText = (value) => String(value ?? '').trim().length > 0;
const shouldShow = (enabled) => enabled !== false;

const FirstTemplate = forwardRef(({ data, fontSizes }, ref) => {
  const { t } = useTranslation();
  const { fontStyle, iconSize } = createTemplateTypography(fontSizes);
  const showContactIcons = data?.showContactIcons !== false;
  const primaryColor = data?.primaryColor || '#1e3a8a';
  const secondaryColor = data?.secondaryColor || '#2563eb';
  const tertiaryColor = data?.tertiaryColor || '#0ea5e9';
  const linkColor = data?.linkColor || tertiaryColor;
  const dividerColor = data?.dividerColor || `${secondaryColor}66`;
  const surfaceColor = data?.surfaceColor || '#ffffff';
  const sidebarTextColor = data?.sidebarTextColor || data?.headerTextColor || '#ffffff';
  const skillTrackColor = data?.skillTrackColor || '#e5e7eb';
  const textColor = data?.textColor || '#111827';
  const titleColor = data?.titleColor || '#0f172a';
  const subtitleColor = data?.subtitleColor || '#475569';
  const sectionTitleColor = data?.sectionTitleColor || '#334155';
  const mutedTextColor = data?.mutedTextColor || '#6b7280';

  return (
    <div
      ref={ref}
      className="flex w-[794px] min-h-[1123px] text-gray-900 break-words mx-auto page-break-inside-avoid"
      style={{ color: textColor, backgroundColor: surfaceColor }}
    >
      <div className="w-1/3 p-6 space-y-6" style={{ backgroundColor: primaryColor, color: sidebarTextColor }}>
        {data.showProfileImage ? (
          <div className="h-32 w-32 bg-gray-300 rounded-full mx-auto flex items-center justify-center text-sm text-gray-800 bg-opacity-80 overflow-hidden">
            {data.profileImage ? (
              <img
                src={data.profileImage}
                alt={t('template.photo')}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{t('template.photo')}</span>
            )}
          </div>
        ) : null}

        <div>
          <h3 className="font-bold border-b text-lg" style={{ borderColor: dividerColor }}>{t('template.contact')}</h3>
          <ul className="text-sm mt-2 space-y-1">
            {shouldShow(data.showPhone) ? (
              <li className="flex items-start gap-2 min-w-0">
                {showContactIcons ? <Phone size={iconSize('phone', 14)} className="shrink-0 mt-0.5" /> : null}
                <span className="min-w-0 break-words" style={fontStyle('phone', 14)}>{safeText(data.phone, t('template.phonePlaceholder'))}</span>
              </li>
            ) : null}
            {shouldShow(data.showEmail) ? (
              <li className="flex items-start gap-2 min-w-0">
                {showContactIcons ? <Mail size={iconSize('email', 14)} className="shrink-0 mt-0.5" /> : null}
                <a href={hasText(data.email) ? `mailto:${data.email}` : undefined} className="min-w-0 break-all hover:underline" style={fontStyle('email', 14)}>
                  {safeText(data.email, t('template.emailPlaceholder'))}
                </a>
              </li>
            ) : null}
            {shouldShow(data.showLocation) ? (
              <li className="flex items-start gap-2 min-w-0">
                {showContactIcons ? <MapPin size={iconSize('location', 14)} className="shrink-0 mt-0.5" /> : null}
                <span className="min-w-0 break-words" style={fontStyle('location', 14)}>{safeText(data.location, t('template.locationPlaceholder'))}</span>
              </li>
            ) : null}
            {shouldShow(data.showWebsite) ? (
              <li className="flex items-start gap-2 min-w-0">
                {showContactIcons ? <Globe size={iconSize('website', 14)} className="shrink-0 mt-0.5" /> : null}
                <a href={toExternalUrl(data.website)} target="_blank" rel="noopener noreferrer" className="min-w-0 break-all hover:underline" style={fontStyle('website', 14)}>
                  {safeText(data.website, t('template.websitePlaceholder'))}
                </a>
              </li>
            ) : null}
            {shouldShow(data.showLinkedin) ? (
              <li className="flex items-start gap-2 min-w-0">
                {showContactIcons ? <Linkedin size={iconSize('linkedin', 14)} className="shrink-0 mt-0.5" /> : null}
                <a href={toExternalUrl(data.linkedin)} target="_blank" rel="noopener noreferrer" className="min-w-0 break-all hover:underline" style={fontStyle('linkedin', 14)}>
                  {safeText(data.linkedin, t('template.linkedinPlaceholder'))}
                </a>
              </li>
            ) : null}
            {shouldShow(data.showGithub) ? (
              <li className="flex items-start gap-2 min-w-0">
                {showContactIcons ? <Github size={iconSize('github', 14)} className="shrink-0 mt-0.5" /> : null}
                <a href={toExternalUrl(data.github)} target="_blank" rel="noopener noreferrer" className="min-w-0 break-all hover:underline" style={fontStyle('github', 14)}>
                  {safeText(data.github, t('template.githubPlaceholder'))}
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        {data.showSkills !== false ? (
        <div className="mt-4">
          <h2 className="text-base font-bold border-b mb-2 pb-1" style={{ color: sectionTitleColor, borderColor: dividerColor }}>{t('template.skills')}</h2>
          {data.skills?.length > 0 ? (
            data.skills.map((skill, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm font-semibold">
                  <span style={fontStyle('skillName', 14)}>{skill.name || t('template.skillNamePlaceholder')}</span>
                  <span className="font-normal text-gray-400" style={fontStyle('skillDescription', 12)}>
                    {' '}{skill.description || t('template.skillDescriptionPlaceholder')}
                  </span>
                </p>
                <p style={{ ...fontStyle('skillDescription', 12), color: mutedTextColor }}>
                  {skill.category || t('template.categoryPlaceholder')}
                </p>
                <div className="w-full rounded h-2 mt-1" style={{ backgroundColor: skillTrackColor }}>
                  <div className="h-2 rounded" style={{ width: `${skill.level || 0}%`, backgroundColor: secondaryColor }} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-300">{t('template.skillsPlaceholder')}</p>
          )}
        </div>
        ) : null}

        {data.showEducation !== false ? (
        <div className="mt-4">
          <h2 className="text-base font-bold border-b mb-2 pb-1" style={{ color: sectionTitleColor, borderColor: dividerColor }}>{t('template.education')}</h2>
          {data.education?.length > 0 ? (
            data.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold" style={fontStyle('educationSchool', 14)}>{edu.school || t('template.educationSchoolPlaceholder')}</p>
                <p style={{ ...fontStyle('educationDegree', 12), color: mutedTextColor }}>{edu.degree || t('template.educationDegreePlaceholder')}</p>
                <p style={{ ...fontStyle('educationYear', 12), color: mutedTextColor }}>{edu.year || t('template.educationYearPlaceholder')}</p>
                <p style={{ ...fontStyle('educationYear', 12), color: mutedTextColor }}>
                  {[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}
                  {edu.location ? ` • ${edu.location}` : ''}
                  {edu.gpa ? ` • GPA ${edu.gpa}` : ''}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-300">{t('template.educationPlaceholder')}</p>
          )}
        </div>
        ) : null}

        {data.showLanguages !== false ? (
        <div className="mt-4">
          <h2 className="text-base font-bold border-b mb-2 pb-1" style={{ color: sectionTitleColor, borderColor: dividerColor }}>{t('template.languages')}</h2>
          {data.languages?.length > 0 ? (
            data.languages.map((lang, index) => (
              <p key={index}>
                <span className="font-semibold" style={fontStyle('languageName', 14)}>
                  {lang.name || t('template.languageNamePlaceholder')}
                </span>
                <span style={{ ...fontStyle('languageLevel', 12), color: mutedTextColor }}>
                  {' - '}{lang.level || t('template.languageLevelPlaceholder')}
                  {lang.cefr ? ` (${lang.cefr})` : ''}
                </span>
              </p>
            ))
          ) : (
            <p className="text-sm text-gray-300">{t('template.languagesPlaceholder')}</p>
          )}
        </div>
        ) : null}

        {data.showCertifications !== false ? (
        <div className="mt-4">
          <h2 className="text-base font-bold border-b mb-2 pb-1" style={{ color: sectionTitleColor, borderColor: dividerColor }}>{t('template.certifications')}</h2>
          {data.certifications?.length > 0 ? (
            data.certifications.map((cert, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold" style={fontStyle('certificationName', 14)}>{cert.name || t('template.certificationNamePlaceholder')}</p>
                <p style={{ color: mutedTextColor }}>
                  <span style={fontStyle('certificationIssuer', 12)}>{cert.issuer || t('template.certificationIssuerPlaceholder')}</span>
                  {' • '}
                  <span style={fontStyle('certificationYear', 12)}>{cert.year || t('template.certificationYearPlaceholder')}</span>
                </p>
                {(cert.url || cert.expirationDate) && (
                  <p style={{ ...fontStyle('certificationYear', 12), color: mutedTextColor }}>
                    {cert.url || t('template.certificateUrlPlaceholder')}
                    {cert.expirationDate ? ` • ${t('template.expiresOn')} ${cert.expirationDate}` : ''}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-300">{t('template.certificationsPlaceholder')}</p>
          )}
        </div>
        ) : null}
      </div>

      <div className="w-2/3 p-6 space-y-6">
        <div>
          <h1 className="font-bold" style={{ ...fontStyle('name', 24), color: titleColor }}>{data.name || t('template.fullName')}</h1>
          {data.showHeadline !== false ? (
            <p className="italic" style={{ ...fontStyle('headline', 14), color: subtitleColor }}>{data.headline || t('template.headline')}</p>
          ) : null}
          {shouldShow(data.showTargetRole) ? (
            <p style={{ ...fontStyle('targetRole', 14), color: subtitleColor }}>{safeText(data.targetRole, t('template.targetRolePlaceholder'))}</p>
          ) : null}
        </div>

        {data.showSummary !== false ? (
        <div>
          <h2 className="text-xl font-bold border-b mb-2 pb-1" style={{ color: sectionTitleColor, borderColor: dividerColor }}>{t('template.summary')}</h2>
          <p className="whitespace-pre-line" style={fontStyle('summary', 14)}>{data.summary || t('template.summaryPlaceholder')}</p>
        </div>
        ) : null}

        {data.showExperience !== false ? (
        <div>
          <h2 className="text-xl font-bold border-b mb-2 pb-1" style={{ color: sectionTitleColor, borderColor: dividerColor }}>{t('template.experience')}</h2>
          {data.experience?.length > 0 ? (
            data.experience.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-semibold" style={fontStyle('experienceRole', 14)}>{exp.role || t('template.role')}</p>
                    <p style={{ ...fontStyle('experienceCompany', 14), color: mutedTextColor }}>{exp.company || t('template.company')}</p>
                  </div>
                  <p className="text-xs text-right" style={{ color: mutedTextColor }}>
                    {[exp.startDate, exp.endDate].filter(Boolean).join(' - ')}
                    {exp.location ? ` • ${exp.location}` : ''}
                  </p>
                </div>
                {exp.description ? (
                  <p className="whitespace-pre-line mt-1" style={fontStyle('experienceDescription', 14)}>{exp.description}</p>
                ) : null}
                {exp.bulletPoints ? (
                  <ul className="mt-1 list-disc pl-5" style={{ ...fontStyle('experienceDescription', 14), color: mutedTextColor }}>
                    {String(exp.bulletPoints)
                      .split('\n')
                      .map((point) => point.trim())
                      .filter(Boolean)
                      .map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                  </ul>
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-sm">{t('template.experiencePlaceholder')}</p>
          )}
        </div>
        ) : null}

        {data.showProjects !== false ? (
        <div>
          <h2 className="text-xl font-bold border-b mb-2 pb-1" style={{ color: sectionTitleColor, borderColor: dividerColor }}>{t('template.projects')}</h2>
          {data.projects?.length > 0 ? (
            data.projects.map((project, index) => (
              <div key={index} className="mb-3">
                <p className="font-semibold" style={fontStyle('projectName', 14)}>{project.name || t('template.projectName')}</p>
                <p style={{ ...fontStyle('projectDescription', 12), color: mutedTextColor }}>
                  {project.role || t('template.role')}
                  {project.techStack ? ` • ${project.techStack}` : ''}
                </p>
                <p style={{ ...fontStyle('projectLink', 12), color: mutedTextColor }}>
                  {[project.startDate, project.endDate].filter(Boolean).join(' - ')}
                </p>
                {project.link ? (
                  <a
                    href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ ...fontStyle('projectLink', 12), color: linkColor }}
                  >
                    {project.link}
                  </a>
                ) : null}
                {project.description ? (
                  <p className="whitespace-pre-line mt-1" style={fontStyle('projectDescription', 14)}>{project.description}</p>
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-sm">{t('template.projectsPlaceholder')}</p>
          )}
        </div>
        ) : null}

        {data.showReferences !== false ? (
        <div>
          <h2 className="text-xl font-bold border-b mb-2 pb-1" style={{ color: sectionTitleColor, borderColor: dividerColor }}>{t('template.references')}</h2>
          {data.referenceEntries?.length > 0 ? (
            <div className="space-y-2">
              {data.referenceEntries.map((refItem, idx) => (
                <div key={idx}>
                  <p className="font-semibold" style={fontStyle('references', 14)}>{refItem.name || t('template.referenceNamePlaceholder')}</p>
                  <p style={{ ...fontStyle('references', 12), color: mutedTextColor }}>{[refItem.title, refItem.company].filter(Boolean).join(' • ')}</p>
                  <p style={{ ...fontStyle('references', 12), color: mutedTextColor }}>{refItem.contact || t('template.contactInfoPlaceholder')}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="whitespace-pre-line" style={fontStyle('references', 14)}>{data.referencesNote || t('template.referencesPlaceholder')}</p>
          )}
        </div>
        ) : null}

        {data.showCustomSections !== false && data.customSections?.length > 0 &&
          data.customSections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-xl font-bold border-b mb-2 pb-1" style={{ color: sectionTitleColor, borderColor: dividerColor }}>
                {section.title || t('template.customSectionPlaceholder')}
              </h2>
              <p className="whitespace-pre-line" style={fontStyle('summary', 14)}>{section.content || t('template.customContentPlaceholder')}</p>
            </div>
          ))}
      </div>
    </div>
  );
});

export default FirstTemplate;
