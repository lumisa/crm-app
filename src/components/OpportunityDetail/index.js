import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {Container, Header, Body, ButtonDiv, Grid } from '../UI/Layout/styles'
import ServiceOpportunity from '../../services/ServiceOpportunity';
import { DataGrid } from '@mui/x-data-grid';

const OpportunityDetail = () => {

    const [opportunity, setOpportunity] = useState([])

    useEffect(() => {


        ServiceOpportunity.getOpportunity().then((opportunity) => {
            setOpportunity(opportunity)
        })
    }, [])

    const TextFieldEls = [
        {label: 'Nombre Completo', name: 'full_name', required: true},
        {label: 'Teléfono', name: 'phone', required: true},
        {label: 'Email', name: 'email', required: true},    
    
    ]
    
    const InputFileEls = [
    ]
    
    const SelectFieldEls  = [
    ]

    const columns = [
        { 
          field: 'id', 
          headerName: 'ID', 
          width: 90,
          editable: false,
          resizable: true
        },
        {
          field: 'title',
          headerName: 'Titulo',
          editable: true,
          width: 200,
        },
        {
          field: 'description',
          headerName: 'description',
          editable: true,
          width: 200,
        },
        {
          field: 'source',
          headerName: 'source',
          editable: true,
          width: 150,
        },
        {
          field: 'closing_date',
          headerName: 'closing_date',
          editable: true,
          width: 150,
        },
        {
          field: 'probability',
          headerName: 'probability',
          editable: true,
        },
        {
          field: 'amount',
          headerName: 'amount',
          editable: true,
        },
        {
          field: 'account_id',
          headerName: 'account_id',
          editable: true,
          width: 150,
        },
        {
          field: 'stage_id',
          headerName: 'stage_id',
          editable: true,
          width: 150,
        },
      ];
          
    
    return (
        <Container>

        <Header>
            <Grid>
                <h2>Oportunidades</h2>
                <ButtonDiv>
{/*                         <CreateNewForm
                        boton='Crear nuevo contacto'
                        titulo='Crear nuevo contacto'
                        TextFieldEls={TextFieldEls}
                        InputFileEls={InputFileEls}
                        SelectFieldEls={SelectFieldEls}
                        onSubmit={onSubmit}
                        
                        /> */}


                </ButtonDiv>

            </Grid>

        </Header>

        <Body>
        <Box sx={{ height: 800, width: '100%' }}>
        <DataGrid
            rows={opportunity}
            columns={columns}
            disableSelectionOnClick
            pageSize={30}
        />
        </Box>
        </Body>

    </Container>
    )
}

export default OpportunityDetail