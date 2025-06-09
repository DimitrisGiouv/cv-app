import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput, FormInput2, FormP } from "../components/FormInput";
import { templates, getTemplateClass } from "../templates/resumeTemplates";
import FirstTemplate from "../templates/component/firstTemplate";

import "../styles/createCV.css";

function CreateCV() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const formData = watch();
  const [selectedTemplate, setSelectedTemplate] = useState("clean");
  const [fieldFontSizes, setFieldFontSizes] = useState({
    name: "text-xl",
    headline: "text-base",
    email: "text-sm",
    phone: "text-sm",
    website: "text-sm",
    location: "text-sm",
    summary: "text-base",
  });

  const onSubmit = (data) => {
    console.log("Submitted Resume Data", data);
  };

  return (
    <div className="cv-layout">
      <div className="cv-form-panel">
        <h2 className="cv-section-title">Basics</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Full Name"
            error={errors.name?.message}
            registerProps={register("name", { required: "Name is required" })}
          />
          
          <FontSizeSelector fieldKey="name" label="Name" />
          
          <FormInput
            label="Headline"
            error={errors.headline?.message}
            registerProps={register("headline", { required: "Headline is required" })}
          />
           <FontSizeSelector fieldKey="email" label="Email" />

          <FormInput2
            label1="Email"
            label2="Website"
            error1={errors.email?.message}
            error2={errors.website?.message}
            registerProps1={register("email", { required: "Email is required" })}
            registerProps2={register("website", { required: "Website is required" })}
          />

          <FormInput2
            label1="Phone"
            label2="Location"
            error1={errors.phone?.message}
            error2={errors.location?.message}
            registerProps1={register("phone", { required: "Phone is required" })}
            registerProps2={register("location", { required: "Location is required" })}
          />

          <FormP
            label="Summary"
            error={errors.summary?.message}
            registerProps={register("summary", { required: "Summary is required" })}
          />
        </form>
      </div>

      <div className="cv-preview-panel">
          {selectedTemplate === "Template_1" ? ( <FirstTemplate data={formData} fontSizes={fieldFontSizes}/> ) : (
            <div className={`cv-preview-box ${getTemplateClass(selectedTemplate)}`}>
            </div>
          )}
      </div>  

      <div className="cv-template-panel">
        <h2 className="cv-section-title">Templates</h2>
        <div className="cv-template-box space-y-2">
          {Object.keys(templates).map((key) => (
            <div
              key={key}
              onClick={() => setSelectedTemplate(key)}
              className={`cursor-pointer p-3 rounded border text-center text-sm bg-white dark:bg-gray-700 hover:shadow-md ${
                selectedTemplate === key ? "border-blue-500" : "border-gray-400"
              }`}
            >
              {key.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateCV;


const FontSizeSelector = ({ fieldKey, label }) => (
  <div className="mb-2">
    <label className="label-title">{label} Font Size</label>
    <select
      className="input-field"
      value={fieldFontSizes[fieldKey]}
      onChange={(e) =>
        setFieldFontSizes((prev) => ({
          ...prev,
          [fieldKey]: e.target.value,
        }))
      }
    >
      <option value="text-sm">Small</option>
      <option value="text-base">Medium</option>
      <option value="text-lg">Large</option>
      <option value="text-xl">Extra Large</option>
    </select>
  </div>
);
