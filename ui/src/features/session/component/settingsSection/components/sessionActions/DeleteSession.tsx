import ActionsSectionButton from "../../../../../components/actionsSection/ActionsSectionButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {useAppSelector} from "../../../../../../store/hooks";
import {selectSession} from "../../../../sessionSlice";
import useSessionUpdater from "../../../../hooks/useSessionUpdater";

const DeleteSession = () => {
    const session = useAppSelector(selectSession);

    const { deleteSessionById } = useSessionUpdater();

    const onDelete = async () => {
        if (!session?.sessionId) {
            return;
        }

        await deleteSessionById(session.sessionId);
    };

    return (
        <ActionsSectionButton
            title={'Delete Session'}
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            disabled={!session?.sessionId}
        />
    );
};

export default DeleteSession;