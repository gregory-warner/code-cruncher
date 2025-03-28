import React, {useEffect, useState} from "react";
import {Box, MenuItem} from "@mui/material";
import {useAddParticipantMutation, useGetActorsQuery} from "../../../../../services/server/serverApi";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectSessionId} from "../../../sessionSlice";
import {ParticipantTypeId} from "../../../../../types";
import {setSnackbar} from "../../../../../app/store/appSlice";
import ActionsSectionDropdown from "../../../../components/actionsSection/ActionsSectionDropdown";
import AddIcon from "@mui/icons-material/Add";

const AddParticipantSection = () => {
    const dispatch = useAppDispatch();

    const [selectedActorId, setSelectedActorId] = useState(0);

    const sessionId = useAppSelector(selectSessionId);

    useEffect(() => {
        setSelectedActorId(0);
    }, [sessionId]);

    const { data, isLoading } = useGetActorsQuery();

    const [addParticipant] = useAddParticipantMutation();

    const onAddParticipant = async () => {
        if (!selectedActorId) {
            return;
        }

        const newParticipant = await addParticipant({
            sessionId,
            participantId: selectedActorId,
            participantTypeId: ParticipantTypeId.actor,
        }).unwrap();

        if (!newParticipant.participantId) {
            dispatch(setSnackbar({ message: `Unable to add new participant` }));
        }
    };

    const actors = isLoading ? [] : data;

    if (!sessionId || isLoading) {
        return <Box />;
    }

    const dropdownItems = actors.map((actor, index) => (
        <MenuItem value={actor.actorId} key={`id-add-participant-dropdown-item-${index}`}>
            {actor.name}
        </MenuItem>
    ));

    return (
        <ActionsSectionDropdown
            value={selectedActorId}
            items={dropdownItems}
            iconButton={<AddIcon onClick={onAddParticipant} />}
            onChange={e => setSelectedActorId(e.target.value as number)}
        />
    );
};

export default AddParticipantSection;