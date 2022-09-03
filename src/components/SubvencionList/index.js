import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {Container, Header, Body, ButtonDiv, Grid } from '../UI/Layout/styles'
import ServiceSubvencion from '../../services/ServiceSubvencion';
import { DataGrid } from '@mui/x-data-grid';

const SubvencionesList = () => {

    const [subvenciones, setSubvenciones] = useState([])

    useEffect(() => {

      ServiceSubvencion.get().then((subvenciones) => {
        setSubvenciones(subvenciones)
        })
    }, [])


    const columns = [
        { 
          field: 'presentacionDate', 
          headerName: 'Día presentación', 
          width: 300,
          editable: false,
          resizable: true
        },
        {
          field: 'ccaa',
          headerName: 'CCAA',
          editable: true,
          width: 300,
        },
        {
          field: 'tramite_number',
          headerName: 'Número de trámite',
          editable: true,
          width: 300,
        },
      ];
          
    
    return (
        <Container>

        <Header>
            <Grid>
                <h2>Subvenciones</h2>
                <ButtonDiv>

                </ButtonDiv>

            </Grid>

        </Header>

        <Body>
          <Box sx={{ height: 800, width: '100%' }}>
            <DataGrid
                rows={subvenciones}
                columns={columns}
                disableSelectionOnClick
                pageSize={30}
            />
          </Box>
        </Body>

    </Container>
    )
}

export default SubvencionesList