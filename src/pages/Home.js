import React from "react";
import NewResumeCard from "../components/NewResumeCard";
import { ResumesButton } from "../components/HomeMenu";
import { SettingsButton } from "../components/HomeMenu";
import "../styles/pageStyle.css";

function Home() {
  return (
    <div className="container">
      <div className="container-left">
        <div className="left-top">
          <ResumesButton />
        </div>
        <div className="left-bottom">
          <SettingsButton />
        </div>
      </div>
      <div className="container-right">
        <h2 className="section-title">Resumes</h2>
        <div className="layout">
          <NewResumeCard />
        </div>
      </div>
    </div>
  );
}

export default Home;