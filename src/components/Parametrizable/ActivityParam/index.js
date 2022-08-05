import { useEffect, useState } from 'react';
import ServiceActivityTypes from '../../../services/ServiceActivityTypes';
import CreateNewForm from '../../UI/CreateNewForm';
import { ButtonDiv } from '../../UI/Layout/styles'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ServiceActivity from '../../../services/ServiceActivityTypes';
const ActivityParam = () => {

    const [activityTypes, setActivityTypes] = useState([])
    
    useEffect(() => {
    
        ServiceActivity.getActivity()
        .then((els) => {
            setActivityTypes(els)
        })
    }, [])



      const TextFieldEls = [
        {label: 'Descripción', name: 'activity_description', required: true},
    
    ]
    
    const InputFileEls = [
    ]
    
    const SelectFieldEls  = [
    ]

        const onSubmit = (data) => {
            ServiceActivity.create(data)
            .then((el) => {
                setActivityTypes([...activityTypes, el])
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
                    boton='Crear Actividad'
                    titulo='Crear Actividad'
                    TextFieldEls={TextFieldEls}
                    InputFileEls={InputFileEls}
                    SelectFieldEls={SelectFieldEls}
                    onSubmit={onSubmit}
                    />


            </ButtonDiv>
            <List>
                {activityTypes.map((el, index) => {
                    return (

            <ListItem disablePadding key={index}>
                <ListItemButton>
                <ListItemText primary={el.activity_description} />
                </ListItemButton>
            </ListItem>
                    )
                }
                )}

            </List>
        </>

    )
}

export default ActivityParam