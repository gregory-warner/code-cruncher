import {Box} from "@mui/material";
import React from "react";
import UserParticipantSettings from "./UserParticipantSettings";
import { Actor, User } from "../../../../../types";
import ActorParticipantSettings from "./ActorParticipantSettings";
import {isActor} from "../../../../../utils/util";
import {useSessionParticipant} from "../../../hooks/useSessionParticipant";

const ParticipantSettingsSection = () => {
    const { selectedParticipant } = useSessionParticipant();

    if (!selectedParticipant) {
        return <Box></Box>;
    }

    if (isActor(selectedParticipant)) {
        return (
            <Box sx={{ width: '100%', pl: 1 }}>
                <ActorParticipantSettings actor={selectedParticipant as Actor} />
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', pl: 1 }}>
            <UserParticipantSettings user={selectedParticipant as User} />
        </Box>
    );
};

export default ParticipantSettingsSection;