import * as React from "react";
import {Grid} from "@mui/material";
import {useGetActorsQuery, useGetUserQuery} from "../../services/server/serverApi";
import ChatDashboardCard from "./components/ChatDashboardCard";
import ChatDashboardFab from "./components/ChatDashboardFab";
import ActorCreationDrawer from "../actorCreationDrawer/ActorCreationDrawer";
import {selectSelectedActor} from "./chatDashboardSlice";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {defaultUser, setUser} from "../user/userSlice";
import {useEffect} from "react";

const ChatDashboard = () => {

    const dispatch = useAppDispatch();
    const { data: actors, isLoading: actorsLoading } = useGetActorsQuery();
    const { data: userData } = useGetUserQuery(defaultUser);

    const selectedActor = useAppSelector(selectSelectedActor);

    useEffect(() => {
        userData && dispatch(setUser(userData));
    }, [userData])

    if (actorsLoading || !Array.isArray(actors)) {
        return <></>;
    }

    return (
        <>
            <Grid container spacing={2} sx={{padding: '10px'}}>
                {actors.map((actor: Actor) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={`id-dashboard-card-${actor.actorId}`}>
                        <ChatDashboardCard actor={actor} />
                    </Grid>
                ))}
            </Grid>
            <ChatDashboardFab />
            {selectedActor && <ActorCreationDrawer actor={selectedActor} />}
        </>
    );
};

export default ChatDashboard;