import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AutocompleteInput from './AutocompleteInput';

const SKILL_CATEGORY_OPTIONS = [
  'Frontend',
  'Backend',
  'Full Stack',
  'Mobile',
  'Data',
  'DevOps',
  'Cloud',
  'Design',
  'Management',
  'Soft Skills',
];

const SKILL_LEVEL_OPTIONS = [
  { value: 25, label: 'Beginner' },
  { value: 50, label: 'Intermediate' },
  { value: 75, label: 'Advanced' },
  { value: 90, label: 'Expert' },
];

/**
 * Single text input field with label, error handling, and optional font size dropdown
 */
export function TextInput({
  label,
  error,
  registerProps,
  fontSizeDropdown = null,
  labelSuffix = null,
  customInput = null,
  helperText = '',
  afterInput = null,
  className = '',
}) {
  const toggleId = labelSuffix?.props?.id;

  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          {toggleId ? (
            <label htmlFor={toggleId} className="text-sm text-gray-900 dark:text-gray-200 text-left cursor-pointer">
              {label}
            </label>
          ) : (
            <div className="text-sm text-gray-900 dark:text-gray-200 text-left">{label}</div>
          )}
          {labelSuffix}
        </div>
        <div className="ml-auto shrink-0">{fontSizeDropdown}</div>
      </div>
      <div className="flex items-center gap-1">
        {customInput || (
          <input
            {...registerProps}
            className={clsx(
              'border dark:border-gray-700',
              'dark:bg-gray-900 bg-white',
              'text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'p-2 w-full h-7',
              'focus:outline-none focus:ring-2 focus:ring-blue-600',
              'rounded',
              className
            )}
          />
        )}
      </div>
      {helperText ? (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      ) : null}
      {afterInput ? <div className="mt-2">{afterInput}</div> : null}
      {error && (
        <span className="text-red-500 text-sm">
          {error}
        </span>
      )}
    </div>
  );
}

/**
 * Two side-by-side text input fields with labels, error handling, and optional font size dropdowns
 */
export function TwoColumnTextInput({
  label1,
  label2,
  error1,
  error2,
  registerProps1,
  registerProps2,
  fontSizeDropdown1 = null,
  fontSizeDropdown2 = null,
  labelSuffix1 = null,
  labelSuffix2 = null,
  customInput1 = null,
  customInput2 = null,
  className = '',
}) {
  const toggleId1 = labelSuffix1?.props?.id;
  const toggleId2 = labelSuffix2?.props?.id;

  return (
    <div className="mb-4 flex gap-4">
      <div className="w-1/2">
        <div className="mb-1 flex items-center gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            {toggleId1 ? (
              <label htmlFor={toggleId1} className="text-sm text-gray-900 dark:text-gray-200 text-left cursor-pointer">
                {label1}
              </label>
            ) : (
              <div className="text-sm text-gray-900 dark:text-gray-200 text-left">{label1}</div>
            )}
            {labelSuffix1}
          </div>
          <div className="ml-auto shrink-0">{fontSizeDropdown1}</div>
        </div>
        <div className="flex items-center gap-1">
          {customInput1 || (
            <input
              {...registerProps1}
              className={clsx(
                'border dark:border-gray-700',
                'dark:bg-gray-900 bg-white',
                'text-gray-900 dark:text-gray-100',
                'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                'p-2 w-full h-7 flex-1',
                'focus:outline-none focus:ring-2 focus:ring-blue-600',
                'rounded',
                className
              )}
            />
          )}
        </div>
        {error1 && (
          <span className="text-red-500 text-sm">
            {error1}
          </span>
        )}
      </div>

      <div className="w-1/2">
        <div className="mb-1 flex items-center gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            {toggleId2 ? (
              <label htmlFor={toggleId2} className="text-sm text-gray-900 dark:text-gray-200 text-left cursor-pointer">
                {label2}
              </label>
            ) : (
              <div className="text-sm text-gray-900 dark:text-gray-200 text-left">{label2}</div>
            )}
            {labelSuffix2}
          </div>
          <div className="ml-auto shrink-0">{fontSizeDropdown2}</div>
        </div>
        <div className="flex items-center gap-1">
          {customInput2 || (
            <input
              {...registerProps2}
              className={clsx(
                'border dark:border-gray-700',
                'dark:bg-gray-900 bg-white',
                'text-gray-900 dark:text-gray-100',
                'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                'p-2 w-full h-7 flex-1',
                'focus:outline-none focus:ring-2 focus:ring-blue-600',
                'rounded',
                className
              )}
            />
          )}
        </div>
        {error2 && (
          <span className="text-red-500 text-sm">
            {error2}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Multi-line textarea input field with label, error handling, and optional font size dropdown
 */
export function TextAreaInput({
  label,
  error,
  registerProps,
  fontSizeDropdown = null,
  labelSuffix = null,
  className = '',
}) {
  const toggleId = labelSuffix?.props?.id;

  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          {toggleId ? (
            <label htmlFor={toggleId} className="text-sm text-gray-900 dark:text-gray-200 text-left cursor-pointer">
              {label}
            </label>
          ) : (
            <div className="text-sm text-gray-900 dark:text-gray-200 text-left">{label}</div>
          )}
          {labelSuffix}
        </div>
        <div className="ml-auto shrink-0">{fontSizeDropdown}</div>
      </div>
      <div className="flex items-center gap-1">
        <textarea
          {...registerProps}
          className={clsx(
            'border dark:border-gray-700',
            'dark:bg-gray-900 bg-white',
            'text-gray-900 dark:text-gray-100',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'p-2 w-full h-auto',
            'text-sm resize-none',
            'focus:outline-none focus:ring-2 focus:ring-blue-600',
            'rounded',
            className
          )}
          rows={7}
        />
      </div>
      {error && (
        <span className="text-red-500 text-sm">
          {error}
        </span>
      )}
    </div>
  );
}

/**
 * Authentication form input field for login/register forms with placeholder and error handling
 */
export function AuthInput({ placeholder, error, registerProps }) {
  return (
    <div className="mb-1">
      <input
        {...registerProps}
        placeholder={placeholder}
        className={clsx(
          'border border-gray-200 dark:border-gray-700',
          'bg-white dark:bg-gray-900',
          'text-gray-900 dark:text-gray-100',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          'rounded w-full h-1/2',
          'mb-3 px-3 py-3',
          'focus:outline-none focus:ring-2 focus:ring-blue-600'
        )}
      />
      {error && (
        <span className="flex text-red-500 text-sm">
          {error}
        </span>
      )}
    </div>
  );
}

/**
 * Dynamic skills field list with add/remove buttons, supports skill name, description, and proficiency level
 */
export function FormSkills({
  fields,
  register,
  setValue = null,
  errors,
  remove,
  append,
  fontSizeControls = {},
  sectionToggle = null,
  sectionToggleId = null,
  skillSuggestions = [],
  onSkillInputChange = null,
}) {
  const { t } = useTranslation();
  const hasFontControls = Boolean(fontSizeControls.name || fontSizeControls.description);
  const [showFontControls, setShowFontControls] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        {sectionToggle ? (
          <div className="inline-flex items-center gap-2">
            {sectionToggleId ? (
              <label htmlFor={sectionToggleId} className="text-lg font-semibold text-gray-900 dark:text-gray-100 cursor-pointer">{t('form.sections.skills')}</label>
            ) : (
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('form.sections.skills')}</span>
            )}
            {sectionToggle}
          </div>
        ) : (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('form.sections.skills')}</h3>
        )}
        <div className="flex items-center gap-2">
          {hasFontControls ? (
            <button
              type="button"
              onClick={() => setShowFontControls((prev) => !prev)}
              className="rounded border border-gray-300 dark:border-gray-600 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {showFontControls ? 'Hide sizes' : 'Edit sizes'}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => append({ name: '', description: '', category: '', level: 50 })}
            className={clsx(
              'text-sm py-1 px-3',
              'text-gray-800 dark:text-gray-100',
              'hover:bg-gray-200 dark:hover:bg-gray-700',
              'rounded transition-colors',
              'font-medium'
            )}
            aria-label="Add skill"
          >
            ➕ {t('form.actions.addSkill')}
          </button>
        </div>
      </div>

      {hasFontControls && showFontControls ? (
        <div className="mb-3 flex flex-wrap gap-3 items-center rounded border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 p-2">
          {fontSizeControls.name && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.skillName')}</span>
              {fontSizeControls.name}
            </div>
          )}
          {fontSizeControls.description && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.description')}</span>
              {fontSizeControls.description}
            </div>
          )}
        </div>
      ) : null}

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          {t('form.empty.skills')}
        </p>
      ) : (
        fields.map((item, index) => {
          const skillNameRegister = register(`skills.${index}.name`, {
            required: t('form.errors.skillNameRequired'),
          });

          return (
          <div key={item.id} className="mb-4 rounded-xl border border-gray-300/80 dark:border-gray-600 bg-white/40 dark:bg-gray-900/30 p-3 shadow-sm">
            <div className="mb-2 flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Skill #{index + 1}
              </p>
              <button
                type="button"
                onClick={() => remove(index)}
                className={clsx(
                  'text-red-500 hover:text-red-700',
                  'py-1 px-2 rounded',
                  'transition-colors text-sm'
                )}
                aria-label="Remove skill"
              >
                ❌
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-12 xl:items-end">
              {/* Skill Name */}
              <div className="xl:col-span-4">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                  {t('form.fields.skillName')}
                </label>
                <AutocompleteInput
                  name={`skills.${index}.name`}
                  registerReturn={skillNameRegister}
                  setValue={setValue}
                  suggestions={skillSuggestions}
                  onInputChange={onSkillInputChange}
                  placeholder={t('form.placeholders.skillName')}
                />
              </div>

              {/* Description */}
              <div className="xl:col-span-4">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                  {`${t('form.fields.description')} (optional)`}
                </label>
                <input
                  type="text"
                  placeholder={`${t('form.placeholders.skillDescription')} (optional)`}
                  {...register(`skills.${index}.description`)}
                  className={clsx(
                    'border dark:border-gray-700',
                    'dark:bg-gray-900 bg-white',
                    'text-gray-900 dark:text-gray-100',
                    'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                    'p-2 w-full h-8',
                    'text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-blue-600',
                    'rounded'
                  )}
                />
              </div>

              {/* Level */}
              <div className="md:max-w-[12rem] xl:col-span-2 xl:max-w-none">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                  {t('form.fields.level')}
                </label>
                <select
                  {...register(`skills.${index}.level`)}
                  className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 p-1.5 w-full h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
                >
                  {SKILL_LEVEL_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div className="xl:col-span-2">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                  {`${t('form.fields.category')} (optional)`}
                </label>
                <input
                  type="text"
                  list={`skills-category-options-${index}`}
                  placeholder={`${t('form.placeholders.category')} (optional)`}
                  {...register(`skills.${index}.category`)}
                  className={clsx(
                    'border dark:border-gray-700',
                    'dark:bg-gray-900 bg-white',
                    'text-gray-900 dark:text-gray-100',
                    'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                    'p-2 w-full h-8',
                    'text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-blue-600',
                    'rounded'
                  )}
                />
                <datalist id={`skills-category-options-${index}`}>
                  {SKILL_CATEGORY_OPTIONS.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>

            </div>

            {/* Error Message */}
            {errors?.skills?.[index]?.name && (
              <span className="text-red-500 text-xs mt-2 block">
                {errors.skills[index].name.message}
              </span>
            )}
          </div>
          );
        })
      )}
    </div>
  );
}

/**
 * Dynamic education field list with add/remove buttons, supports school, degree, and graduation year
 */
export function FormEducation({
  fields,
  register,
  setValue = null,
  errors,
  remove,
  append,
  fontSizeControls = {},
  sectionToggle = null,
  sectionToggleId = null,
  schoolSuggestions = [],
  onSchoolInputChange = null,
  locationSuggestions = [],
  onLocationInputChange = null,
}) {
  const { t } = useTranslation();
  const hasFontControls = Boolean(fontSizeControls.school || fontSizeControls.degree || fontSizeControls.year);
  const [showFontControls, setShowFontControls] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        {sectionToggle ? (
          <div className="inline-flex items-center gap-2">
            {sectionToggleId ? (
              <label htmlFor={sectionToggleId} className="text-lg font-semibold text-gray-900 dark:text-gray-100 cursor-pointer">{t('form.sections.education')}</label>
            ) : (
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('form.sections.education')}</span>
            )}
            {sectionToggle}
          </div>
        ) : (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('form.sections.education')}</h3>
        )}
        <div className="flex items-center gap-2">
          {hasFontControls ? (
            <button
              type="button"
              onClick={() => setShowFontControls((prev) => !prev)}
              className="rounded border border-gray-300 dark:border-gray-600 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {showFontControls ? 'Hide sizes' : 'Edit sizes'}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => append({ school: '', degree: '', year: '', location: '', startDate: '', endDate: '', gpa: '' })}
            className={clsx(
              'text-sm py-1 px-3',
              'text-gray-800 dark:text-gray-100',
              'hover:bg-gray-200 dark:hover:bg-gray-700',
              'rounded transition-colors',
              'font-medium'
            )}
            aria-label="Add education"
          >
            ➕ {t('form.actions.addEducation')}
          </button>
        </div>
      </div>

      {hasFontControls && showFontControls ? (
        <div className="mb-3 flex flex-wrap gap-3 items-center rounded border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 p-2">
          {fontSizeControls.school && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.schoolUniversity')}</span>
              {fontSizeControls.school}
            </div>
          )}
          {fontSizeControls.degree && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.degree')}</span>
              {fontSizeControls.degree}
            </div>
          )}
          {fontSizeControls.year && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.year')}</span>
              {fontSizeControls.year}
            </div>
          )}
        </div>
      ) : null}

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          {t('form.empty.education')}
        </p>
      ) : (
        fields.map((item, index) => {
          const schoolRegister = register(`education.${index}.school`, {
            required: t('form.errors.schoolRequired'),
          });
          const locationRegister = register(`education.${index}.location`);

          return (
            <div key={item.id} className="mb-4 rounded-xl border border-gray-300/80 dark:border-gray-600 bg-white/40 dark:bg-gray-900/30 p-3 shadow-sm">
              <div className="mb-2 flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Education #{index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className={clsx(
                    'text-red-500 hover:text-red-700',
                    'py-1 px-2 rounded',
                    'transition-colors text-sm'
                  )}
                  aria-label="Remove education"
                >
                  ❌
                </button>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <AutocompleteInput
                    name={`education.${index}.school`}
                    registerReturn={schoolRegister}
                    setValue={setValue}
                    suggestions={schoolSuggestions}
                    onInputChange={onSchoolInputChange}
                    placeholder={t('form.placeholders.school')}
                  />

                  <input
                    type="text"
                    placeholder={t('form.placeholders.degree')}
                    {...register(`education.${index}.degree`, {
                      required: t('form.errors.degreeRequired'),
                    })}
                    className={clsx(
                      'border dark:border-gray-700',
                      'dark:bg-gray-900 bg-white',
                      'text-gray-900 dark:text-gray-100',
                      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                      'p-2 w-full h-8',
                      'text-sm',
                      'focus:outline-none focus:ring-2 focus:ring-blue-600',
                      'rounded'
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <AutocompleteInput
                    name={`education.${index}.location`}
                    registerReturn={locationRegister}
                    setValue={setValue}
                    suggestions={locationSuggestions}
                    onInputChange={onLocationInputChange}
                    placeholder={t('form.labels.location')}
                  />
                  <input
                    type="text"
                    placeholder={`${t('form.placeholders.year')} (optional)`}
                    {...register(`education.${index}.year`)}
                    className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 w-full h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
                  />
                </div>

                <div className="grid grid-cols-[1fr_1fr_110px] gap-2">
                  <input
                    type="text"
                    placeholder={t('form.fields.start')}
                    {...register(`education.${index}.startDate`)}
                    className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
                  />
                  <input
                    type="text"
                    placeholder={t('form.fields.end')}
                    {...register(`education.${index}.endDate`)}
                    className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
                  />
                  <input
                    type="text"
                    placeholder="GPA (opt.)"
                    {...register(`education.${index}.gpa`)}
                    className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
                  />
                </div>
              </div>

            {/* Error Messages */}
            {errors?.education?.[index]?.school && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.education[index].school.message}
              </span>
            )}
            {errors?.education?.[index]?.degree && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.education[index].degree.message}
              </span>
            )}
            {errors?.education?.[index]?.year && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.education[index].year.message}
              </span>
            )}
          </div>
          );
        })
      )}

    </div>
  );
}

/**
 * Dynamic experience field list with add/remove controls
 */
export function FormExperience({
  fields,
  register,
  setValue = null,
  errors,
  remove,
  append,
  fontSizeControls = {},
  sectionToggle = null,
  sectionToggleId = null,
  companySuggestions = [],
  onCompanyInputChange = null,
  roleSuggestions = [],
  onRoleInputChange = null,
  locationSuggestions = [],
  onLocationInputChange = null,
}) {
  const { t } = useTranslation();
  const hasFontControls = Boolean(fontSizeControls.company || fontSizeControls.role || fontSizeControls.description);
  const [showFontControls, setShowFontControls] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        {sectionToggle ? (
          <div className="inline-flex items-center gap-2">
            {sectionToggleId ? (
              <label htmlFor={sectionToggleId} className="text-lg font-semibold text-gray-900 dark:text-gray-100 cursor-pointer">{t('form.sections.experience')}</label>
            ) : (
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('form.sections.experience')}</span>
            )}
            {sectionToggle}
          </div>
        ) : (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('form.sections.experience')}</h3>
        )}
        <div className="flex items-center gap-2">
          {hasFontControls ? (
            <button
              type="button"
              onClick={() => setShowFontControls((prev) => !prev)}
              className="rounded border border-gray-300 dark:border-gray-600 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {showFontControls ? 'Hide sizes' : 'Edit sizes'}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() =>
              append({
                company: '',
                role: '',
                location: '',
                startDate: '',
                endDate: '',
                description: '',
                bulletPoints: '',
              })
            }
            className={clsx(
              'text-sm py-1 px-3',
              'text-gray-800 dark:text-gray-100',
              'hover:bg-gray-200 dark:hover:bg-gray-700',
              'rounded transition-colors',
              'font-medium'
            )}
            aria-label="Add experience"
          >
            ➕ {t('form.actions.addExperience')}
          </button>
        </div>
      </div>

      {hasFontControls && showFontControls ? (
        <div className="mb-3 flex flex-wrap gap-3 items-center rounded border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 p-2">
          {fontSizeControls.company && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.company')}</span>
              {fontSizeControls.company}
            </div>
          )}
          {fontSizeControls.role && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.rolePosition')}</span>
              {fontSizeControls.role}
            </div>
          )}
          {fontSizeControls.description && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.description')}</span>
              {fontSizeControls.description}
            </div>
          )}
        </div>
      ) : null}

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          {t('form.empty.experience')}
        </p>
      ) : (
        fields.map((item, index) => {
          const companyRegister = register(`experience.${index}.company`, {
            required: t('form.errors.companyRequired'),
          });
          const roleRegister = register(`experience.${index}.role`, {
            required: t('form.errors.roleRequired'),
          });
          const locationRegister = register(`experience.${index}.location`);

          return (
          <div key={item.id} className="mb-4 rounded-xl border border-gray-300/80 dark:border-gray-600 bg-white/40 dark:bg-gray-900/30 p-3 shadow-sm">
            <div className="mb-2 flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Experience #{index + 1}
              </p>
              <button
                type="button"
                onClick={() => remove(index)}
                className={clsx(
                  'text-red-500 hover:text-red-700',
                  'py-1 px-2 rounded',
                  'transition-colors text-sm'
                )}
                aria-label="Remove experience"
              >
                ❌
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <AutocompleteInput
                name={`experience.${index}.company`}
                registerReturn={companyRegister}
                setValue={setValue}
                suggestions={companySuggestions}
                onInputChange={onCompanyInputChange}
                placeholder={t('form.fields.company')}
              />
              <AutocompleteInput
                name={`experience.${index}.role`}
                registerReturn={roleRegister}
                setValue={setValue}
                suggestions={roleSuggestions}
                onInputChange={onRoleInputChange}
                placeholder={t('form.fields.rolePosition')}
              />
              <AutocompleteInput
                name={`experience.${index}.location`}
                registerReturn={locationRegister}
                setValue={setValue}
                suggestions={locationSuggestions}
                onInputChange={onLocationInputChange}
                placeholder={t('form.labels.location')}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder={t('form.fields.start')}
                  {...register(`experience.${index}.startDate`)}
                  className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
                />
                <input
                  type="text"
                  placeholder={t('form.fields.end')}
                  {...register(`experience.${index}.endDate`)}
                  className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
                />
              </div>
            </div>

            <textarea
              rows={3}
              placeholder={t('form.placeholders.experienceDescription')}
              {...register(`experience.${index}.description`)}
              className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 w-full text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            />
            <textarea
              rows={2}
              placeholder={t('form.placeholders.experienceBullets')}
              {...register(`experience.${index}.bulletPoints`)}
              className="mt-2 border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 w-full text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            />

            {errors?.experience?.[index]?.company && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.experience[index].company.message}
              </span>
            )}
            {errors?.experience?.[index]?.role && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.experience[index].role.message}
              </span>
            )}
          </div>
          );
        })
      )}
    </div>
  );
}

/**
 * Dynamic project field list with add/remove controls
 */
export function FormProjects({
  fields,
  register,
  setValue = null,
  remove,
  append,
  fontSizeControls = {},
  sectionToggle = null,
  sectionToggleId = null,
  roleSuggestions = [],
  onRoleInputChange = null,
  techStackSuggestions = [],
  onTechStackInputChange = null,
}) {
  const { t } = useTranslation();
  const hasFontControls = Boolean(
    fontSizeControls.name ||
    fontSizeControls.role ||
    fontSizeControls.dates ||
    fontSizeControls.link ||
    fontSizeControls.description
  );
  const [showFontControls, setShowFontControls] = useState(false);

  const buildTechStackValue = (currentValue, selectedValue) => {
    const selected = String(selectedValue || '').trim();
    const current = String(currentValue || '');
    if (!selected) return current;

    if (!current.includes(',')) {
      return selected;
    }

    const endsWithComma = /,\s*$/.test(current);
    const parts = current
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);

    if (endsWithComma) {
      parts.push(selected);
    } else if (parts.length > 0) {
      parts[parts.length - 1] = selected;
    } else {
      parts.push(selected);
    }

    // Keep first occurrence order when user repeatedly selects suggestions.
    const seen = new Set();
    const deduped = [];
    parts.forEach((part) => {
      const key = part.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      deduped.push(part);
    });

    return deduped.join(', ');
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        {sectionToggle ? (
          <div className="inline-flex items-center gap-2">
            {sectionToggleId ? (
              <label htmlFor={sectionToggleId} className="text-lg font-semibold text-gray-900 dark:text-gray-100 cursor-pointer">{t('form.sections.projects')}</label>
            ) : (
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('form.sections.projects')}</span>
            )}
            {sectionToggle}
          </div>
        ) : (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('form.sections.projects')}</h3>
        )}
        <div className="flex items-center gap-2">
          {hasFontControls ? (
            <button
              type="button"
              onClick={() => setShowFontControls((prev) => !prev)}
              className="rounded border border-gray-300 dark:border-gray-600 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {showFontControls ? 'Hide sizes' : 'Edit sizes'}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => append({ name: '', link: '', role: '', techStack: '', startDate: '', endDate: '', description: '' })}
            className={clsx(
              'text-sm py-1 px-3',
              'text-gray-800 dark:text-gray-100',
              'hover:bg-gray-200 dark:hover:bg-gray-700',
              'rounded transition-colors',
              'font-medium'
            )}
            aria-label="Add project"
          >
            ➕ {t('form.actions.addProject')}
          </button>
        </div>
      </div>

      {hasFontControls && showFontControls ? (
        <div className="mb-3 flex flex-wrap gap-3 items-center rounded border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 p-2">
          {fontSizeControls.name && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.projectName')}</span>
              {fontSizeControls.name}
            </div>
          )}
          {fontSizeControls.link && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.projectLink')}</span>
              {fontSizeControls.link}
            </div>
          )}
          {fontSizeControls.role && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.rolePosition')} / {t('form.fields.techStack')}</span>
              {fontSizeControls.role}
            </div>
          )}
          {fontSizeControls.dates && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.start')} / {t('form.fields.end')}</span>
              {fontSizeControls.dates}
            </div>
          )}
          {fontSizeControls.description && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.description')}</span>
              {fontSizeControls.description}
            </div>
          )}
        </div>
      ) : null}

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          {t('form.empty.projects')}
        </p>
      ) : (
        fields.map((item, index) => {
          const projectRoleRegister = register(`projects.${index}.role`);
          const techStackRegister = register(`projects.${index}.techStack`);

          return (
          <div key={item.id} className="mb-4 rounded-xl border border-gray-300/80 dark:border-gray-600 bg-white/40 dark:bg-gray-900/30 p-3 shadow-sm">
            <div className="mb-2 flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Project #{index + 1}
              </p>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 py-1 px-2 rounded transition-colors text-sm"
                aria-label="Remove project"
              >
                ❌
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                placeholder={t('form.fields.projectName')}
                {...register(`projects.${index}.name`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
              <input
                type="text"
                placeholder={`${t('form.fields.projectLink')} (optional)`}
                {...register(`projects.${index}.link`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <AutocompleteInput
                name={`projects.${index}.role`}
                registerReturn={projectRoleRegister}
                setValue={setValue}
                suggestions={roleSuggestions}
                onInputChange={onRoleInputChange}
                placeholder={`${t('form.fields.rolePosition')} (optional)`}
              />
              <AutocompleteInput
                name={`projects.${index}.techStack`}
                registerReturn={techStackRegister}
                setValue={setValue}
                suggestions={techStackSuggestions}
                onInputChange={onTechStackInputChange}
                placeholder={`${t('form.fields.techStack')} (optional)`}
                buildSelectedValue={buildTechStackValue}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                placeholder={t('form.fields.start')}
                {...register(`projects.${index}.startDate`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
              <input
                type="text"
                placeholder={t('form.fields.end')}
                {...register(`projects.${index}.endDate`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
            </div>
            <textarea
              rows={3}
              placeholder={t('form.placeholders.projectDescription')}
              {...register(`projects.${index}.description`)}
              className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 w-full text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            />
          </div>
          );
        })
      )}
    </div>
  );
}

/**
 * Dynamic language field list with add/remove controls
 */
export function FormLanguages({
  fields,
  register,
  setValue = null,
  remove,
  append,
  fontSizeControls = {},
  sectionToggle = null,
  sectionToggleId = null,
  languageSuggestions = [],
  onLanguageInputChange = null,
}) {
  const { t } = useTranslation();
  const hasFontControls = Boolean(fontSizeControls.name || fontSizeControls.level);
  const [showFontControls, setShowFontControls] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        {sectionToggle ? (
          <div className="inline-flex items-center gap-2">
            {sectionToggleId ? (
              <label htmlFor={sectionToggleId} className="text-lg font-semibold text-gray-900 dark:text-gray-100 cursor-pointer">{t('form.sections.languages')}</label>
            ) : (
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('form.sections.languages')}</span>
            )}
            {sectionToggle}
          </div>
        ) : (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('form.sections.languages')}</h3>
        )}
        <div className="flex items-center gap-2">
          {hasFontControls ? (
            <button
              type="button"
              onClick={() => setShowFontControls((prev) => !prev)}
              className="rounded border border-gray-300 dark:border-gray-600 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {showFontControls ? 'Hide sizes' : 'Edit sizes'}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => append({ name: '', level: '', cefr: '' })}
            className="text-sm py-1 px-3 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors font-medium"
            aria-label="Add language"
          >
            ➕ {t('form.actions.addLanguage')}
          </button>
        </div>
      </div>

      {hasFontControls && showFontControls ? (
        <div className="mb-3 flex flex-wrap gap-3 items-center rounded border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 p-2">
          {fontSizeControls.name && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.language')}</span>
              {fontSizeControls.name}
            </div>
          )}
          {fontSizeControls.level && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.level')}</span>
              {fontSizeControls.level}
            </div>
          )}
        </div>
      ) : null}

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">{t('form.empty.languages')}</p>
      ) : (
        fields.map((item, index) => {
          const languageRegister = register(`languages.${index}.name`);

          return (
          <div key={item.id} className="mb-4 rounded-xl border border-gray-300/80 dark:border-gray-600 bg-white/40 dark:bg-gray-900/30 p-3 shadow-sm">
            <div className="mb-2 flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Language #{index + 1}
              </p>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 py-1 px-2 rounded transition-colors text-sm"
                aria-label="Remove language"
              >
                ❌
              </button>
            </div>

            <div className="flex gap-2 items-center">
              <AutocompleteInput
                name={`languages.${index}.name`}
                registerReturn={languageRegister}
                setValue={setValue}
                suggestions={languageSuggestions}
                onInputChange={onLanguageInputChange}
                placeholder={t('form.fields.language')}
                className="flex-1"
              />
              <input
                type="text"
                placeholder={t('form.fields.level')}
                {...register(`languages.${index}.level`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded w-40"
              />
              <select
                {...register(`languages.${index}.cefr`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 px-2 h-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 rounded w-24"
              >
                <option value="" className="text-gray-500">CEFR</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </div>
          </div>
          );
        })
      )}
    </div>
  );
}

/**
 * Dynamic certifications field list with add/remove controls
 */
export function FormCertifications({
  fields,
  register,
  setValue = null,
  remove,
  append,
  fontSizeControls = {},
  sectionToggle = null,
  sectionToggleId = null,
  issuerSuggestions = [],
  onIssuerInputChange = null,
}) {
  const { t } = useTranslation();
  const hasFontControls = Boolean(fontSizeControls.name || fontSizeControls.issuer || fontSizeControls.year);
  const [showFontControls, setShowFontControls] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        {sectionToggle ? (
          <div className="inline-flex items-center gap-2">
            {sectionToggleId ? (
              <label htmlFor={sectionToggleId} className="text-lg font-semibold text-gray-900 dark:text-gray-100 cursor-pointer">{t('form.sections.certifications')}</label>
            ) : (
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('form.sections.certifications')}</span>
            )}
            {sectionToggle}
          </div>
        ) : (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('form.sections.certifications')}</h3>
        )}
        <div className="flex items-center gap-2">
          {hasFontControls ? (
            <button
              type="button"
              onClick={() => setShowFontControls((prev) => !prev)}
              className="rounded border border-gray-300 dark:border-gray-600 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {showFontControls ? 'Hide sizes' : 'Edit sizes'}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => append({ name: '', issuer: '', year: '', url: '', expirationDate: '' })}
            className="text-sm py-1 px-3 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors font-medium"
            aria-label="Add certification"
          >
            ➕ {t('form.actions.addCertification')}
          </button>
        </div>
      </div>

      {hasFontControls && showFontControls ? (
        <div className="mb-3 flex flex-wrap gap-3 items-center rounded border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 p-2">
          {fontSizeControls.name && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.sections.certifications')}</span>
              {fontSizeControls.name}
            </div>
          )}
          {fontSizeControls.issuer && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.issuer')}</span>
              {fontSizeControls.issuer}
            </div>
          )}
          {fontSizeControls.year && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.year')}</span>
              {fontSizeControls.year}
            </div>
          )}
        </div>
      ) : null}

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">{t('form.empty.certifications')}</p>
      ) : (
        fields.map((item, index) => {
          const issuerRegister = register(`certifications.${index}.issuer`);

          return (
          <div key={item.id} className="mb-4 rounded-xl border border-gray-300/80 dark:border-gray-600 bg-white/40 dark:bg-gray-900/30 p-3 shadow-sm">
            <div className="mb-2 flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Certification #{index + 1}
              </p>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 py-1 px-2 rounded transition-colors text-sm"
                aria-label="Remove certification"
              >
                ❌
              </button>
            </div>

            <div className="grid grid-cols-[1fr_1fr_110px] gap-2 items-center">
              <input
                type="text"
                placeholder={t('form.sections.certifications')}
                {...register(`certifications.${index}.name`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
              <AutocompleteInput
                name={`certifications.${index}.issuer`}
                registerReturn={issuerRegister}
                setValue={setValue}
                suggestions={issuerSuggestions}
                onInputChange={onIssuerInputChange}
                placeholder={t('form.fields.issuer')}
              />
              <input
                type="text"
                placeholder={t('form.fields.year')}
                {...register(`certifications.${index}.year`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input
                type="text"
                placeholder={t('form.fields.certificateUrl')}
                {...register(`certifications.${index}.url`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
              <input
                type="text"
                placeholder={t('form.fields.expirationDate')}
                {...register(`certifications.${index}.expirationDate`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
            </div>
          </div>
          );
        })
      )}
    </div>
  );
}

export function FormReferences({ fields, register, remove, append, fontSizeControls = {}, sectionToggle = null, sectionToggleId = null }) {
  const { t } = useTranslation();
  const hasFontControls = Boolean(fontSizeControls.references);
  const [showFontControls, setShowFontControls] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        {sectionToggle ? (
          <div className="inline-flex items-center gap-2">
            {sectionToggleId ? (
              <label htmlFor={sectionToggleId} className="text-lg font-semibold text-gray-900 dark:text-gray-100 cursor-pointer">{t('template.references')}</label>
            ) : (
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('template.references')}</span>
            )}
            {sectionToggle}
          </div>
        ) : (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('template.references')}</h3>
        )}
        <div className="flex items-center gap-2">
          {hasFontControls ? (
            <button
              type="button"
              onClick={() => setShowFontControls((prev) => !prev)}
              className="rounded border border-gray-300 dark:border-gray-600 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {showFontControls ? 'Hide sizes' : 'Edit sizes'}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => append({ name: '', title: '', company: '', contact: '' })}
            className="text-sm py-1 px-3 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors font-medium"
          >
            ➕ {t('form.actions.addReference')}
          </button>
        </div>
      </div>

      {hasFontControls && showFontControls ? (
        <div className="mb-3 flex flex-wrap gap-3 items-center rounded border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 p-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">{t('template.references')}</span>
            {fontSizeControls.references}
          </div>
        </div>
      ) : null}

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">{t('form.empty.references')}</p>
      ) : (
        fields.map((item, index) => (
          <div key={item.id} className="mb-4 rounded-xl border border-gray-300/80 dark:border-gray-600 bg-white/40 dark:bg-gray-900/30 p-3 shadow-sm">
            <div className="mb-2 flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Reference #{index + 1}
              </p>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 py-1 px-2 rounded transition-colors text-sm"
                aria-label="Remove reference"
              >
                ❌
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder={t('form.labels.fullName')}
                {...register(`referenceEntries.${index}.name`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
              <input
                type="text"
                placeholder={t('form.fields.rolePosition')}
                {...register(`referenceEntries.${index}.title`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder={t('form.fields.company')}
                {...register(`referenceEntries.${index}.company`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
              <input
                type="text"
                placeholder={t('form.fields.contactInfo')}
                {...register(`referenceEntries.${index}.contact`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export function FormCustomSections({ fields, register, remove, append, fontSizeControls = {}, sectionToggle = null, sectionToggleId = null }) {
  const { t } = useTranslation();
  const hasFontControls = Boolean(fontSizeControls.title || fontSizeControls.content);
  const [showFontControls, setShowFontControls] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        {sectionToggle ? (
          <div className="inline-flex items-center gap-2">
            {sectionToggleId ? (
              <label htmlFor={sectionToggleId} className="text-lg font-semibold text-gray-900 dark:text-gray-100 cursor-pointer">{t('form.sections.customSections')}</label>
            ) : (
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('form.sections.customSections')}</span>
            )}
            {sectionToggle}
          </div>
        ) : (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('form.sections.customSections')}</h3>
        )}
        <div className="flex items-center gap-2">
          {hasFontControls ? (
            <button
              type="button"
              onClick={() => setShowFontControls((prev) => !prev)}
              className="rounded border border-gray-300 dark:border-gray-600 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {showFontControls ? 'Hide sizes' : 'Edit sizes'}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => append({ title: '', content: '' })}
            className="text-sm py-1 px-3 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors font-medium"
          >
            ➕ {t('form.actions.addCustomSection')}
          </button>
        </div>
      </div>

      {hasFontControls && showFontControls ? (
        <div className="mb-3 flex flex-wrap gap-3 items-center rounded border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 p-2">
          {fontSizeControls.title ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.sectionTitle')}</span>
              {fontSizeControls.title}
            </div>
          ) : null}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.sectionContent')}</span>
            {fontSizeControls.content}
          </div>
        </div>
      ) : null}

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">{t('form.empty.customSections')}</p>
      ) : (
        fields.map((item, index) => (
          <div key={item.id} className="mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded">
            <div className="mb-2 flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Custom Section #{index + 1}
              </p>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 py-1 px-2 rounded transition-colors text-sm"
              >
                ❌
              </button>
            </div>

            <input
              type="text"
              placeholder={t('form.fields.sectionTitle')}
              {...register(`customSections.${index}.title`)}
              className="mb-2 border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 w-full h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            />
            <textarea
              rows={3}
              placeholder={t('form.fields.sectionContent')}
              {...register(`customSections.${index}.content`)}
              className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 w-full text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            />
          </div>
        ))
      )}
    </div>
  );
}