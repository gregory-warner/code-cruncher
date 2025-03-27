import {Grid, Typography} from "@mui/material";
import React from "react";

interface ActionsSectionProps {
    buttons: React.ReactNode[]
}

const ActionsSection = ({ buttons }: ActionsSectionProps) => {

    return (
        <Grid container>
            <Grid container direction='row' alignItems='center'>
                <Grid item xs={5} textAlign='left'>
                    <Typography variant='h6' sx={{paddingLeft: '10px', paddingRight: '5px'}}>
                        Actions
                    </Typography>
                </Grid>
            </Grid>
            {
                buttons.map((button, index) => <React.Fragment key={index}>{button}</React.Fragment>)
            }
        </Grid>
    )
};

export default ActionsSection;