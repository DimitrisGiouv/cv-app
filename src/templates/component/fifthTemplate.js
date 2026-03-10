import React, { forwardRef } from 'react';
import { Mail, Phone, Globe, MapPin, Linkedin, Github } from 'lucide-react';
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
const toSkillLevelLabel = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return null;
  const clamped = Math.max(0, Math.min(100, Math.round(numeric)));
  if (clamped >= 90) return 'Expert';
  if (clamped >= 75) return 'Advanced';
  if (clamped >= 50) return 'Intermediate';
  return 'Beginner';
};

const FifthTemplate = forwardRef(({ data, fontSizes }, ref) => {
  const { t } = useTranslation();
  const { fontStyle, iconSize } = createTemplateTypography(fontSizes);
  const showContactIcons = data?.showContactIcons !== false;

  const primaryColor = data?.primaryColor || '#0f172a';
  const secondaryColor = data?.secondaryColor || '#334155';
  const tertiaryColor = data?.tertiaryColor || '#0ea5e9';
  const linkColor = data?.linkColor || tertiaryColor;
  const dividerColor = data?.dividerColor || '#cbd5e1';
  const surfaceColor = data?.surfaceColor || '#ffffff';
  const textColor = data?.textColor || '#0f172a';
  const titleColor = data?.titleColor || '#0f172a';
  const subtitleColor = data?.subtitleColor || '#334155';
  const sectionTitleColor = data?.sectionTitleColor || '#0f172a';
  const mutedTextColor = data?.mutedTextColor || '#64748b';

  return (
    <div
      ref={ref}
      className="w-[794px] min-h-[1123px] box-border mx-auto border break-words page-break-inside-avoid"
      style={{ color: textColor, backgroundColor: surfaceColor, borderColor: dividerColor }}
    >
      <div
        className="px-10 pt-10 pb-6 border-b-4"
        style={{ borderColor: primaryColor }}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <h1 className="font-bold tracking-tight" style={{ ...fontStyle('name', 24), color: titleColor }}>
              {data.name || t('template.fullName')}
            </h1>
            {data.showHeadline !== false ? (
              <p className="mt-1" style={{ ...fontStyle('headline', 14), color: subtitleColor }}>
                {data.headline || t('template.headline')}
              </p>
            ) : null}
            {shouldShow(data.showTargetRole) ? (
              <p className="mt-1" style={{ ...fontStyle('targetRole', 14), color: subtitleColor }}>
                {t('template.targetRoleLabel')}: {safeText(data.targetRole, t('template.targetRolePlaceholder'))}
              </p>
            ) : null}
          </div>

          {data.showProfileImage ? (
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-300 flex items-center justify-center text-xs text-slate-500">
              {data.profileImage ? (
                <img src={data.profileImage} alt={t('template.photo')} className="h-full w-full object-cover" />
              ) : (
                <span>{t('template.photo')}</span>
              )}
            </div>
          ) : null}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1" style={{ color: mutedTextColor }}>
          {shouldShow(data.showEmail) ? (
            <div className="flex items-start gap-2 min-w-0" style={fontStyle('email', 14)}>
              {showContactIcons ? <Mail size={iconSize('email', 14)} className="shrink-0 mt-0.5" /> : null}
              <a href={hasText(data.email) ? `mailto:${data.email}` : undefined} className="break-all hover:underline">
                {safeText(data.email, t('template.emailPlaceholder'))}
              </a>
            </div>
          ) : null}
          {shouldShow(data.showPhone) ? (
            <div className="flex items-start gap-2 min-w-0" style={fontStyle('phone', 14)}>
              {showContactIcons ? <Phone size={iconSize('phone', 14)} className="shrink-0 mt-0.5" /> : null}
              <span className="break-words">{safeText(data.phone, t('template.phonePlaceholder'))}</span>
            </div>
          ) : null}
          {shouldShow(data.showWebsite) ? (
            <div className="flex items-start gap-2 min-w-0" style={fontStyle('website', 14)}>
              {showContactIcons ? <Globe size={iconSize('website', 14)} className="shrink-0 mt-0.5" /> : null}
              <a href={toExternalUrl(data.website)} target="_blank" rel="noopener noreferrer" className="break-all hover:underline">
                {safeText(data.website, t('template.websitePlaceholder'))}
              </a>
            </div>
          ) : null}
          {shouldShow(data.showLocation) ? (
            <div className="flex items-start gap-2 min-w-0" style={fontStyle('location', 14)}>
              {showContactIcons ? <MapPin size={iconSize('location', 14)} className="shrink-0 mt-0.5" /> : null}
              <span className="break-words">{safeText(data.location, t('template.locationPlaceholder'))}</span>
            </div>
          ) : null}
          {shouldShow(data.showLinkedin) ? (
            <div className="flex items-start gap-2 min-w-0" style={fontStyle('linkedin', 14)}>
              {showContactIcons ? <Linkedin size={iconSize('linkedin', 14)} className="shrink-0 mt-0.5" /> : null}
              <a href={toExternalUrl(data.linkedin)} target="_blank" rel="noopener noreferrer" className="break-all hover:underline">
                {safeText(data.linkedin, t('template.linkedinPlaceholder'))}
              </a>
            </div>
          ) : null}
          {shouldShow(data.showGithub) ? (
            <div className="flex items-start gap-2 min-w-0" style={fontStyle('github', 14)}>
              {showContactIcons ? <Github size={iconSize('github', 14)} className="shrink-0 mt-0.5" /> : null}
              <a href={toExternalUrl(data.github)} target="_blank" rel="noopener noreferrer" className="break-all hover:underline">
                {safeText(data.github, t('template.githubPlaceholder'))}
              </a>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-[1.2fr_0.8fr] gap-8 px-10 py-8">
        <div>
          {data.showSummary !== false ? (
            <section className="mb-7">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] border-b pb-2" style={{ color: sectionTitleColor, borderColor: dividerColor }}>
                {t('template.summary')}
              </h2>
              <p className="mt-3 whitespace-pre-line" style={fontStyle('summary', 14)}>
                {data.summary || t('template.summaryPlaceholder')}
              </p>
            </section>
          ) : null}

          {data.showExperience !== false ? (
            <section className="mb-7">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] border-b pb-2" style={{ color: sectionTitleColor, borderColor: dividerColor }}>
                {t('template.experience')}
              </h2>
              <div className="mt-3 space-y-4">
                {data.experience?.length > 0 ? data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold" style={fontStyle('experienceRole', 14)}>{exp.role || t('template.role')}</p>
                        <p style={{ ...fontStyle('experienceCompany', 14), color: mutedTextColor }}>{exp.company || t('template.company')}</p>
                      </div>
                      <p className="text-xs text-right" style={{ color: mutedTextColor }}>
                        {[exp.startDate, exp.endDate].filter(Boolean).join(' - ')}
                        {exp.location ? ` | ${exp.location}` : ''}
                      </p>
                    </div>
                    <p className="mt-1 whitespace-pre-line" style={{ ...fontStyle('experienceDescription', 14), color: mutedTextColor }}>
                      {exp.description || t('template.experiencePlaceholder')}
                    </p>
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
                )) : <p className="text-sm" style={{ color: mutedTextColor }}>{t('template.experiencePlaceholder')}</p>}
              </div>
            </section>
          ) : null}

          {data.showProjects !== false ? (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] border-b pb-2" style={{ color: sectionTitleColor, borderColor: dividerColor }}>
                {t('template.projects')}
              </h2>
              <div className="mt-3 space-y-4">
                {data.projects?.length > 0 ? data.projects.map((project, index) => (
                  <div key={index}>
                    <p className="font-semibold" style={fontStyle('projectName', 14)}>{project.name || t('template.projectName')}</p>
                    {[project.role, project.techStack].some(Boolean) ? (
                      <p style={{ ...fontStyle('projectMeta', 12), color: mutedTextColor }}>
                        {[project.role, project.techStack].filter(Boolean).join(' • ')}
                      </p>
                    ) : null}
                    <p style={{ ...fontStyle('projectDates', 12), color: mutedTextColor }}>
                      {[project.startDate, project.endDate].filter(Boolean).join(' - ')}
                    </p>
                    {project.link ? (
                      <a href={toExternalUrl(project.link)} target="_blank" rel="noopener noreferrer" className="break-all hover:underline" style={{ ...fontStyle('projectLink', 12), color: linkColor }}>
                        {project.link}
                      </a>
                    ) : null}
                    {project.description ? (
                      <p className="mt-1 whitespace-pre-line" style={fontStyle('projectDescription', 14)}>{project.description}</p>
                    ) : null}
                  </div>
                )) : <p className="text-sm" style={{ color: mutedTextColor }}>{t('template.projectsPlaceholder')}</p>}
              </div>
            </section>
          ) : null}
        </div>

        <div>
          {data.showSkills !== false ? (
            <section className="mb-7">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] border-b pb-2" style={{ color: sectionTitleColor, borderColor: dividerColor }}>
                {t('template.skills')}
              </h2>
              <div className="mt-3 space-y-3">
                {data.skills?.length > 0 ? data.skills.map((skill, index) => (
                  <div key={index}>
                    <p className="font-semibold" style={fontStyle('skillName', 14)}>
                      {skill.name || t('template.skillNamePlaceholder')}
                      {skill.description ? (
                        <span className="font-normal" style={{ ...fontStyle('skillDescription', 12), color: mutedTextColor }}>
                          {' • '}{skill.description}
                        </span>
                      ) : null}
                    </p>
                    {skill.category || toSkillLevelLabel(skill.level) ? (
                      <p style={{ ...fontStyle('skillDescription', 12), color: mutedTextColor }}>
                        {skill.category || ''}
                        {skill.category && toSkillLevelLabel(skill.level) ? ' • ' : ''}
                        {toSkillLevelLabel(skill.level) || ''}
                      </p>
                    ) : null}
                  </div>
                )) : <p className="text-sm" style={{ color: mutedTextColor }}>{t('template.skillsPlaceholder')}</p>}
              </div>
            </section>
          ) : null}

          {data.showEducation !== false ? (
            <section className="mb-7">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] border-b pb-2" style={{ color: sectionTitleColor, borderColor: dividerColor }}>
                {t('template.education')}
              </h2>
              <div className="mt-3 space-y-2">
                {data.education?.length > 0 ? data.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-semibold" style={fontStyle('educationSchool', 14)}>{edu.school || t('template.educationSchoolPlaceholder')}</p>
                    <p style={{ ...fontStyle('educationDegree', 12), color: mutedTextColor }}>{edu.degree || t('template.educationDegreePlaceholder')}</p>
                    <p style={{ ...fontStyle('educationYear', 12), color: mutedTextColor }}>{edu.year || t('template.educationYearPlaceholder')}</p>
                    <p style={{ ...fontStyle('educationYear', 12), color: mutedTextColor }}>
                      {[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}
                      {edu.location ? ` • ${edu.location}` : ''}
                      {edu.gpa ? ` • GPA ${edu.gpa}` : ''}
                    </p>
                  </div>
                )) : <p className="text-sm" style={{ color: mutedTextColor }}>{t('template.educationPlaceholder')}</p>}
              </div>
            </section>
          ) : null}

          {data.showLanguages !== false ? (
            <section className="mb-7">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] border-b pb-2" style={{ color: sectionTitleColor, borderColor: dividerColor }}>
                {t('template.languages')}
              </h2>
              <div className="mt-3 space-y-1">
                {data.languages?.length > 0 ? data.languages.map((lang, index) => (
                  <p key={index}>
                    <span className="font-semibold" style={fontStyle('languageName', 14)}>{lang.name || t('template.languageNamePlaceholder')}</span>
                    <span style={{ ...fontStyle('languageLevel', 12), color: mutedTextColor }}>
                      {' - '}{lang.level || t('template.languageLevelPlaceholder')}
                      {lang.cefr ? ` (${lang.cefr})` : ''}
                    </span>
                  </p>
                )) : <p className="text-sm" style={{ color: mutedTextColor }}>{t('template.languagesPlaceholder')}</p>}
              </div>
            </section>
          ) : null}

          {data.showCertifications !== false ? (
            <section className="mb-7">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] border-b pb-2" style={{ color: sectionTitleColor, borderColor: dividerColor }}>
                {t('template.certifications')}
              </h2>
              <div className="mt-3 space-y-2">
                {data.certifications?.length > 0 ? data.certifications.map((cert, index) => (
                  <div key={index}>
                    <p className="font-semibold" style={fontStyle('certificationName', 14)}>{cert.name || t('template.certificationNamePlaceholder')}</p>
                    <p style={{ color: mutedTextColor }}>
                      <span style={fontStyle('certificationIssuer', 12)}>{cert.issuer || t('template.certificationIssuerPlaceholder')}</span>
                      {' | '}
                      <span style={fontStyle('certificationYear', 12)}>{cert.year || t('template.certificationYearPlaceholder')}</span>
                    </p>
                    {(cert.url || cert.expirationDate) ? (
                      <p style={{ ...fontStyle('certificationYear', 12), color: mutedTextColor }}>
                        {cert.url || t('template.certificateUrlPlaceholder')}
                        {cert.expirationDate ? ` • ${t('template.expiresOn')} ${cert.expirationDate}` : ''}
                      </p>
                    ) : null}
                  </div>
                )) : <p className="text-sm" style={{ color: mutedTextColor }}>{t('template.certificationsPlaceholder')}</p>}
              </div>
            </section>
          ) : null}

          {data.showReferences !== false ? (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] border-b pb-2" style={{ color: sectionTitleColor, borderColor: dividerColor }}>
                {t('template.references')}
              </h2>
              {data.referenceEntries?.length > 0 ? (
                <div className="mt-3 space-y-2">
                  {data.referenceEntries.map((refItem, idx) => (
                    <div key={idx}>
                      <p className="font-semibold" style={fontStyle('references', 14)}>{refItem.name || t('template.referenceNamePlaceholder')}</p>
                      <p style={{ ...fontStyle('references', 12), color: mutedTextColor }}>{[refItem.title, refItem.company].filter(Boolean).join(' • ')}</p>
                      <p style={{ ...fontStyle('references', 12), color: mutedTextColor }}>{refItem.contact || t('template.contactInfoPlaceholder')}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 whitespace-pre-line" style={fontStyle('references', 14)}>
                  {data.referencesNote || t('template.referencesPlaceholder')}
                </p>
              )}
            </section>
          ) : null}

          {data.showCustomSections !== false && data.customSections?.length > 0
            ? data.customSections.map((section, idx) => (
                <section key={idx} className="mt-7">
                  <h2 className="text-sm font-bold uppercase tracking-[0.16em] border-b pb-2" style={{ ...fontStyle('customTitle', 14), color: sectionTitleColor, borderColor: dividerColor }}>
                    {section.title || t('template.customSectionPlaceholder')}
                  </h2>
                  <p className="mt-3 whitespace-pre-line" style={fontStyle('customContent', 14)}>
                    {section.content || t('template.customContentPlaceholder')}
                  </p>
                </section>
              ))
            : null}
        </div>
      </div>

      <div className="px-10 pb-6">
        <div className="h-[2px]" style={{ backgroundColor: secondaryColor }} />
      </div>
    </div>
  );
});

export default FifthTemplate;
