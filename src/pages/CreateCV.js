import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useForm, useFieldArray } from 'react-hook-form';
import clsx from 'clsx';
import {
  TextInput,
  TwoColumnTextInput,
  TextAreaInput,
  FormSkills,
  FormEducation,
} from '../components/FormInput';
import { templates } from '../templates/resumeTemplates';
import FirstTemplate from '../templates/component/firstTemplate';

/**
 * CreateCV page component - Main page for creating and editing resumes with live preview
 */
export default function CreateCV() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    defaultValues: {
      name: '',
      headline: '',
      email: '',
      phone: '',
      website: '',
      location: '',
      summary: '',
      skills: [{ name: '', description: '', level: 50 }],
      education: [{ school: '', degree: '', year: '' }],
    },
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

  const formData = watch();
  const [selectedTemplate, setSelectedTemplate] = useState('Template_1');
  const [fieldFontSizes, setFieldFontSizes] = useState({
    name: 'text-2xl',
    headline: 'text-sm',
    email: 'text-sm',
    phone: 'text-sm',
    website: 'text-sm',
    location: 'text-sm',
    summary: 'text-sm',
  });

  const componentRef = useRef();

  /**
   * Handles PDF download by converting the resume preview to PDF
   */
  const handleDownloadPDF = () => {
    const input = componentRef.current;
    if (!input) return;

    html2pdf()
      .set({
        margin: [4, 0, 14, 0],
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] },
      })
      .from(input)
      .save();
  };

  /**
   * Handles form submission and logs the resume data
   */
  const onSubmit = (data) => {
    console.log('Submitted Resume Data', data);
  };

  /**
   * Font size selector dropdown for compact display (small select)
   */
  const FontSizeSelector = ({ fieldKey, label, compact = false }) => (
    <div className={compact ? 'w-6' : 'mb-2'}>
      {!compact && (
        <label className="text-sm">{label} Font Size</label>
      )}
      <select
        className={clsx(
          'w-full h-7 rounded',
          'bg-white dark:bg-gray-900',
          'text-black dark:text-white',
          'text-center text-xs',
          'cursor-pointer px-1',
          'border dark:border-gray-700',
          'focus:outline-none focus:ring-2 focus:ring-blue-600'
        )}
        value={fieldFontSizes[fieldKey]}
        onChange={(e) =>
          setFieldFontSizes((prev) => ({ ...prev, [fieldKey]: e.target.value }))
        }
      >
        <option value="text-xs">XS</option>
        <option value="text-sm">S</option>
        <option value="text-base">M</option>
        <option value="text-lg">L</option>
      </select>
    </div>
  );

  /**
   * Font size selector dropdown for larger display (large select)
   */
  const FontSizeSelectorBig = ({ fieldKey, label, compact = false }) => (
    <div className={compact ? 'w-6' : 'mb-2'}>
      {!compact && (
        <label className="text-sm">{label} Font Size</label>
      )}
      <select
        className={clsx(
          'w-full h-10 rounded',
          'bg-white dark:bg-gray-900',
          'text-black dark:text-white',
          'text-center text-sm',
          'cursor-pointer px-2',
          'border dark:border-gray-700',
          'focus:outline-none focus:ring-2 focus:ring-blue-600'
        )}
        value={fieldFontSizes[fieldKey]}
        onChange={(e) =>
          setFieldFontSizes((prev) => ({ ...prev, [fieldKey]: e.target.value }))
        }
      >
        <option value="text-xs">XS</option>
        <option value="text-sm">S</option>
        <option value="text-base">M</option>
        <option value="text-lg">L</option>
        <option value="text-xl">XL</option>
        <option value="text-2xl">XXL</option>
      </select>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Main Layout Container - Three Column Layout */}
      <div className={clsx('flex w-full min-h-0')}>

        {/* ===== LEFT PANEL: FORM INPUTS ===== */}
        <div
          className={clsx(
            'w-2/5',
            'bg-gray-200 dark:bg-gray-800',
            'p-6 overflow-y-auto'
          )}
        >
          <h2 className="text-xl font-bold mb-6">Resume Information</h2>

          {/* Personal Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

            <TextInput
              label="Full Name"
              error={errors.name?.message}
              registerProps={register('name', {
                required: 'Name is required',
              })}
              fontSizeDropdown={
                <FontSizeSelectorBig fieldKey="name" compact />
              }
            />

            <TextInput
              label="Professional Headline"
              error={errors.headline?.message}
              registerProps={register('headline')}
              fontSizeDropdown={
                <FontSizeSelector fieldKey="headline" compact />
              }
            />

            <TwoColumnTextInput
              label1="Email"
              label2="Phone"
              error1={errors.email?.message}
              error2={errors.phone?.message}
              registerProps1={register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
                },
              })}
              registerProps2={register('phone')}
              fontSizeDropdown1={
                <FontSizeSelector fieldKey="email" compact />
              }
              fontSizeDropdown2={
                <FontSizeSelector fieldKey="phone" compact />
              }
            />

            <TwoColumnTextInput
              label1="Website"
              label2="Location"
              error1={errors.website?.message}
              error2={errors.location?.message}
              registerProps1={register('website')}
              registerProps2={register('location')}
              fontSizeDropdown1={
                <FontSizeSelector fieldKey="website" compact />
              }
              fontSizeDropdown2={
                <FontSizeSelector fieldKey="location" compact />
              }
            />
          </div>

          {/* Professional Summary Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Professional Summary</h3>
            <TextAreaInput
              label="Summary"
              error={errors.summary?.message}
              registerProps={register('summary')}
              fontSizeDropdown={
                <FontSizeSelector fieldKey="summary" compact />
              }
            />
          </div>

          {/* Skills Section */}
          <FormSkills
            fields={skillFields}
            register={register}
            errors={errors}
            remove={removeSkill}
            append={appendSkill}
          />

          {/* Education Section */}
          <FormEducation
            fields={educationFields}
            register={register}
            errors={errors}
            remove={removeEducation}
            append={appendEducation}
          />

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
            💾 Save Resume
          </button>
        </div>
        <div
          className={clsx(
            'w-2/5',
            'flex justify-center items-start',
            'px-4 py-6',
            'bg-white dark:bg-gray-900',  // ← CHANGE THIS
            'text-black dark:text-white',
            'overflow-y-auto'
          )}
        >
          {/* ... */}
        </div>

        // TO:
        <div
          className={clsx(
            'w-2/5',
            'flex justify-center items-start',
            'px-4 py-6',
            'bg-gray-50 dark:bg-gray-900',  // ← FIXED
            'text-black dark:text-white',
            'overflow-y-auto'
          )}
        >
          {/* ... */}
        </div>

        {/* ===== RIGHT PANEL: TEMPLATE & DOWNLOAD ===== */}
        <div
          className={clsx(
            'w-1/5',
            'bg-gray-200 dark:bg-gray-800',
            'p-6 overflow-y-auto'
          )}
        >
          <h3 className="text-lg font-semibold mb-4">Templates</h3>

          {/* Template Buttons Grid */}
          <div className="grid gap-4 mt-4">
            {Object.entries(templates).map(([key, name]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedTemplate(key)}
                className={clsx(
                  'p-3 rounded',
                  'text-sm font-medium',
                  'transition-colors',
                  selectedTemplate === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600'
                )}
              >
                {name}
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
            📥 Download PDF
          </button>
        </div>
      </div>
    </form>
  );
}