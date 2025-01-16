import AppLayout from "../../app/components/layout/AppLayout";
import AssistantsSection from "../assistant/component/assistantsSection/AssistantsSection";
import AssistantSettingsSection from "./components/assistantSettingsSection/AssistantSettingsSection";
import AssistantConfigurationSection from "./components/assistantConfigurationSection/AssistantConfigurationSection";

const AssistantConfiguration = () => {

    return (
        <AppLayout
            leftPanel={<AssistantsSection />}
            center={<AssistantConfigurationSection />}
            rightPanel={<AssistantSettingsSection />}
        />
    );
};

export default AssistantConfiguration;