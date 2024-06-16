import * as React from "react";
import {Grid} from "@mui/material";
import {useGetActorsQuery} from "../../services/serverApi";
import ChatDashboardCard from "./components/ChatDashboardCard";

const ChatDashboard = () => {

    const { data: actors, isLoading: actorsLoading } = useGetActorsQuery();

    if (actorsLoading) {
        return <></>;
    }

    return (
        <Grid container spacing={2} sx={{padding: '10px'}}>
            {actors.map((actor: Actor) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={`id-dashboard-card-${actor.actorId}`}>
                    <ChatDashboardCard actor={actor} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ChatDashboard;