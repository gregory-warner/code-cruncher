import {Grid, MenuItem, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import ParticipantsSection from "./components/ParticipantsSection";
import ParticipantSettingsSection from "./components/ParticipantSettingsSection";
import {useAppSelector} from "../../../../store/hooks";
import {selectSession} from "../../sessionSlice";
import SessionScoreBoard from "./components/scoreBoard/SessionScoreBoard";
import ActionsSection from "../../../components/actionsSection/ActionsSection";
import DeleteSession from "./components/sessionActions/DeleteSession";
import RemoveParticipantSection from "./components/RemoveParticipantSection";
import {useGetActorsQuery} from "../../../../services/server/serverApi";
import ActionsSectionDropdown from "../../../components/actionsSection/ActionsSectionDropdown";
import AddIcon from "@mui/icons-material/Add";
import {useSessionParticipant} from "../../hooks/useSessionParticipant";

const SettingsSection = () => {
    const session = useAppSelector(selectSession);

    const [selectedActorId, setSelectedActorId] = useState(0);

    const { data: actors, isLoading: areActorsLoading } = useGetActorsQuery();

    const { addParticipantToSession } = useSessionParticipant();

    useEffect(() => {
        setSelectedActorId(0);
    }, [session]);

    const assistantDropdownItems = areActorsLoading ? [] : actors.map((actor, index) => (
        <MenuItem value={actor.actorId} key={`id-add-participant-dropdown-item-${index}`}>{ actor.name }</MenuItem>
    ));

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
                        />
                    </Grid>,
                    <Grid container item xs={12}>
                        <RemoveParticipantSection />
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