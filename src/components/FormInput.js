import clsx from 'clsx';

/**
 * Single text input field with label, error handling, and optional font size dropdown
 */
export function TextInput({
  label,
  error,
  registerProps,
  fontSize = 'text-base',
  fontSizeDropdown = null,
  className = '',
}) {
  return (
    <div className="mb-4">
      <label className="text-sm">{label}</label>
      <div className="flex items-center gap-1">
        <input
          {...registerProps}
          className={clsx(
            'border dark:border-gray-700',
            'dark:bg-gray-900 bg-white',
            'p-2 w-full h-7',
            'focus:outline-none focus:ring-2 focus:ring-blue-600',
            'rounded',
            className
          )}
        />
        {fontSizeDropdown}
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
  className = '',
}) {
  return (
    <div className="mb-4 flex gap-4">
      <div className="w-1/2">
        <label className="text-sm">{label1}</label>
        <div className="flex items-center gap-1">
          <input
            {...registerProps1}
            className={clsx(
              'border dark:border-gray-700',
              'dark:bg-gray-900 bg-white',
              'p-2 w-full h-7 flex-1',
              'focus:outline-none focus:ring-2 focus:ring-blue-600',
              'rounded',
              className
            )}
          />
          {fontSizeDropdown1}
        </div>
        {error1 && (
          <span className="text-red-500 text-sm">
            {error1}
          </span>
        )}
      </div>

      <div className="w-1/2">
        <label className="text-sm">{label2}</label>
        <div className="flex items-center gap-1">
          <input
            {...registerProps2}
            className={clsx(
              'border dark:border-gray-700',
              'dark:bg-gray-900 bg-white',
              'p-2 w-full h-7 flex-1',
              'focus:outline-none focus:ring-2 focus:ring-blue-600',
              'rounded',
              className
            )}
          />
          {fontSizeDropdown2}
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
  className = '',
}) {
  return (
    <div className="mb-4">
      <label className="text-sm">{label}</label>
      <div className="flex items-center gap-1">
        <textarea
          {...registerProps}
          className={clsx(
            'border dark:border-gray-700',
            'dark:bg-gray-900 bg-white',
            'p-2 w-full h-auto',
            'text-sm resize-none',
            'focus:outline-none focus:ring-2 focus:ring-blue-600',
            'rounded',
            className
          )}
          rows={7}
        />
        {fontSizeDropdown}
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
export function FormSkills({ fields, register, errors, remove, append }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Skills</h3>
        <button
          type="button"
          onClick={() => append({ name: '', description: '', level: 50 })}
          className={clsx(
            'text-sm py-1 px-3',
            'hover:bg-gray-200 dark:hover:bg-gray-700',
            'rounded transition-colors',
            'font-medium'
          )}
          aria-label="Add skill"
        >
          ➕ Add Skill
        </button>
      </div>

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          No skills added yet
        </p>
      ) : (
        fields.map((item, index) => (
          <div key={item.id} className="mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded">
            <div className="flex gap-2 items-end">
              {/* Skill Name */}
              <div className="flex-1">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., React, JavaScript"
                  {...register(`skills.${index}.name`, {
                    required: 'Skill name is required',
                  })}
                  className={clsx(
                    'border dark:border-gray-700',
                    'dark:bg-gray-900 bg-white',
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
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g., 3 years experience"
                  {...register(`skills.${index}.description`)}
                  className={clsx(
                    'border dark:border-gray-700',
                    'dark:bg-gray-900 bg-white',
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
                  Level
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  {...register(`skills.${index}.level`)}
                  className="w-full cursor-pointer"
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
export function FormEducation({ fields, register, errors, remove, append }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Education</h3>
        <button
          type="button"
          onClick={() => append({ school: '', degree: '', year: '' })}
          className={clsx(
            'text-sm py-1 px-3',
            'hover:bg-gray-200 dark:hover:bg-gray-700',
            'rounded transition-colors',
            'font-medium'
          )}
          aria-label="Add education"
        >
          ➕ Add Education
        </button>
      </div>

      {fields.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          No education added yet
        </p>
      ) : (
        fields.map((item, index) => (
          <div key={item.id} className="mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded">
            <div className="flex gap-2 items-end">
              {/* School */}
              <div className="flex-1">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                  School/University
                </label>
                <input
                  type="text"
                  placeholder="e.g., MIT, Stanford University"
                  {...register(`education.${index}.school`, {
                    required: 'School is required',
                  })}
                  className={clsx(
                    'border dark:border-gray-700',
                    'dark:bg-gray-900 bg-white',
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
                  Degree
                </label>
                <input
                  type="text"
                  placeholder="e.g., B.S. Computer Science"
                  {...register(`education.${index}.degree`, {
                    required: 'Degree is required',
                  })}
                  className={clsx(
                    'border dark:border-gray-700',
                    'dark:bg-gray-900 bg-white',
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
                  Year
                </label>
                <input
                  type="text"
                  placeholder="e.g., 2020"
                  {...register(`education.${index}.year`, {
                    required: 'Year is required',
                  })}
                  className={clsx(
                    'border dark:border-gray-700',
                    'dark:bg-gray-900 bg-white',
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
                aria-label="Remove education"
              >
                ❌
              </button>
            </div>

            {/* Error Messages */}
            {errors?.education?.[index]?.school && (
              <span className="text-red-500 text-xs mt-2 block">
                {errors.education[index].school.message}
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}