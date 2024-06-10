import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Drawer, Grid, Button, ListItem, List } from '@mui/material';
import { useEffect } from 'react';
import ActorCard from './actorCard/ActorCard';
import { toggleDrawer, isOpen, getSelectedActor, updateAssistantFromDrawer, setSelectedActor } from './ActorDrawerSlice';
import './actorDrawerStyles.css';
import '../chatApp/chatAppStyle.css';
import { selectActor } from '../actor/actorSlice';
import {useGetActorsQuery} from "../../services/serverApi";

const drawerPaperProps = {
    backgroundColor: "rgba(34, 34, 34, 1)"
};

const ActorDrawer = () => {
    const dispatch = useAppDispatch();
    const open = useAppSelector(isOpen);
    const selectedActor = useAppSelector(getSelectedActor);
    const actor = useAppSelector(selectActor);

    const {data: actors, error: actorsError, isLoading: actorsLoading, refetch} = useGetActorsQuery();

    useEffect(() => {
        if (!open) {
            return;
        }

        refetch();
    }, [open]);

    if (actorsError) {
        console.error(`Error fetching users: ${actorsError}`);
    }

    const onFinish = () => dispatch(updateAssistantFromDrawer(selectedActor));

    const onClose = () => {
        dispatch(toggleDrawer());
        dispatch(setSelectedActor(actor));
    }

    const footer = (
        <Grid 
            container 
            justifyContent={"space-between"} 
            className="Actor-Drawer-Footer"
            padding={1} 
            item 
            xs={12} 
        >
            <Grid item xs={3}>
                <Button className="Actor-Drawer-Footer-Cancel-Button" variant={"contained"} onClick={onClose}>Cancel</Button>
            </Grid>
            <Grid item xs={3}>
                <Button className="Actor-Drawer-Footer-Finish-Button"  variant={"contained"} onClick={onFinish}>Finish</Button>
            </Grid>
        </Grid>
    );

    return (
        <Drawer 
            anchor={"left"} 
            open={open}
            onClose={onClose}
            PaperProps={{ style: drawerPaperProps, className: 'drawer-paper' }}
        >
            <List className="Actor-Drawer-List">
                {actors?.map((actor, idx) => (
                    <ListItem key={`id-actor-list-item-${idx}`}>
                        <ActorCard actor={actor} />
                    </ListItem>
                ))}
            </List>
            {footer}
        </Drawer>
    );
};

export default ActorDrawer;