import { useEffect, useState } from 'react';
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
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'title',
          headerName: 'Titulo',
          editable: true,
        },
        {
          field: 'description',
          headerName: 'description',
          editable: true,
        },
        {
          field: 'source',
          headerName: 'source',
          editable: true,
        },
        {
          field: 'closing_date',
          headerName: 'closing_date',
          editable: true,
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
        },
        {
          field: 'stage_id',
          headerName: 'stage_id',
          editable: true,
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
        <DataGrid
            rows={opportunity}
            columns={columns}
            disableSelectionOnClick
        />
        </Body>

    </Container>
    )
}

export default OpportunityDetail