import React, {useEffect} from "react";
import usePrompts from "../../../hooks/usePrompts";
import {EditableActor, Prompt} from "../../../../../types";
import {useAppSelector} from "../../../../../store/hooks";
import {selectSelectedActor} from "../../../../assistant/assistantSlice";
import PromptsTableRow from "./PromptsTableRow";

const PromptsTableBody = () => {

    const actor: EditableActor|null = useAppSelector(selectSelectedActor);

    const [prompts, setPrompts] = React.useState<Prompt[]>([]);

    const { getPrompts } = usePrompts();

    const updatePrompts = async (actorId: number) => {
        setPrompts(await getPrompts(actorId));
    }

    useEffect(() => {
        if (!actor.actorId) {
            return;
        }

        updatePrompts(actor.actorId);
    }, [actor]);

    return (
        prompts.map(((prompt, idx) => (
            <PromptsTableRow prompt={{ ...prompt, promptId: idx }}/>
        )))
    );
};

export default PromptsTableBody;