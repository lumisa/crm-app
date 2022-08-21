import React, { useState, useEffect } from 'react'
import Bonificacion from '../../../services/ServiceBonificacion'
import { Row } from '../../AccountDetail/styles'
import AddIcon from '@mui/icons-material/Add';
import CreateNewForm from '../../UI/CreateNewForm'
import BonificacionItem from '../BonificacionItem';

const BonificacionComponent = ({opportunityId}) => {

    const [bonificaciones, setBonificaciones] = useState([])

    useEffect(() => {

        Bonificacion.get()
        .then((bonificaciones) => {

            const filteredById = bonificaciones.filter((bonificacion) => bonificacion.opportunity_id === opportunityId)
            setBonificaciones(filteredById)
        })
        .catch((error) => {
            console.error(error)
        })

    }, [])

    const handleOnSubmit = (data) => {

        let dataX = {...data, opportunity_id: opportunityId}
        Bonificacion.create(dataX).then(() => {
            let withNew = [...bonificaciones];
            withNew.push(dataX)
            setBonificaciones(withNew)
        })
    
    }

    const updateBonificacion = (id, propertyName, value) => {

        //let withNew = opportunities.filter((opportunities) => { return opportunities.id == id})

        Bonificacion.update(id, { [propertyName]: value.value })
    }



    const TextFieldEls = [
        {label: 'Fecha presentación', name: 'presentacionDate', type: 'date', required: false},
        {label: 'Municipio', name: 'municipio', type: 'text', required: false},
        {label: 'Url Municipio', name: 'url', type: 'text', required: false},
    
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
            <Row key={`bonificacion-${opportunityId}`}>
                <h2> Bonificaciones </h2>

                <CreateNewForm
                key='create-bonificacion'
                boton={<AddIcon/>}
                titulo='Crear Bonificacion'
                TextFieldEls={TextFieldEls}
                InputFileEls={InputFileEls}
                SelectFieldEls ={SelectFieldEls}
                onSubmit={handleOnSubmit}
                />

            </Row>
                {bonificaciones.map((bonificacion, i) => (

                    <BonificacionItem
                    key={`bonificacion-${i}`}
                    municipio={bonificacion.municipio}
                    tramiteNumber={bonificacion.tramite_number}
                    opportunityId={bonificacion.opportunity_id}
                    id={bonificacion.id}
                    formulario={bonificacion.formulario}
                    presentacionDate={bonificacion.presentacionDate}
                    updateBonificacion={(propertyName, value) => updateBonificacion(bonificacion.id, propertyName, value)}
            
                    />
                    
                    
                    
                ))}
        </div>
    )
}

export default BonificacionComponent;