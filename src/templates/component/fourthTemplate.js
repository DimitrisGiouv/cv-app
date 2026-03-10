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

const FourthTemplate = forwardRef(({ data, fontSizes }, ref) => {
  const { t } = useTranslation();
  const { fontStyle, iconSize } = createTemplateTypography(fontSizes);
  const showContactIcons = data?.showContactIcons !== false;
  const primaryColor = data?.primaryColor || '#27272a';
  const secondaryColor = data?.secondaryColor || '#52525b';
  const tertiaryColor = data?.tertiaryColor || '#38bdf8';
  const linkColor = data?.linkColor || tertiaryColor;
  const dividerColor = data?.dividerColor || '#52525b3d';
  const surfaceColor = data?.surfaceColor || '#ffffff';
  const surfaceAltColor = data?.surfaceAltColor || '#f9fafb';
  const textColor = data?.textColor || '#111827';
  const titleColor = data?.titleColor || '#f8fafc';
  const subtitleColor = data?.subtitleColor || '#e4e4e7';
  const sectionTitleColor = data?.sectionTitleColor || '#3f3f46';
  const mutedTextColor = data?.mutedTextColor || '#6b7280';
  const headerTextColor = data?.headerTextColor || '#ffffff';

  const SectionCard = ({ title, children, titleStyle }) => (
    <section className="rounded-xl border p-4 mb-4" style={{ borderColor: dividerColor, backgroundColor: surfaceAltColor }}>
      <h2 className="text-xs font-bold uppercase tracking-[0.14em] mb-2" style={{ ...titleStyle, color: sectionTitleColor }}>{title}</h2>
      {children}
    </section>
  );

  return (
    <div ref={ref} className="w-[794px] min-h-[1123px] box-border mx-auto border break-words page-break-inside-avoid" style={{ color: textColor, backgroundColor: surfaceColor, borderColor: dividerColor }}>
      <div className="px-10 py-8" style={{ backgroundColor: primaryColor, color: headerTextColor }}>
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <h1 className="font-bold" style={{ ...fontStyle('name', 24), color: titleColor }}>{data.name || t('template.fullName')}</h1>
            {data.showHeadline !== false ? (
              <p className="mt-1" style={{ ...fontStyle('headline', 14), color: subtitleColor }}>{data.headline || t('template.headline')}</p>
            ) : null}
            {shouldShow(data.showTargetRole) ? (
              <p className="mt-1" style={{ ...fontStyle('targetRole', 14), color: subtitleColor }}>
                {t('template.targetRoleLabel')}: {safeText(data.targetRole, t('template.targetRolePlaceholder'))}
              </p>
            ) : null}
          </div>

          {data.showProfileImage ? (
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-white/20 ring-1 ring-white/40 flex items-center justify-center text-xs text-white/90">
              {data.profileImage ? (
                <img src={data.profileImage} alt={t('template.photo')} className="h-full w-full object-cover" />
              ) : (
                <span>{t('template.photo')}</span>
              )}
            </div>
          ) : null}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1" style={{ color: subtitleColor }}>
          {shouldShow(data.showEmail) ? (
            <p className="break-all flex items-start gap-2 min-w-0" style={fontStyle('email', 14)}>
              {showContactIcons ? <Mail size={iconSize('email', 14)} className="shrink-0 mt-0.5" /> : null}
              <a href={hasText(data.email) ? `mailto:${data.email}` : undefined} className="min-w-0 break-all hover:underline">{safeText(data.email, t('template.emailPlaceholder'))}</a>
            </p>
          ) : null}
          {shouldShow(data.showPhone) ? (
            <p className="flex items-start gap-2 min-w-0" style={fontStyle('phone', 14)}>
              {showContactIcons ? <Phone size={iconSize('phone', 14)} className="shrink-0 mt-0.5" /> : null}
              <span>{safeText(data.phone, t('template.phonePlaceholder'))}</span>
            </p>
          ) : null}
          {shouldShow(data.showWebsite) ? (
            <p className="break-all flex items-start gap-2 min-w-0" style={{ ...fontStyle('website', 14), color: linkColor }}>
              {showContactIcons ? <Globe size={iconSize('website', 14)} className="shrink-0 mt-0.5" /> : null}
              <a href={toExternalUrl(data.website)} target="_blank" rel="noopener noreferrer" className="min-w-0 break-all hover:underline">{safeText(data.website, t('template.websitePlaceholder'))}</a>
            </p>
          ) : null}
          {shouldShow(data.showLocation) ? (
            <p className="flex items-start gap-2 min-w-0" style={fontStyle('location', 14)}>
              {showContactIcons ? <MapPin size={iconSize('location', 14)} className="shrink-0 mt-0.5" /> : null}
              <span>{safeText(data.location, t('template.locationPlaceholder'))}</span>
            </p>
          ) : null}
          {shouldShow(data.showLinkedin) ? (
            <p className="break-all flex items-start gap-2 min-w-0" style={{ ...fontStyle('linkedin', 14), color: linkColor }}>
              {showContactIcons ? <Linkedin size={iconSize('linkedin', 14)} className="shrink-0 mt-0.5" /> : null}
              <a href={toExternalUrl(data.linkedin)} target="_blank" rel="noopener noreferrer" className="min-w-0 break-all hover:underline">{safeText(data.linkedin, t('template.linkedinPlaceholder'))}</a>
            </p>
          ) : null}
          {shouldShow(data.showGithub) ? (
            <p className="break-all flex items-start gap-2 min-w-0" style={{ ...fontStyle('github', 14), color: linkColor }}>
              {showContactIcons ? <Github size={iconSize('github', 14)} className="shrink-0 mt-0.5" /> : null}
              <a href={toExternalUrl(data.github)} target="_blank" rel="noopener noreferrer" className="min-w-0 break-all hover:underline">{safeText(data.github, t('template.githubPlaceholder'))}</a>
            </p>
          ) : null}
        </div>
      </div>

      <div className="px-10 py-8 grid grid-cols-2 gap-4">
        <div>
          {data.showSummary !== false ? (
          <SectionCard title={t('template.summary')}>
            <p className="whitespace-pre-line" style={fontStyle('summary', 14)}>{data.summary || t('template.summaryPlaceholder')}</p>
          </SectionCard>
          ) : null}

          {data.showExperience !== false ? (
          <SectionCard title={t('template.experience')}>
            {data.experience?.length > 0 ? data.experience.map((exp, i) => (
              <div key={i} className="mb-3 last:mb-0">
                <p className="font-semibold" style={fontStyle('experienceRole', 14)}>{exp.role || t('template.role')}</p>
                <p style={{ ...fontStyle('experienceCompany', 14), color: mutedTextColor }}>{exp.company || t('template.company')}</p>
                <p className="text-xs" style={{ color: mutedTextColor }}>{[exp.startDate, exp.endDate].filter(Boolean).join(' - ') || '-'}</p>
                <p className="whitespace-pre-line mt-1" style={fontStyle('experienceDescription', 14)}>{exp.description || t('template.experiencePlaceholder')}</p>
                {exp.bulletPoints ? (
                  <ul className="mt-1 list-disc pl-5" style={fontStyle('experienceDescription', 14)}>
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
          </SectionCard>
          ) : null}

          {data.showProjects !== false ? (
          <SectionCard title={t('template.projects')}>
            {data.projects?.length > 0 ? data.projects.map((project, i) => (
              <div key={i} className="mb-3 last:mb-0">
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
                  <a
                    href={toExternalUrl(project.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all hover:underline"
                    style={{ ...fontStyle('projectLink', 12), color: linkColor }}
                  >
                    {project.link}
                  </a>
                ) : null}
                {project.description ? (
                  <p className="whitespace-pre-line mt-1" style={fontStyle('projectDescription', 14)}>{project.description}</p>
                ) : null}
              </div>
            )) : <p className="text-sm" style={{ color: mutedTextColor }}>{t('template.projectsPlaceholder')}</p>}
          </SectionCard>
          ) : null}
        </div>

        <div>
          {data.showSkills !== false ? (
          <SectionCard title={t('template.skills')}>
            {data.skills?.length > 0 ? data.skills.map((skill, i) => (
              <div key={i} className="mb-3 last:mb-0">
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
          </SectionCard>
          ) : null}

          {data.showEducation !== false ? (
          <SectionCard title={t('template.education')}>
            {data.education?.length > 0 ? data.education.map((edu, i) => (
              <div key={i} className="mb-2 last:mb-0">
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
          </SectionCard>
          ) : null}

          {data.showLanguages !== false ? (
          <SectionCard title={t('template.languages')}>
            {data.languages?.length > 0 ? data.languages.map((lang, i) => (
              <p key={i}>
                <span className="font-semibold" style={fontStyle('languageName', 14)}>{lang.name || t('template.languageNamePlaceholder')}</span>
                <span style={{ ...fontStyle('languageLevel', 12), color: mutedTextColor }}>
                  {' - '}{lang.level || t('template.languageLevelPlaceholder')}
                  {lang.cefr ? ` (${lang.cefr})` : ''}
                </span>
              </p>
            )) : <p className="text-sm" style={{ color: mutedTextColor }}>{t('template.languagesPlaceholder')}</p>}
          </SectionCard>
          ) : null}

          {data.showCertifications !== false ? (
          <SectionCard title={t('template.certifications')}>
            {data.certifications?.length > 0 ? data.certifications.map((cert, i) => (
              <div key={i} className="mb-2 last:mb-0">
                <p className="font-semibold" style={fontStyle('certificationName', 14)}>{cert.name || t('template.certificationNamePlaceholder')}</p>
                <p style={{ color: mutedTextColor }}>
                  <span style={fontStyle('certificationIssuer', 12)}>{cert.issuer || t('template.certificationIssuerPlaceholder')}</span>
                  {' | '}
                  <span style={fontStyle('certificationYear', 12)}>{cert.year || t('template.certificationYearPlaceholder')}</span>
                </p>
                {(cert.url || cert.expirationDate) && (
                  <p style={{ ...fontStyle('certificationYear', 12), color: mutedTextColor }}>
                    {cert.url || t('template.certificateUrlPlaceholder')}
                    {cert.expirationDate ? ` • ${t('template.expiresOn')} ${cert.expirationDate}` : ''}
                  </p>
                )}
              </div>
            )) : <p className="text-sm" style={{ color: mutedTextColor }}>{t('template.certificationsPlaceholder')}</p>}
          </SectionCard>
          ) : null}

          {data.showReferences !== false ? (
          <SectionCard title={t('template.references')}>
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
          </SectionCard>
          ) : null}

          {data.showCustomSections !== false && data.customSections?.length > 0 &&
            data.customSections.map((section, idx) => (
              <SectionCard key={idx} title={section.title || t('template.customSectionPlaceholder')} titleStyle={fontStyle('customTitle', 14)}>
                <p className="whitespace-pre-line" style={fontStyle('customContent', 14)}>{section.content || t('template.customContentPlaceholder')}</p>
              </SectionCard>
            ))}
        </div>
      </div>
    </div>
  );
});

export default FourthTemplate;
