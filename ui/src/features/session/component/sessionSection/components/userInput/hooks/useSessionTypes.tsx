import {SessionType} from "../../../../../../../types";
import {SelectChangeEvent} from "@mui/material";
import {selectSessionId} from "../../../../../sessionSlice";
import {useAppDispatch, useAppSelector} from "../../../../../../../store/hooks";
import {useUpdateSessionTypeIdMutation} from "../../../../../../../services/server/serverApi";
import {setSnackbar} from "../../../../../../../app/store/appSlice";

const useSessionTypes = () => {
    const dispatch = useAppDispatch();
    const sessionId = useAppSelector(selectSessionId);

    const [updateSessionTypeId] = useUpdateSessionTypeIdMutation();

    const sessionTypes = Object
        .keys(SessionType)
        .filter((key) => isNaN(Number(key)))

    const sessionTypeLabels = sessionTypes
        .map(key => (
            { value: SessionType[key], label: key }
        ));

    const onSessionTypeChange = async (event: SelectChangeEvent<any>) => {
        const session = await updateSessionTypeId({ sessionId, sessionTypeId: event.target.value }).unwrap();
        if (!session.sessionId) {
            dispatch(setSnackbar({ message: `Unable to update session type` }));
        }
    };

    return {
        sessionTypeLabels,
        onSessionTypeChange,
    };
}

export default useSessionTypes;