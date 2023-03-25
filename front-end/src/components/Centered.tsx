import { Grid } from "@mui/material";
import { PropsWithChildren } from 'react';

const Centered = (props: PropsWithChildren<{}>) => {
    return (
        <Grid
            container
            direction='column'
            alignItems='center'
            justifyContent='center'
            style={{
                minHeight: '100vh'
            }}
        >
            <Grid
                item
                xs={3}
            >
                {props.children}
            </Grid>
        </Grid>
    );
};

export default Centered;