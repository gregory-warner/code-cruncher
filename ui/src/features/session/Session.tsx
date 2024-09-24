import SessionsSection from "../session/component/sessionsSection/SessionsSection";
import React from "react";
import SessionSection from "../session/component/sessionSection/SessionSection";
import SettingsSection from "../session/component/settingsSection/SettingsSection";
import AppLayout from "../../app/components/layout/AppLayout";

const CodeCruncherApp = () => {

    return (
        <AppLayout
            leftPanel={<SessionsSection />}
            center={<SessionSection />}
            rightPanel={<SettingsSection />}
        />
    );
};

export default CodeCruncherApp;