import { useEffect, useState } from 'react';
import ServiceStage from '../../../services/ServiceStage';
import CreateNewForm from '../../UI/CreateNewForm';
import { ButtonDiv } from '../../UI/Layout/styles'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const StageParam = () => {
    const [stages, setStages] = useState([])
    
    useEffect(() => {
    
        ServiceStage.getStages()
        .then((els) => {
            setStages(els)
        })
    }, [])


      const TextFieldEls = [
        {label: 'Descripción', name: 'stage_description', required: true},
    
    ]
    
    const InputFileEls = [
    ]
    
    const SelectFieldEls  = [
    ]

        const onSubmit = (data) => {
            ServiceStage.create(data)
            .then((el) => {
                setStages([...stages, el])
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
                    boton='Crear Etapa'
                    titulo='Crear Etapa'
                    TextFieldEls={TextFieldEls}
                    InputFileEls={InputFileEls}
                    SelectFieldEls={SelectFieldEls}
                    onSubmit={onSubmit}
                    />


            </ButtonDiv>
            <List>
                {stages.map((el, index) => {
                    return (

            <ListItem disablePadding key={index}>
                <ListItemButton>
                <ListItemText primary={el.stage_description} />
                </ListItemButton>
            </ListItem>
                    )
                }
                )}

            </List>
        </>

    )
}

export default StageParam