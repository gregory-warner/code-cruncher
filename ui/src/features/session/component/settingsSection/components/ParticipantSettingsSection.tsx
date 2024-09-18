import {useAppSelector} from "../../../../../store/hooks";
import {selectSelectedParticipant} from "../../../sessionSlice";
import {Box} from "@mui/material";
import React from "react";
import UserParticipantSettings from "./UserParticipantSettings";
import { Actor, User } from "../../../../../types";
import ActorParticipantSettings from "./ActorParticipantSettings";

const ParticipantSettingsSection = () => {
    const selectedParticipant = useAppSelector(selectSelectedParticipant);

    if (!selectedParticipant) {
        return <Box></Box>;
    }

    const isActor = selectedParticipant && 'actorId' in selectedParticipant;
    const isUser = selectedParticipant && 'userId' in selectedParticipant;

    return (
        <Box sx={{ width: '100%', pl: 1 }}>
            {
                isActor ? (
                    <ActorParticipantSettings actor={selectedParticipant as Actor} />
                ) : (
                    <UserParticipantSettings user={selectedParticipant as User} />
                )
            }
        </Box>
    );
};

export default ParticipantSettingsSection;