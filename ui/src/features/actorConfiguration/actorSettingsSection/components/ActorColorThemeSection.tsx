import {Box, Collapse, Divider, Grid, IconButton, Typography} from "@mui/material";
import {SketchPicker} from "react-color";
import {MessageCard} from "../../../../types";
import React, {useState} from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ActorColorThemeSection = ({colorTheme}: {colorTheme: ColorTheme}) => {

    const [isOpen, setIsOpen] = useState(false);
    const messageCard: MessageCard = colorTheme?.messageCard ?? {};

    const messageCardTheme = [
        { label: 'Name', value: messageCard.nameColor },
        { label: 'Contents', value: messageCard.contentsColor },
        { label: 'Background', value: messageCard.backgroundColor },
        { label: 'Border', value: messageCard.borderColor },
    ];

    return (
        <Box >
            <Divider orientation='horizontal' textAlign='left'>
                <Box display='flex' alignItems='center'>
                    <Typography>Color Theme</Typography>
                    <IconButton sx={{ p:0 }} onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Box>
            </Divider>
            <Collapse sx={{ pt: 2 }} in={isOpen}>
            <Grid container sx={{ width: '100%', maxHeight: '400px', overflowY: 'scroll' }}>
                {messageCardTheme.map((color, index) => (
                    <Grid item xs={12} key={`${color.label}-${index}-message-card-data-item`}>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="body2">{color.label}</Typography>
                            <SketchPicker disableAlpha presetColors={[]} color={color.value} styles={{default: {
                                    picker: {
                                        width: "175px",
                                        height: "200px",
                                        borderRadius: "0",
                                    }
                                }}} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
            </Collapse>
        </Box>
    );
};

export default ActorColorThemeSection;