import {Box} from "@mui/material";
import React from "react";
import UserParticipantSettings from "./UserParticipantSettings";
import { Actor, User } from "../../../../../types";
import ActorParticipantSettings from "./ActorParticipantSettings";
import {useParticipant} from "../../../hooks/useParticipant";

const ParticipantSettingsSection = () => {
    const { selectedParticipant, isActor } = useParticipant();

    if (!selectedParticipant) {
        return <Box></Box>;
    }

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