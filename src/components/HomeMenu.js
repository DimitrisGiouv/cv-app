import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/homeMenu.css";


    export function ResumesButton() {
        const location = useLocation();
        const isActive = location.pathname === "/";

        return (
            <Link
            to="/"
            className={`Resumes-button link ${isActive ? "active" : ""}`}
            >
            Resumes
            </Link>
        );
    }

    export function SettingsButton() {
        const location = useLocation();
        const isActive = location.pathname === "/settings";

        return (
            <Link
            to="/settings"
            className={`Settings-button link ${isActive ? "active" : ""}`}
            >
            Settings
            </Link>
        );
    }