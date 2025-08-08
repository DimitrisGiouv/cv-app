// FirstTemplate.js
import React, { forwardRef } from "react";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

const FirstTemplate = forwardRef(({ data, fontSizes }, ref) => {
  return (
    <div className="flex h-[1123px] bg-white text-gray-900 break-words w-full ">
      <div className="w-1/3 bg-blue-900 text-white p-6 space-y-6">
        <div className="h-32 w-32 bg-gray-300 rounded-full mx-auto flex items-center justify-center text-sm text-gray-800 bg-opacity-80">
          Photo
        </div>
        <div>
          <h3 className="font-bold border-b text-lg">Contact</h3>
          <ul className="text-sm mt-2 space-y-1">
            <li className="flex items-start gap-2 break-words">
              <Phone size={16} />
              <span className={`${fontSizes.phone} break-words`}>{data.phone || ""}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a href={`mailto:${data.email}`} className={`hover:underline ${fontSizes.email}`}>
                {data.email || ""}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span className={fontSizes.location}>{data.location || ""}</span>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={16} />
              <a
                href={`https://${data.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:underline ${fontSizes.website}`}
              >
                {data.website || ""}
              </a>
            </li>
          </ul>
        </div>

        <div>
          {data.skills?.length > 0 && (
            <div className="mt-4">
              <h2 className="text-base font-bold border-b mb-2 pb-1">Skills</h2>
              {data.skills.map((skill, index) => (
                <div key={index} className="mb-2">
                  <p className="text-sm font-semibold">
                    {skill.name}
                    {skill.description && (
                      <span className="text-xs font-normal text-gray-400"> {skill.description}</span>
                    )}
                  </p>
                  <div className="w-full bg-gray-200 rounded h-2 mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {data.education?.length > 0 && (
            <div className="mt-4">
              <h2 className="text-base font-bold border-b mb-2 pb-1">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <p className="text-sm font-semibold">{edu.school}</p>
                  <p className="text-xs text-gray-500">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.year}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-2/3 p-6 space-y-6">
        <div>
          <h1 className={`font-bold ${fontSizes.name}`}>{data.name || "Full Name"}</h1>
          <p className={`italic text-gray-500 ${fontSizes.headline}`}>{data.headline || "Headline or Role"}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold border-b mb-2 pb-1">Summary</h2>
          <p className={`whitespace-pre-line ${fontSizes.summary}`}>{data.summary || "Write a short profile here."}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold border-b mb-2 pb-1">Experience</h2>
          <p className="text-sm">Company • Role • Duration</p>
        </div>
        <div>
          <h2 className="text-xl font-bold border-b mb-2 pb-1">References</h2>
          <p className="text-sm">Available upon request.</p>
        </div>
      </div>
    </div>
  );
});

export default FirstTemplate;
