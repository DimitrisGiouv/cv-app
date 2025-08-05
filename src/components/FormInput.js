import "../styles/forms.css";

export function FormRegister({ placeholder, error, registerProps }) {
  return (
    <div className="mb-1">
      <input {...registerProps} placeholder={placeholder} className="input-field-register" />
      {error && <span className="error-register">{error}</span>}
    </div>
  );
}

export function FormInput({ label, error, registerProps, fontSize = "text-base", fontSizeDropdown = null }) {
  return (
    <div className="mb-4">
      <label className="label-title">{label}</label>
      <div className="flex items-center gap-1">
        <input {...registerProps} className="input-field" />
        {fontSizeDropdown}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export function FormInput2({
  label1,
  label2,
  error1,
  error2,
  registerProps1,
  registerProps2,
  fontSize1 = "text-base",
  fontSize2 = "text-base",
  fontSizeDropdown1 = null,
  fontSizeDropdown2 = null
}) {
  return (
    <div className="mb-4 flex gap-4">
      <div className="w-1/2">
        <label className="label-title">{label1}</label>
        <div className="flex items-center gap-1">
          <input {...registerProps1} className="input-field flex-1" />
          {fontSizeDropdown1}
        </div>
        {error1 && <span className="error">{error1}</span>}
      </div>

      <div className="w-1/2">
        <label className="label-title">{label2}</label>
        <div className="flex items-center gap-1">
          <input {...registerProps2} className="input-field flex-1" />
          {fontSizeDropdown2}
        </div>
        {error2 && <span className="error">{error2}</span>}
      </div>
    </div>
  );
}

export function FormP({ label, error, registerProps, fontSize = "text-base", fontSizeDropdown = null }) {
  return (
    <div className="mb-4">
      <label className="label-title">{label}</label>
      <div className="flex items-center gap-1">
        <textarea {...registerProps} className="input-field-p text-sm resize-none" rows={7} />
        {fontSizeDropdown}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export function FormSkills({ fields, register, errors, remove, append }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="cv-section-title">Skills</h2>
        <button
          type="button"
          onClick={() => append({ name: "", description: "", level: 50 })}
          className="text-sm  dark:hover:text-gray-600 light:hover:text-white-500"
        >
          ➕ Add Skill
        </button>
      </div>

      {fields.map((item, index) => (
        <div key={item.id} className="mb-3 flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Skill name"
              {...register(`skills.${index}.name`, { required: "Skill name is required" })}
              className="input-field w-full"
            />
            <input
              type="text"
              placeholder="Description"
              {...register(`skills.${index}.description`, { required: "Description is required" })}
              className="input-field w-full"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-600 hover:text-red-800 text-sm px-2"
              title="Remove skill"
            >
              ✕
            </button>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            {...register(`skills.${index}.level`, {
              valueAsNumber: true,
              required: "Level is required"
            })}
            className="w-full"
          />
          {(errors?.skills?.[index]?.name || errors?.skills?.[index]?.description) && (
            <span className="text-xs text-red-500">
              {errors.skills[index]?.name?.message || errors.skills[index]?.description?.message}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}


export function FormEducation({ fields, register, errors, remove, append }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="cv-section-title">Education</h2>
        <button
          type="button"
          onClick={() => append({ school: "", degree: "", year: "" })}
          className="text-sm  dark:hover:text-gray-600"
        >
          ➕ Add Education
        </button>
      </div>

      {fields.map((item, index) => (
        <div key={item.id} className="mb-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              className="input-field"
              {...register(`education.${index}.school`, { required: "School is required" })}
              placeholder="School / University"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-600 hover:text-red-800 text-sm px-2"
              title="Remove education"
            >
              ✕
            </button>
          </div>
          <input
            className="input-field"
            {...register(`education.${index}.degree`, { required: "Degree is required" })}
            placeholder="Degree"
          />
          <input
            className="input-field"
            {...register(`education.${index}.year`, { required: "Graduation Year is required" })}
            placeholder="Graduation Year"
          />
          {(errors?.education?.[index]?.school || errors?.education?.[index]?.degree || errors?.education?.[index]?.year) && (
            <span className="text-xs text-red-500">
              {errors.education[index]?.school?.message ||
                errors.education[index]?.degree?.message ||
                errors.education[index]?.year?.message}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}


