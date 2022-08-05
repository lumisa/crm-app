import { useState } from 'react';
import { Container, Header, Body, Grid } from '../UI/Layout/styles'
import Box from '@mui/material/Box';
import OpportunityParam from './OpportunityParam'
import StageParam from './StageParam';
import ActivityParam from './ActivityParam'

const Parametrizable = () => {




    return (
        <Container>

            <Header>
                <Grid>
                    <h2>Parametrizable</h2>


                </Grid>

            </Header>

            <Body>
                <Box sx={{ height: 300, width: '40%' }}>
                    <OpportunityParam />
                    <StageParam/>
                    <ActivityParam/>
                </Box>
            </Body>

        </Container>

    )
}

export default Parametrizable