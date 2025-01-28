import React, {useEffect} from "react";
import {EditableActor, Prompt} from "../../../../../types";
import {useAppSelector} from "../../../../../store/hooks";
import {selectSelectedActor} from "../../../../assistant/assistantSlice";
import PromptsTableRow from "./PromptsTableRow";

const PromptsTableBody = () => {

    const actor: EditableActor|null = useAppSelector(selectSelectedActor);

    const [prompts, setPrompts] = React.useState<Prompt[]>([]);

    useEffect(() => {
        if (!actor.actorId) {
            return;
        }

        setPrompts(actor.prompts)
    }, [actor]);

    return (
        prompts.map(((prompt, idx) => (
            <PromptsTableRow prompt={{ ...prompt, promptId: idx }}/>
        )))
    );
};

export default PromptsTableBody;