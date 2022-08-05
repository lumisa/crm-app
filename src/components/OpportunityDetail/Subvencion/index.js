import React, { useState, useEffect } from 'react'
import Subvencion from '../../../services/ServiceSubvencion'
import { Row } from '../../AccountDetail/styles'
import AddIcon from '@mui/icons-material/Add';
import CreateNewForm from '../../UI/CreateNewForm'
import SubvencionItem from '../SubvencionItem'

const SubvencionComponent = ({opportunityId}) => {

    const [subvenciones, setSubvenciones] = useState([])

    useEffect(() => {

        Subvencion.get()
        .then((subvenciones) => {

            const filteredById = subvenciones.filter((subvencion) => subvencion.opportunity_id === opportunityId)
            setSubvenciones(filteredById)
        })
        .catch((error) => {
            console.error(error)
        })

    }, [])

    const handleOnSubmit = (data) => {

        let dataX = {...data, opportunity_id: opportunityId}
        Subvencion.create(dataX).then(() => {
            let withNew = [...subvenciones];
            withNew.push(dataX)
            setSubvenciones(withNew)
        })
    
    }

    const updateSubvencion = (id, propertyName, value) => {

        //let withNew = opportunities.filter((opportunities) => { return opportunities.id == id})

        Subvencion.update(id, { [propertyName]: value.value })
    }



    const TextFieldEls = [
        {label: 'Fecha presentación', name: 'presentacionDate', type: 'date', required: false},
        {label: 'CCAA', name: 'ccaa', type: 'text', required: false},
    
    ]
    
    const InputFileEls = [
        /* {label: 'Presupuesto', name: 'quotation', required: false}, */
    ]
    
    const SelectFieldEls  = [
/*         {label: 'Tipo oportunidad', name: 'opportunity_type_id', required: true, options: opportunityTypes.map((opportunityType) => {return {value: opportunityType.id, label: opportunityType.opportunity_type_description}})},
        {label: 'Estado', name: 'stage_id', required: true, options: stages.map((stage) => ({value: stage.id, label: stage.stage_description}))},
 */
    ]
    return (
        <div>
            <Row key={`subvencion-${opportunityId}`}>
                <h2> Subveciones </h2>

                <CreateNewForm
                key='create-subvencion'
                boton={<AddIcon/>}
                titulo='Crear Subvencion'
                TextFieldEls={TextFieldEls}
                InputFileEls={InputFileEls}
                SelectFieldEls ={SelectFieldEls}
                onSubmit={handleOnSubmit}
                />

            </Row>
                {subvenciones.map((subvencion, i) => (
                    

                    <SubvencionItem
                    key={`subvencion-${i}`}
                    ccaa={subvencion.ccaa}
                    tramiteNumber={subvencion.tramite_number}
                    opportunityId={subvencion.opportunity_id}
                    presentacionDate={subvencion.presentacionDate}
                    updateSubvencion={(propertyName, value) => updateSubvencion(subvencion.id, propertyName, value)}
                    />
                    
                    
                    
                ))}
        </div>
    )
}

export default SubvencionComponent;