import SessionsSection from "../session/component/sessionsSection/SessionsSection";
import React from "react";
import Session from "../session/Session";
import SettingsSection from "../session/component/settingsSection/SettingsSection";
import AppLayout from "../../app/components/layout/AppLayout";

const CodeCruncherApp = () => {

    return (
        <AppLayout
            leftPanel={<SessionsSection />}
            center={<Session />}
            rightPanel={<SettingsSection />}
        />
    );
};

export default CodeCruncherApp;