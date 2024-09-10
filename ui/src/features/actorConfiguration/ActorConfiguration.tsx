import AppLayout from "../../app/components/layout/AppLayout";
import ActorsSection from "./actorsSection/ActorsSection";
import ActorSettingsSection from "./actorSettingsSection/ActorSettingsSection";
import ActorDataDisplay from "./actorDataDisplay/ActorDataDisplay";

const ActorConfiguration = () => {

    return (
        <AppLayout
            leftPanel={<ActorsSection />}
            center={<ActorDataDisplay />}
            rightPanel={<ActorSettingsSection />}
        />
    );
};

export default ActorConfiguration;