import React from "react";
import { ResumesButton } from "../components/HomeMenu";
import { SettingsButton } from "../components/HomeMenu";
import "../styles/settings.css";
import "../styles/pageStyle.css";

function Settings() {
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
        <h2 className="section-title">Settings</h2>
      </div>
    </div>
  );
}

export default Settings;