import React from "react";
import {Avatar, Card, CardContent, Grid, IconButton, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {chatServerUrl} from "../../../../config";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Box} from "@mui/system";
import {selectSelectedActor, setSelectedActor} from "../chatDashboardSlice";
import {Settings as SettingsIcon} from "@mui/icons-material";
import {setIsActorCreationDrawerOpen} from "../../actorDrawer/store/actorDrawerSlice";
import {useNavigate} from "react-router-dom";
import {setActor} from "../../session/store/sessionSlice";
import {Actor, AIModel, ColorTheme} from "../../../types";

interface ChatDashboardCardProps {
    actor: Actor,
}

const ChatDashboardCard = ({ actor }: ChatDashboardCardProps) => {

    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const navigate = useNavigate();

    const avatarUrl = `${chatServerUrl}/images/${actor.avatar}`;
    const actorColorTheme: ColorTheme = JSON.parse(actor.colorTheme);
    const model: AIModel = actor.aiModel;

    const selectedActor = useAppSelector(selectSelectedActor);
    const isSelected = selectedActor === actor;

    const handleCardClick = () => {
        dispatch(setSelectedActor(actor));
    };

    const cardStyle = {
        borderRadius: '10px',
        border: isSelected ? '2px solid #228B22' : '2px solid #000000', // neon green border if selected
        backgroundColor:  (theme.palette.mode === 'dark' ? '#333' : '#fff'),
        color: (theme.palette.mode === 'dark' ? '#fff' : '#000'),
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: isSelected ? '0 0 10px neon' : '0 2px 4px rgba(0, 0, 0, 0.1)',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
    };

    const bannerStyle = {
        border: '2px solid #006400',
        backgroundColor: actorColorTheme.backgroundColor || (theme.palette.mode === 'dark' ? '#333' : '#fff'),
    };

    const handleConfigClick = () => {
        dispatch(setIsActorCreationDrawerOpen(true));
    };

    const handleDoubleClick = () => {
        dispatch(setActor(selectedActor as Actor));
        navigate('/chat');
    };

    return (
        <Box
            onClick={handleCardClick}
            onDoubleClick={handleDoubleClick}
            sx={{
                ...cardStyle,
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
            }}
        >
            <Card style={cardStyle}>
                <Grid container alignItems="center" justifyContent="space-between" style={bannerStyle}>
                    <Grid item xs={isSmallScreen || isMediumScreen ? 10 : 8} container alignItems="center" wrap="nowrap">
                        <Avatar src={avatarUrl} style={{ width: 65, height: 65, marginRight: theme.spacing(2) }} />
                        <Typography variant="h6" component="div" style={{ flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {actor.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={isSmallScreen ? 2 : 1} container justifyContent="flex-end">
                        <IconButton onClick={handleConfigClick}>
                            <SettingsIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <CardContent>
                    <Stack spacing={2} mt={2}>
                        {!isSmallScreen && <Typography variant="body1">Title: {actor.title}</Typography>}
                        {<Typography variant="body1">AI Model: {model.modelName ?? 'N/A'}</Typography>}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ChatDashboardCard;