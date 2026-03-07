import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import NewResumeCard from "../components/NewResumeCard";
import { ResumesButton } from "../components/HomeMenu";
import { SettingsButton } from "../components/HomeMenu";
import {
  deleteResumeById,
  generateResumeId,
  getAllResumes,
  upsertResume,
} from "../utils/resumeStorage";

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);

  const loadResumes = useCallback(() => {
    setResumes(getAllResumes());
  }, []);

  useEffect(() => {
    loadResumes();
    window.addEventListener("focus", loadResumes);

    return () => window.removeEventListener("focus", loadResumes);
  }, [loadResumes]);

  const openResume = (id) => {
    navigate(`/create?id=${id}`);
  };

  const removeResume = (event, id) => {
    event.stopPropagation();
    deleteResumeById(id);
    loadResumes();
  };

  const duplicateResume = (event, resume) => {
    event.stopPropagation();

    const nextResume = {
      ...resume,
      id: generateResumeId(),
      title: `${resume.title || t('home.untitled')} (Copy)`,
      updatedAt: new Date().toISOString(),
    };

    upsertResume(nextResume);
    loadResumes();
  };

  return (
    <div className="flex w-full h-full min-h-0 overflow-hidden">
      <div className="w-1/5 h-full min-h-0 bg-gray-200 dark:bg-gray-800 p-6 overflow-y-auto border-r border-gray-300 dark:border-gray-700">
        <div className="w-full h-max mb-4">
          <ResumesButton />
        </div>
        <div className="w-full h-min">
          <SettingsButton />
        </div>
      </div>
      <div className="flex-1 min-w-0 h-full min-h-0 bg-white dark:bg-gray-900 p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t('home.title')}</h2>
        <div className="flex flex-wrap content-start gap-6 mt-6 pb-6">
          <NewResumeCard />

          {resumes.map((resume) => (
            <div
              key={resume.id}
              onClick={() => openResume(resume.id)}
              className="group cursor-pointer rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 w-64 h-80 flex flex-col justify-between transition duration-300 hover:shadow-lg"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
                  {resume.title || t('home.untitled')}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {t('home.updated')} {new Date(resume.updatedAt).toLocaleString()}
                </p>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  className="w-full text-sm py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  {t('home.openDraft')}
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={(event) => duplicateResume(event, resume)}
                    className="flex-1 text-xs py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {t('home.duplicate')}
                  </button>
                  <button
                    type="button"
                    onClick={(event) => removeResume(event, resume.id)}
                    className="flex-1 text-xs py-2 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    {t('home.delete')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;