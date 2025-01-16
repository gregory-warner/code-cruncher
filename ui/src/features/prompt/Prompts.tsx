import AppLayout from "../../app/components/layout/AppLayout";
import AssistantsSection from "../assistant/component/assistantsSection/AssistantsSection";

const Prompts = () => {

    return (
        <AppLayout
            leftPanel={<AssistantsSection />}
            center={<></>}
            rightPanel={<></>}
        />
    );
};

export default Prompts;