import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

/**
 * Single text input field with label, error handling, and optional font size dropdown
 */
export function TextInput({
  label,
  error,
  registerProps,
  fontSize = 'text-base',
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
 * Two side-by-side text input fields with labels, error handling, and optional font size dropdowns
 */
export function TwoColumnTextInput({
  label1,
  label2,
  error1,
  error2,
  registerProps1,
  registerProps2,
  fontSize1 = 'text-base',
  fontSize2 = 'text-base',
  fontSizeDropdown1 = null,
  fontSizeDropdown2 = null,
  labelSuffix1 = null,
  labelSuffix2 = null,
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
  fontSize = 'text-base',
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
export function FormSkills({ fields, register, errors, remove, append, fontSizeControls = {}, sectionToggle = null, sectionToggleId = null }) {
  const { t } = useTranslation();

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

      {(fontSizeControls.name || fontSizeControls.description) && (
        <div className="mb-3 flex flex-wrap gap-3 items-center">
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
      )}

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          {t('form.empty.skills')}
        </p>
      ) : (
        fields.map((item, index) => (
          <div key={item.id} className="mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded">
            <div className="flex gap-2 items-end">
              {/* Skill Name */}
              <div className="flex-1">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                  {t('form.fields.skillName')}
                </label>
                <input
                  type="text"
                  placeholder={t('form.placeholders.skillName')}
                  {...register(`skills.${index}.name`, {
                    required: t('form.errors.skillNameRequired'),
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

              {/* Description */}
              <div className="flex-1">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                  {t('form.fields.description')}
                </label>
                <input
                  type="text"
                  placeholder={t('form.placeholders.skillDescription')}
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
              <div className="flex-shrink-0 w-20">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                  {t('form.fields.level')}
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  {...register(`skills.${index}.level`)}
                  className="w-full cursor-pointer accent-blue-600"
                />
              </div>

              {/* Category */}
              <div className="flex-shrink-0 w-28">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                  {t('form.fields.category')}
                </label>
                <input
                  type="text"
                  placeholder={t('form.placeholders.category')}
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
              </div>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => remove(index)}
                className={clsx(
                  'text-red-500 hover:text-red-700',
                  'py-1 px-2 rounded',
                  'transition-colors',
                  'h-8 flex items-center',
                  'mb-1'
                )}
                aria-label="Remove skill"
              >
                ❌
              </button>
            </div>

            {/* Error Message */}
            {errors?.skills?.[index]?.name && (
              <span className="text-red-500 text-xs mt-2 block">
                {errors.skills[index].name.message}
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}

/**
 * Dynamic education field list with add/remove buttons, supports school, degree, and graduation year
 */
export function FormEducation({ fields, register, errors, remove, append, fontSizeControls = {}, sectionToggle = null, sectionToggleId = null }) {
  const { t } = useTranslation();

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

      {(fontSizeControls.school || fontSizeControls.degree || fontSizeControls.year) && (
        <div className="mb-3 flex flex-wrap gap-3 items-center">
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
      )}

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          {t('form.empty.education')}
        </p>
      ) : (
        fields.map((item, index) => (
          <div key={item.id} className="mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded">
            <div className="grid grid-cols-2 gap-2 items-end">
              {/* School */}
              <div className="flex-1">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                  {t('form.fields.schoolUniversity')}
                </label>
                <input
                  type="text"
                  placeholder={t('form.placeholders.school')}
                  {...register(`education.${index}.school`, {
                    required: t('form.errors.schoolRequired'),
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

              {/* Degree */}
              <div className="flex-1">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                  {t('form.fields.degree')}
                </label>
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

              {/* Year */}
              <div className="flex-shrink-0 w-24">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                  {t('form.fields.year')}
                </label>
                <input
                  type="text"
                  placeholder={t('form.placeholders.year')}
                  {...register(`education.${index}.year`, {
                    required: t('form.errors.yearRequired'),
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

              <div>
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                  {t('form.labels.location')}
                </label>
                <input
                  type="text"
                  placeholder={t('form.labels.location')}
                  {...register(`education.${index}.location`)}
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
              </div>

              <div className="w-24">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">GPA</label>
                <input
                  type="text"
                  placeholder="e.g. 3.8"
                  {...register(`education.${index}.gpa`)}
                  className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
                />
              </div>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => remove(index)}
                className={clsx(
                  'text-red-500 hover:text-red-700',
                  'py-1 px-2 rounded',
                  'transition-colors',
                  'h-8 flex items-center',
                  'mb-1'
                )}
                aria-label="Remove education"
              >
                ❌
              </button>
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
        ))
      )}
    </div>
  );
}

/**
 * Dynamic experience field list with add/remove controls
 */
export function FormExperience({ fields, register, errors, remove, append, fontSizeControls = {}, sectionToggle = null, sectionToggleId = null }) {
  const { t } = useTranslation();

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

      {(fontSizeControls.company || fontSizeControls.role || fontSizeControls.description) && (
        <div className="mb-3 flex flex-wrap gap-3 items-center">
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
      )}

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          {t('form.empty.experience')}
        </p>
      ) : (
        fields.map((item, index) => (
          <div key={item.id} className="mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded">
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
              <input
                type="text"
                placeholder={t('form.fields.company')}
                {...register(`experience.${index}.company`, {
                  required: t('form.errors.companyRequired'),
                })}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
              <input
                type="text"
                placeholder={t('form.fields.rolePosition')}
                {...register(`experience.${index}.role`, {
                  required: t('form.errors.roleRequired'),
                })}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
              <input
                type="text"
                placeholder={t('form.labels.location')}
                {...register(`experience.${index}.location`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
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
        ))
      )}
    </div>
  );
}

/**
 * Dynamic project field list with add/remove controls
 */
export function FormProjects({ fields, register, remove, append, fontSizeControls = {}, sectionToggle = null, sectionToggleId = null }) {
  const { t } = useTranslation();

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

      {(fontSizeControls.name || fontSizeControls.link || fontSizeControls.description) && (
        <div className="mb-3 flex flex-wrap gap-3 items-center">
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
          {fontSizeControls.description && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">{t('form.fields.description')}</span>
              {fontSizeControls.description}
            </div>
          )}
        </div>
      )}

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          {t('form.empty.projects')}
        </p>
      ) : (
        fields.map((item, index) => (
          <div key={item.id} className="mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                placeholder={t('form.fields.projectName')}
                {...register(`projects.${index}.name`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={t('form.fields.projectLink')}
                  {...register(`projects.${index}.link`)}
                  className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded flex-1"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700 px-2"
                  aria-label="Remove project"
                >
                  ❌
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                placeholder={t('form.fields.rolePosition')}
                {...register(`projects.${index}.role`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
              <input
                type="text"
                placeholder={t('form.fields.techStack')}
                {...register(`projects.${index}.techStack`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
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
        ))
      )}
    </div>
  );
}

/**
 * Dynamic language field list with add/remove controls
 */
export function FormLanguages({ fields, register, remove, append, fontSizeControls = {}, sectionToggle = null, sectionToggleId = null }) {
  const { t } = useTranslation();

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
        <button
          type="button"
          onClick={() => append({ name: '', level: '', cefr: '' })}
          className="text-sm py-1 px-3 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors font-medium"
          aria-label="Add language"
        >
          ➕ {t('form.actions.addLanguage')}
        </button>
      </div>

      {(fontSizeControls.name || fontSizeControls.level) && (
        <div className="mb-3 flex flex-wrap gap-3 items-center">
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
      )}

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">{t('form.empty.languages')}</p>
      ) : (
        fields.map((item, index) => (
          <div key={item.id} className="mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder={t('form.fields.language')}
                {...register(`languages.${index}.name`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded flex-1"
              />
              <input
                type="text"
                placeholder={t('form.fields.level')}
                {...register(`languages.${index}.level`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded w-40"
              />
              <select
                {...register(`languages.${index}.cefr`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded w-24"
              >
                <option value="">CEFR</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 px-2"
                aria-label="Remove language"
              >
                ❌
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/**
 * Dynamic certifications field list with add/remove controls
 */
export function FormCertifications({ fields, register, remove, append, fontSizeControls = {}, sectionToggle = null, sectionToggleId = null }) {
  const { t } = useTranslation();

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
        <button
          type="button"
          onClick={() => append({ name: '', issuer: '', year: '', url: '', expirationDate: '' })}
          className="text-sm py-1 px-3 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors font-medium"
          aria-label="Add certification"
        >
          ➕ {t('form.actions.addCertification')}
        </button>
      </div>

      {(fontSizeControls.name || fontSizeControls.issuer || fontSizeControls.year) && (
        <div className="mb-3 flex flex-wrap gap-3 items-center">
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
      )}

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">{t('form.empty.certifications')}</p>
      ) : (
        fields.map((item, index) => (
          <div key={item.id} className="mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded">
            <div className="grid grid-cols-[1fr_1fr_110px_auto] gap-2 items-center">
              <input
                type="text"
                placeholder={t('form.sections.certifications')}
                {...register(`certifications.${index}.name`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
              <input
                type="text"
                placeholder={t('form.fields.issuer')}
                {...register(`certifications.${index}.issuer`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
              <input
                type="text"
                placeholder={t('form.fields.year')}
                {...register(`certifications.${index}.year`)}
                className="border dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-2 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 px-2"
                aria-label="Remove certification"
              >
                ❌
              </button>
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
        ))
      )}
    </div>
  );
}

export function FormReferences({ fields, register, remove, append, sectionToggle = null, sectionToggleId = null }) {
  const { t } = useTranslation();

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
        <button
          type="button"
          onClick={() => append({ name: '', title: '', company: '', contact: '' })}
          className="text-sm py-1 px-3 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors font-medium"
        >
          ➕ {t('form.actions.addReference')}
        </button>
      </div>

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">{t('form.empty.references')}</p>
      ) : (
        fields.map((item, index) => (
          <div key={item.id} className="mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded">
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-2 items-center">
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
              <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700 px-2">❌</button>
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

export function FormCustomSections({ fields, register, remove, append, sectionToggle = null, sectionToggleId = null }) {
  const { t } = useTranslation();

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
        <button
          type="button"
          onClick={() => append({ title: '', content: '' })}
          className="text-sm py-1 px-3 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors font-medium"
        >
          ➕ {t('form.actions.addCustomSection')}
        </button>
      </div>

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">{t('form.empty.customSections')}</p>
      ) : (
        fields.map((item, index) => (
          <div key={item.id} className="mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded">
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
            <button type="button" onClick={() => remove(index)} className="mt-2 text-red-500 hover:text-red-700 text-sm">❌ {t('home.delete')}</button>
          </div>
        ))
      )}
    </div>
  );
}