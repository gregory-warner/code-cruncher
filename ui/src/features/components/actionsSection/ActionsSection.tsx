import {Grid, Typography} from "@mui/material";
import React from "react";

interface ActionsSectionProps {
    items: React.ReactNode[]
}

const ActionsSection = ({ items }: ActionsSectionProps) => {

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
                items.map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>)
            }
        </Grid>
    )
};

export default ActionsSection;