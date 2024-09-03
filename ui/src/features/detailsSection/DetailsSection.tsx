import {Button, Grid, Stack, Typography} from "@mui/material";
import React from "react";

const DetailsSection = () => {
    return (
        <Stack sx={{ height: '100%' }}>
            <Grid container direction='row' alignItems='center'>
                <Grid item xs={5} textAlign='center'>
                    <Typography variant='h6' sx={{paddingLeft: '5px', paddingRight: '5px'}}>
                        Details
                    </Typography>
                </Grid>
                <Grid item xs={7} textAlign='center'>
                    <Button
                        sx={{ width: '100%', textTransform: 'none', height: '100%' }}
                        onClick={() => {}}>
                        <Typography variant='body2'>Blank</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default DetailsSection;