import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { useForm, useFieldArray } from "react-hook-form";
import { FormInput, FormInput2, FormP, FormSkills, FormEducation } from "../components/FormInput";
import { templates } from "../templates/resumeTemplates";
import FirstTemplate from "../templates/component/FirstTemplate";
import "../styles/createCV.css";

function CreateCV() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    defaultValues: {
      skills: [{ name: "", description: "", level: 5 }],
      education: [{ school: "", degree: "", year: "" }],
    },
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: "skills" });
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({ control, name: "education" });

  const formData = watch();
  const [selectedTemplate, setSelectedTemplate] = useState("Template_1");
  const [fieldFontSizes, setFieldFontSizes] = useState({
    name: "text-2xl",
    headline: "text-sm",
    email: "text-sm",
    phone: "text-sm",
    website: "text-sm",
    location: "text-sm",
    summary: "text-sm",
  });

  const componentRef = useRef();

  const handleDownloadPDF = () => {
    const input = componentRef.current;
    if (!input) return;

    html2pdf()
      .set({
        margin: [4, 0, 14, 0],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      })
      .from(input)
      .save();
  };

  const onSubmit = (data) => {
    console.log("Submitted Resume Data", data);
  };

  const FontSizeSelector = ({ fieldKey, label, compact = false }) => (
    <div className={compact ? "w-6" : "mb-2"}>
      {!compact && <label className="label-title">{label} Font Size</label>}
      <select
        className={`${
          compact
            ? "w-full h-7 bg-white dark:bg-gray-900 text-black dark:text-white text-center text-xs rounded appearance-none cursor-pointer px-1"
            : "input-field"
        }`}
        value={fieldFontSizes[fieldKey]}
        onChange={(e) => setFieldFontSizes(prev => ({ ...prev, [fieldKey]: e.target.value }))}
      >
        <option value="text-xs">XS</option>
        <option value="text-sm">S</option>
        <option value="text-base">M</option>
        <option value="text-lg">L</option>
      </select>
    </div>
  );

  const FontSizeSelectorBig = ({ fieldKey, label, compact = false }) => (
    <div className={compact ? "w-6" : "mb-2"}>
      {!compact && <label className="label-title">{label} Font Size</label>}
      <select
        className={`${
          compact
            ? "w-full h-7 bg-white dark:bg-gray-900 text-black dark:text-white text-center text-xs rounded appearance-none cursor-pointer px-1"
            : "input-field"
        }`}
        value={fieldFontSizes[fieldKey]}
        onChange={(e) => setFieldFontSizes(prev => ({ ...prev, [fieldKey]: e.target.value }))}
      >
        <option value="text-lg">L</option>
        <option value="text-xl">XL</option>
        <option value="text-2xl">2XL</option>
        <option value="text-3xl">3XL</option>
      </select>
    </div>
  );

  return (
    <div className="cv-layout">
      <div className="cv-form-panel">
        <h2 className="cv-section-title">Basics</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form Fields */}
          <FormInput label="Full Name" error={errors.name?.message} registerProps={register("name", { required: "Name is required" })} fontSize={fieldFontSizes.headline} fontSizeDropdown={<FontSizeSelectorBig fieldKey="name" compact />} />
          <FormInput label="Headline" error={errors.headline?.message} registerProps={register("headline", { required: "Headline is required" })} fontSize={fieldFontSizes.headline} fontSizeDropdown={<FontSizeSelector fieldKey="headline" compact />} />
          <FormInput2 label1="Email" label2="Website" error1={errors.email?.message} error2={errors.website?.message} registerProps1={register("email", { required: "Email is required" })} registerProps2={register("website", { required: "Website is required" })} fontSize1={fieldFontSizes.email} fontSize2={fieldFontSizes.website} fontSizeDropdown1={<FontSizeSelector fieldKey="email" compact />} fontSizeDropdown2={<FontSizeSelector fieldKey="website" compact />} />
          <FormInput2 label1="Phone" label2="Location" error1={errors.phone?.message} error2={errors.location?.message} registerProps1={register("phone", { required: "Phone is required" })} registerProps2={register("location", { required: "Location is required" })} fontSize1={fieldFontSizes.phone} fontSize2={fieldFontSizes.location} fontSizeDropdown1={<FontSizeSelector fieldKey="phone" compact />} fontSizeDropdown2={<FontSizeSelector fieldKey="location" compact />} />
          <FormP label="Summary" error={errors.summary?.message} registerProps={register("summary", { required: "Summary is required" })} fontSize={fieldFontSizes.summary} fontSizeDropdown={<FontSizeSelector fieldKey="summary" compact />} />
          <FormSkills fields={skillFields} register={register} errors={errors} append={appendSkill} remove={removeSkill} />
          <FormEducation fields={educationFields} register={register} errors={errors} append={appendEducation} remove={removeEducation} />
          <div className="mt-6 flex justify-end">
            <button type="submit" className="cv-submit-button bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Submit Resume</button>
          </div>
          <button type="button" onClick={handleDownloadPDF} className="btn-primary mt-4">Download as PDF</button>
        </form>
      </div>

      <div className="cv-preview-panel">
        {selectedTemplate === "Template_1" && (
          <div ref={componentRef} className="w-[794px] mx-auto">
            <div className=" w-[794px] min-h-[1123px]  mx-auto p-6 overflow-hidden break-after-page">
              <FirstTemplate data={formData} fontSizes={fieldFontSizes} />
            </div>
            {/* Optionally: add another .a4-page with overflow content */}
          </div>
        )}
      </div>

      <div className="cv-template-panel">
        <h2 className="cv-section-title">Templates</h2>
        <div className="cv-template-box space-y-2">
          {Object.keys(templates).map((key) => (
            <div key={key} onClick={() => setSelectedTemplate(key)} className={`cursor-pointer p-3 rounded border text-center text-sm bg-white dark:bg-gray-700 hover:shadow-md ${selectedTemplate === key ? "border-blue-500" : "border-gray-400"}`}>
              {key.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateCV;
