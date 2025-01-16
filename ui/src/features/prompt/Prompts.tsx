import AppLayout from "../../app/components/layout/AppLayout";
import AssistantsSection from "../assistant/component/assistantsSection/AssistantsSection";
import PromptsTable from "./components/promptsTable/PromptsTable";

const Prompts = () => {

    return (
        <AppLayout
            leftPanel={<AssistantsSection />}
            center={<PromptsTable />}
            rightPanel={<></>}
        />
    );
};

export default Prompts;