import { Avatar, Box, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSelectedActor, selectSelectedActor, updateActorFromDrawer } from '../ActorDrawerSlice';
import ActorConfigMenu from './ActorConfigMenu';
import './actorCardStyle.css';
import {chatServerUrl} from "../../../../config";

interface ActorCardProps {
    actor: Actor,
}

const ActorCard = ({ actor } : ActorCardProps): JSX.Element => {
    const avatarPath = `${chatServerUrl}/images/${actor.configuration.avatar}`;
    const dispatch = useAppDispatch();
    const selectedActor = useAppSelector(selectSelectedActor);
    const cardClass = selectedActor?.actorId === actor.actorId ? "card-container-selected" : "card-container";
    const selectActor = () => dispatch(setSelectedActor(actor));

    const onDoubleClick = () => {
        dispatch(updateActorFromDrawer(actor));
    }

    return (
        <Box
            className={cardClass}
            display="flex"
            alignItems="center"
            borderRadius={4}
            border={"3px double gray"}
            bgcolor="#FFF8E1"
            p={1}
            width="100%"
            onClick={selectActor}
            onDoubleClick={onDoubleClick}
        >
            <Avatar sx={{width:80, height:80}} src={avatarPath} alt="User Avatar" />
                <Grid container spacing={4}>
                    <Grid item xs={9} container direction="column" alignItems="flex-start">
                        <Grid item><Typography variant="h6" fontWeight="bold">{actor.name}</Typography></Grid>
                        <Grid item><Typography variant="body1">{actor.configuration.title}</Typography></Grid>
                        <Grid item><Typography className={"Actor-Card-Model-Text"} variant="body2">{actor.configuration?.chatModel ?? ""}</Typography></Grid>
                    </Grid>
                    <Grid item xs={3} container direction="column" alignItems="flex-end">

                        <ActorConfigMenu />
                    </Grid>
                </Grid>
        </Box>
    );
}

export default ActorCard;