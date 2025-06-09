import React from "react";
import {Phone, Mail, MapPin, Globe } from "lucide-react";

const FirstTemplate = ({ data, fontSizes }) => {
  return (
    <div className="flex h-full  shadow bg-white  text-gray-900 break-words">
      <div className="w-1/3 bg-blue-900 text-white p-6 space-y-6">
        <div className="h-32 w-32 bg-gray-300 rounded-full mx-auto flex items-center justify-center text-sm text-gray-800 bg-opacity-80">
          Photo
        </div>

        <div>
            <h3 className="font-bold text-lg">Contact</h3>
            <ul className="text-sm mt-2 space-y-1 ">
                <li className="flex items-center gap-2 "><Phone size={16} className="min-w-[16px] shrink-0"/> <span className="break-all">{data.phone || ""}</span></li>
                <li className="flex items-center gap-2"><Mail size={16} className="min-w-[16px] shrink-0"/> <span className={`break-all ${fontSizes.email}`}>{data.email || ""}</span></li>
                <li className="flex items-center gap-2"><MapPin size={16} className="min-w-[16px] shrink-0"/> <span className="break-all">{data.location || ""}</span></li>
                <li className="flex items-center gap-2"><Globe size={16} className="min-w-[16px] shrink-0"/> <span className="break-all">{data.website || ""}</span></li>
            </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg">Skills</h3>
          <ul className="text-sm mt-2 space-y-1">
            <li>React</li>
            <li>JavaScript</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg">Education</h3>
          <ul className="text-sm mt-2 space-y-1">
            <li>BSc in Computer Science</li>
          </ul>
        </div>
      </div>

      <div className="w-2/3 p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{data.name || "Full Name"}</h1>
          <p className="text-lg italic text-gray-500 ">
            {data.headline || "Headline or Role"}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold border-b mb-2 pb-1 ">Summary</h2>
          <p className="text-sm leading-relaxed">
            {data.summary || "Write a short profile or summary here."}
          </p>
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
};

export default FirstTemplate;
