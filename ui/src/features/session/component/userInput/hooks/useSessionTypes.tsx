import {SessionType} from "../../../../../types";
import {useGetSessionsQuery} from "../../../../../services/server/serverApi";

const useSessionTypes = () => {

    const messageTypeItems = Object
        .keys(SessionType)
        .filter((key) => isNaN(Number(key)))
        .map(key => (
            { value: SessionType[key], label: key }
        ));

    const getLanguageType = () => {

    }

    console.log(SessionType[0]);

    return {
        messageTypeItems
    };
}

export default useSessionTypes;