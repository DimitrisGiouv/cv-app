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

const ThirdTemplate = forwardRef(({ data, fontSizes }, ref) => {
  const { t } = useTranslation();
  const { fontStyle, iconSize } = createTemplateTypography(fontSizes);
  const showContactIcons = data?.showContactIcons !== false;
  const primaryColor = data?.primaryColor || '#111827';
  const secondaryColor = data?.secondaryColor || '#4b5563';
  const tertiaryColor = data?.tertiaryColor || '#0ea5e9';
  const linkColor = data?.linkColor || tertiaryColor;
  const dividerColor = data?.dividerColor || `${secondaryColor}55`;
  const surfaceColor = data?.surfaceColor || '#ffffff';
  const textColor = data?.textColor || '#18181b';
  const titleColor = data?.titleColor || '#0f172a';
  const subtitleColor = data?.subtitleColor || '#475569';
  const sectionTitleColor = data?.sectionTitleColor || '#334155';
  const mutedTextColor = data?.mutedTextColor || '#6b7280';

  return (
    <div ref={ref} className="w-[794px] min-h-[1123px] box-border mx-auto text-zinc-900 border break-words page-break-inside-avoid" style={{ color: textColor, backgroundColor: surfaceColor, borderColor: dividerColor }}>
      <div className="px-10 pt-10 pb-6 border-b" style={{ borderColor: dividerColor, backgroundColor: `${primaryColor}08` }}>
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
            <div className="mt-3 space-y-1" style={{ color: mutedTextColor }}>
              {shouldShow(data.showEmail) ? (
                <div className="flex items-start gap-2 min-w-0" style={fontStyle('email', 14)}>
                  {showContactIcons ? <Mail size={iconSize('email', 14)} className="shrink-0 mt-0.5" style={{ color: secondaryColor }} /> : null}
                  <a href={hasText(data.email) ? `mailto:${data.email}` : undefined} className="min-w-0 break-all hover:underline">{safeText(data.email, t('template.emailPlaceholder'))}</a>
                </div>
              ) : null}
              {shouldShow(data.showPhone) ? (
                <div className="flex items-start gap-2 min-w-0" style={fontStyle('phone', 14)}>
                  {showContactIcons ? <Phone size={iconSize('phone', 14)} className="shrink-0 mt-0.5" style={{ color: secondaryColor }} /> : null}
                  <span>{safeText(data.phone, t('template.phonePlaceholder'))}</span>
                </div>
              ) : null}
            </div>
          </div>

          {data.showProfileImage ? (
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-slate-200 ring-1 ring-slate-300 flex items-center justify-center text-xs text-slate-600">
              {data.profileImage ? (
                <img src={data.profileImage} alt={t('template.photo')} className="h-full w-full object-cover" />
              ) : (
                <span>{t('template.photo')}</span>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-[0.78fr_1.22fr] gap-8 px-10 py-8">
        <aside>
          <section className="mb-7">
            <h2 className="text-xs uppercase tracking-[0.18em] mb-2" style={{ color: sectionTitleColor }}>{t('template.contact')}</h2>
            {shouldShow(data.showLocation) ? (
              <div className="flex items-start gap-2 min-w-0">
                {showContactIcons ? <MapPin size={iconSize('location', 14)} className="shrink-0 mt-0.5" style={{ color: secondaryColor }} /> : null}
                <p className="break-words min-w-0" style={fontStyle('location', 14)}>{safeText(data.location, t('template.locationPlaceholder'))}</p>
              </div>
            ) : null}
            {shouldShow(data.showWebsite) ? (
              <div className="mt-1 flex items-start gap-2 min-w-0">
                {showContactIcons ? <Globe size={iconSize('website', 14)} className="shrink-0 mt-0.5" style={{ color: secondaryColor }} /> : null}
                <a href={toExternalUrl(data.website)} target="_blank" rel="noopener noreferrer" className="break-all min-w-0 hover:underline" style={{ ...fontStyle('website', 14), color: linkColor }}>
                  {safeText(data.website, t('template.websitePlaceholder'))}
                </a>
              </div>
            ) : null}
            {shouldShow(data.showLinkedin) ? (
              <div className="mt-1 flex items-start gap-2 min-w-0">
                {showContactIcons ? <Linkedin size={iconSize('linkedin', 14)} className="shrink-0 mt-0.5" style={{ color: secondaryColor }} /> : null}
                <a href={toExternalUrl(data.linkedin)} target="_blank" rel="noopener noreferrer" className="break-all min-w-0 hover:underline" style={{ ...fontStyle('linkedin', 14), color: linkColor }}>
                  {safeText(data.linkedin, t('template.linkedinPlaceholder'))}
                </a>
              </div>
            ) : null}
            {shouldShow(data.showGithub) ? (
              <div className="mt-1 flex items-start gap-2 min-w-0">
                {showContactIcons ? <Github size={iconSize('github', 14)} className="shrink-0 mt-0.5" style={{ color: secondaryColor }} /> : null}
                <a href={toExternalUrl(data.github)} target="_blank" rel="noopener noreferrer" className="break-all min-w-0 hover:underline" style={{ ...fontStyle('github', 14), color: linkColor }}>
                  {safeText(data.github, t('template.githubPlaceholder'))}
                </a>
              </div>
            ) : null}
          </section>

          {data.showSkills !== false ? (
          <section className="mb-7">
            <h2 className="text-xs uppercase tracking-[0.18em] mb-2" style={{ color: sectionTitleColor }}>{t('template.skills')}</h2>
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
            )) : <p className="text-sm text-zinc-500">{t('template.skillsPlaceholder')}</p>}
          </section>
          ) : null}

          {data.showLanguages !== false ? (
          <section className="mb-7">
            <h2 className="text-xs uppercase tracking-[0.18em] mb-2" style={{ color: sectionTitleColor }}>{t('template.languages')}</h2>
            {data.languages?.length > 0 ? data.languages.map((lang, i) => (
              <p key={i}>
                <span className="font-semibold" style={fontStyle('languageName', 14)}>{lang.name || t('template.languageNamePlaceholder')}</span>
                <span style={{ ...fontStyle('languageLevel', 12), color: mutedTextColor }}>
                  {' - '}{lang.level || t('template.languageLevelPlaceholder')}
                  {lang.cefr ? ` (${lang.cefr})` : ''}
                </span>
              </p>
            )) : <p className="text-sm text-zinc-500">{t('template.languagesPlaceholder')}</p>}
          </section>
          ) : null}

          {data.showCertifications !== false ? (
          <section className="mb-7">
            <h2 className="text-xs uppercase tracking-[0.18em] mb-2" style={{ color: sectionTitleColor }}>{t('template.certifications')}</h2>
            {data.certifications?.length > 0 ? data.certifications.map((cert, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold" style={fontStyle('certificationName', 14)}>{cert.name || t('template.certificationNamePlaceholder')}</p>
                <p style={{ ...fontStyle('certificationIssuer', 12), color: mutedTextColor }}>
                  {cert.issuer || t('template.certificationIssuerPlaceholder')}
                  {' • '}
                  {cert.year || t('template.certificationYearPlaceholder')}
                </p>
                {(cert.url || cert.expirationDate) && (
                  <p style={{ ...fontStyle('certificationYear', 12), color: mutedTextColor }}>
                    {cert.url || t('template.certificateUrlPlaceholder')}
                    {cert.expirationDate ? ` • ${t('template.expiresOn')} ${cert.expirationDate}` : ''}
                  </p>
                )}
              </div>
            )) : <p className="text-sm text-zinc-500">{t('template.certificationsPlaceholder')}</p>}
          </section>
          ) : null}
        </aside>

        <main>
          {data.showSummary !== false ? (
          <section className="mb-7">
            <h2 className="text-sm font-bold border-b pb-1" style={{ borderColor: dividerColor, color: sectionTitleColor }}>{t('template.summary')}</h2>
            <p className="mt-3 whitespace-pre-line" style={fontStyle('summary', 14)}>{data.summary || t('template.summaryPlaceholder')}</p>
          </section>
          ) : null}

          {data.showExperience !== false ? (
          <section className="mb-7">
            <h2 className="text-sm font-bold border-b pb-1" style={{ borderColor: dividerColor, color: sectionTitleColor }}>{t('template.experience')}</h2>
            <div className="mt-3 space-y-4">
              {data.experience?.length > 0 ? data.experience.map((exp, i) => (
                <div key={i}>
                  <p className="font-semibold" style={fontStyle('experienceRole', 14)}>{exp.role || t('template.role')}</p>
                  <p style={{ ...fontStyle('experienceCompany', 14), color: mutedTextColor }}>{exp.company || t('template.company')}</p>
                  <p className="text-xs" style={{ color: mutedTextColor }}>
                    {[exp.startDate, exp.endDate].filter(Boolean).join(' - ') || '-'}
                    {exp.location ? ` • ${exp.location}` : ''}
                  </p>
                  <p className="mt-1 whitespace-pre-line" style={fontStyle('experienceDescription', 14)}>{exp.description || t('template.experiencePlaceholder')}</p>
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
              )) : <p className="text-sm text-zinc-500">{t('template.experiencePlaceholder')}</p>}
            </div>
          </section>
          ) : null}

          {data.showEducation !== false ? (
          <section className="mb-7">
            <h2 className="text-sm font-bold border-b pb-1" style={{ borderColor: dividerColor, color: sectionTitleColor }}>{t('template.education')}</h2>
            <div className="mt-3 space-y-2">
              {data.education?.length > 0 ? data.education.map((edu, i) => (
                <div key={i}>
                  <p className="font-semibold" style={fontStyle('educationSchool', 14)}>{edu.school || t('template.educationSchoolPlaceholder')}</p>
                  <p style={{ ...fontStyle('educationDegree', 12), color: mutedTextColor }}>{edu.degree || t('template.educationDegreePlaceholder')}</p>
                  <p style={{ ...fontStyle('educationYear', 12), color: mutedTextColor }}>{edu.year || t('template.educationYearPlaceholder')}</p>
                  <p style={{ ...fontStyle('educationYear', 12), color: mutedTextColor }}>
                    {[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}
                    {edu.location ? ` • ${edu.location}` : ''}
                    {edu.gpa ? ` • GPA ${edu.gpa}` : ''}
                  </p>
                </div>
              )) : <p className="text-sm text-zinc-500">{t('template.educationPlaceholder')}</p>}
            </div>
          </section>
          ) : null}

          {data.showProjects !== false ? (
          <section>
            <h2 className="text-sm font-bold border-b pb-1" style={{ borderColor: dividerColor, color: sectionTitleColor }}>{t('template.projects')}</h2>
            <div className="mt-3 space-y-3">
              {data.projects?.length > 0 ? data.projects.map((project, i) => (
                <div key={i}>
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
                    <p className="whitespace-pre-line" style={fontStyle('projectDescription', 14)}>{project.description}</p>
                  ) : null}
                </div>
              )) : <p className="text-sm text-zinc-500">{t('template.projectsPlaceholder')}</p>}
            </div>
          </section>
          ) : null}

          {data.showReferences !== false ? (
          <section className="mb-7">
            <h2 className="text-sm font-bold border-b pb-1" style={{ borderColor: dividerColor, color: sectionTitleColor }}>{t('template.references')}</h2>
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
            ) : <p className="text-sm text-zinc-500 mt-3" style={fontStyle('references', 14)}>{data.referencesNote || t('template.referencesPlaceholder')}</p>}
          </section>
          ) : null}

          {data.showCustomSections !== false && data.customSections?.length > 0 && data.customSections.map((section, idx) => (
            <section key={idx} className="mb-7">
              <h2 className="text-sm font-bold border-b pb-1" style={{ ...fontStyle('customTitle', 14), borderColor: dividerColor, color: sectionTitleColor }}>{section.title || t('template.customSectionPlaceholder')}</h2>
              <p className="mt-3 whitespace-pre-line" style={fontStyle('customContent', 14)}>{section.content || t('template.customContentPlaceholder')}</p>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
});

export default ThirdTemplate;
