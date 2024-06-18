import * as React from "react";
import {Grid} from "@mui/material";
import {useGetActorsQuery} from "../../services/server/serverApi";
import ChatDashboardCard from "./components/ChatDashboardCard";
import ChatDashboardFab from "./components/ChatDashboardFab";
import ActorCreationDrawer from "../actorCreationDrawer/ActorCreationDrawer";
import {selectSelectedActor} from "./chatDashboardSlice";
import {useAppSelector} from "../../store/hooks";

const ChatDashboard = () => {

    const { data: actors, isLoading: actorsLoading } = useGetActorsQuery();

    const selectedActor = useAppSelector(selectSelectedActor);

    if (actorsLoading) {
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
            <ActorCreationDrawer actor={selectedActor} />
        </>

    );
};

export default ChatDashboard;