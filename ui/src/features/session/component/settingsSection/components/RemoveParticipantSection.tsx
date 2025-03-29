import React, {useEffect, useState} from "react";
import {Box, MenuItem} from "@mui/material";
import {
    useAddParticipantMutation,
    useGetActiveSessionParticipantsQuery,
    useGetActorsQuery
} from "../../../../../services/server/serverApi";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectSessionId} from "../../../sessionSlice";
import {ParticipantTypeId} from "../../../../../types";
import {setSnackbar} from "../../../../../app/store/appSlice";
import ActionsSectionDropdown from "../../../../components/actionsSection/ActionsSectionDropdown";
import AddIcon from "@mui/icons-material/Add";
import {skipToken} from "@reduxjs/toolkit/query";

const RemoveParticipantSection = () => {
    const dispatch = useAppDispatch();

    const [selectedActorId, setSelectedActorId] = useState(0);

    const sessionId = useAppSelector(selectSessionId);

    useEffect(() => {
        setSelectedActorId(0);
    }, [sessionId]);

    const { data, isLoading } = useGetActiveSessionParticipantsQuery(sessionId || skipToken);

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

    const sessionParticipants = isLoading ? [] : data;

    if (!sessionId || isLoading) {
        return <Box />;
    }

    const dropdownItems = sessionParticipants.map((sessionParticipant, index) => (
        <MenuItem value={sessionParticipant.participantId} key={`id-remove-participant-dropdown-item-${index}`}>
            {sessionParticipant.participant.name}
        </MenuItem>
    ));

    return (
        <ActionsSectionDropdown
            label='Remove Participant'
            value={selectedActorId}
            items={dropdownItems}
            iconButton={<AddIcon onClick={onAddParticipant} />}
            onChange={e => setSelectedActorId(e.target.value as number)}
        />
    );
};

export default RemoveParticipantSection;