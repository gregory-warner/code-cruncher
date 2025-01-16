import {Prompt} from "../../../types";

const usePrompts = () => {

    const getPrompts = async (assistantId: number): Promise<Prompt[]> => {
        if (!assistantId) {
            return [];
        }


    };

    return {
        getPrompts,
    };
};

export default usePrompts;