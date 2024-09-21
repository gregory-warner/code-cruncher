import {SessionType} from "../../../../../types";

const useSessionTypes = () => {

    const sessionTypes = Object
        .keys(SessionType)
        .filter((key) => isNaN(Number(key)))
        .map(key => (
            { value: SessionType[key], label: key }
        ));


    return {
        sessionTypes,
    };
}

export default useSessionTypes;