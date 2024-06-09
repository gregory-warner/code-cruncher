import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Drawer, Grid, Button, ListItem, List } from '@mui/material';
import { useEffect } from 'react';
import ActorCard from './actorCard/ActorCard';
import { toggleDrawer, isOpen, getActiveActors, fetchActors, getSelectedActor, updateAssistantFromDrawer, setSelectedActor } from './ActorDrawerSlice';
import './actorDrawerStyles.css';
import '../chatApp/chatAppStyle.css';
import { selectAssistant } from '../actor/actorSlice';

const drawerPaperProps = {
    backgroundColor: "rgba(34, 34, 34, 1)"
};

const ActorDrawer = () => {
    debugger;
    const dispatch = useAppDispatch();
    const actors = useAppSelector(getActiveActors);
    const open = useAppSelector(isOpen);
    const selectedActor = useAppSelector(getSelectedActor);
    const assistant = useAppSelector(selectAssistant);

    useEffect(() => {
        if (!open) {
            return;
        }

        dispatch(fetchActors()).catch(error => console.error(`Error fetching users: ${error}`));
    }, [open])

    const onFinish = () => dispatch(updateAssistantFromDrawer(selectedActor));

    const onClose = () => {
        dispatch(toggleDrawer());
        dispatch(setSelectedActor(assistant));
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
                {actors.map((actor, idx) => (
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