import AppLayout from "../../app/components/layout/AppLayout";
import ActorsSection from "./components/actorsSection/ActorsSection";
import ActorSettingsSection from "./components/actorSettingsSection/ActorSettingsSection";
import ActorConfigurationSection from "./components/actorConfigurationSection/ActorConfigurationSection";

const ActorConfiguration = () => {

    return (
        <AppLayout
            leftPanel={<ActorsSection />}
            center={<ActorConfigurationSection />}
            rightPanel={<ActorSettingsSection />}
        />
    );
};

export default ActorConfiguration;