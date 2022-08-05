import { useEffect, useState } from 'react';
import ServicesOpportunityTypes from '../../../services/ServiceOpportunityTypes';
import CreateNewForm from '../../UI/CreateNewForm';
import { ButtonDiv } from '../../UI/Layout/styles'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const OpportunityParam = () => {
    const [opportunityTypes, setOpportunityTypes] = useState([])
    
    useEffect(() => {
    
        ServicesOpportunityTypes.getOpportunity().then((opportunityTypes) => {
            setOpportunityTypes(opportunityTypes)
        })
    }, [])


      const TextFieldEls = [
        {label: 'Descripción', name: 'opportunity_type_description', required: true},
    
    ]
    
    const InputFileEls = [
    ]
    
    const SelectFieldEls  = [
    ]

        const onSubmit = (data) => {
            ServicesOpportunityTypes.create(data)
            .then((op) => {
                setOpportunityTypes([...opportunityTypes, op])
        })
        .catch((error) => {
            console.error(error)
        }
        )
    }


    return (
        <>
            <ButtonDiv>
                <CreateNewForm
                    boton='Crear Tipo de Oportunidad'
                    titulo='Crear Tipo de Oportunidad'
                    TextFieldEls={TextFieldEls}
                    InputFileEls={InputFileEls}
                    SelectFieldEls={SelectFieldEls}
                    onSubmit={onSubmit}
                    
                    />


            </ButtonDiv>


            <List>
                {opportunityTypes.map((el, index) => {
                    return (

            <ListItem disablePadding key={index}>
                <ListItemButton>
                <ListItemText primary={el.opportunity_type_description} />
                </ListItemButton>
            </ListItem>
                    )
                }
                )}

            </List>

        </>

    )
}

export default OpportunityParam