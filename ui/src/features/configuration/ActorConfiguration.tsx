import AppLayout from "../../app/components/layout/AppLayout";
import AssistantsSection from "../assistant/component/assistantsSection/AssistantsSection";
import AssistantSettingsSection from "./components/assistantSettingsSection/AssistantSettingsSection";
import AssistantConfigurationSection from "./components/assistantConfigurationSection/AssistantConfigurationSection";

const ActorConfiguration = () => {

    return (
        <AppLayout
            leftPanel={<AssistantsSection />}
            center={<AssistantConfigurationSection />}
            rightPanel={<AssistantSettingsSection />}
        />
    );
};

export default ActorConfiguration;