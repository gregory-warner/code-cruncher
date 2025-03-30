import {Grid, MenuItem, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import ParticipantsSection from "./components/ParticipantsSection";
import ParticipantSettingsSection from "./components/ParticipantSettingsSection";
import {useAppSelector} from "../../../../store/hooks";
import {selectSession} from "../../sessionSlice";
import SessionScoreBoard from "./components/scoreBoard/SessionScoreBoard";
import ActionsSection from "../../../components/actionsSection/ActionsSection";
import DeleteSession from "./components/sessionActions/DeleteSession";
import {useGetActorsQuery} from "../../../../services/server/serverApi";
import ActionsSectionDropdown from "../../../components/actionsSection/ActionsSectionDropdown";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import {useSessionParticipant} from "../../hooks/useSessionParticipant";
import {SessionParticipant} from "../../../../types";

const SettingsSection = () => {
    const session = useAppSelector(selectSession);

    const [selectedActorId, setSelectedActorId] = useState<number>(null);
    const [selectedParticipantId, setSelectedParticipantId] = useState<number>(null);
    const [participants, setParticipants] = useState<SessionParticipant[]>([]);

    let participantMap = new Map();

    const { data: actors, isLoading: areActorsLoading } = useGetActorsQuery();

    const { addParticipantToSession, deleteParticipantFromSession, getSessionParticipants } = useSessionParticipant();

    useEffect(() => {
        setSelectedActorId(0);
        updateSessionParticipants();
    }, [session]);

    useEffect(() => {
        if (!Array.isArray(participants)) {
            return;
        }

        for (const participant of participants) {
            participantMap.set(participant.sessionParticipantId, participant);
        }
    }, [participants]);

    const updateSessionParticipants = async () => {
        if (!session?.sessionId) {
            return;
        }

        const sessionParticipants = await getSessionParticipants(session.sessionId).unwrap();
        setParticipants(sessionParticipants);
    };

    const assistantDropdownItems = areActorsLoading ? [] : actors.map((actor, index) => (
        <MenuItem value={actor.actorId} key={`id-assistant-dropdown-item-${index}`}>{ actor.name }</MenuItem>
    ));

    const participantDropdownItems = participants.map((sessionParticipant, index) => (
        <MenuItem value={sessionParticipant.sessionParticipantId} key={`id-participants-dropdown-item-${index}`}>{ sessionParticipant.participant.name }</MenuItem>
    ));

    const onDeleteSessionParticipant = async () => {
        if (!participantMap.has(selectedParticipantId)) {
            return;
        }

        await deleteParticipantFromSession(session.sessionId, participantMap.get(selectedParticipantId));
    };

    return (
        <Grid >
            <Grid container direction='row' alignItems='center'>
                <Grid item xs={12} textAlign='center'>
                    <Typography variant='h4'>
                        {session?.sessionName ?? ''}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <SessionScoreBoard />
            </Grid>
            <Grid container item xs={12}>
                <ParticipantsSection />
            </Grid>
            <ActionsSection
                items={[
                    <Grid container item xs={12}>
                        <ActionsSectionDropdown
                            label='Add Participant'
                            value={selectedActorId}
                            items={assistantDropdownItems}
                            iconButton={<AddIcon onClick={() => addParticipantToSession(selectedActorId, session.sessionId)} />}
                            onChange={e => setSelectedActorId(e.target.value as number)}
                            disabled={!session}
                        />
                    </Grid>,
                    <Grid container item xs={12}>
                        <ActionsSectionDropdown
                            label='Remove Participant'
                            value={selectedParticipantId}
                            items={participantDropdownItems}
                            iconButton={<RemoveIcon onClick={onDeleteSessionParticipant} />}
                            onChange={e => setSelectedParticipantId(e.target.value as number)}
                            disabled={!session}
                        />
                    </Grid>,
                    <DeleteSession />
                ]}
            />
            <Grid container item xs={12}>
                <ParticipantSettingsSection />
            </Grid>
        </Grid>
    );
};

export default SettingsSection;