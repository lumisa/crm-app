import React, { useState, useEffect } from 'react'
import { Row } from '../../AccountDetail/styles'
import FormaPago from '../../../services/ServiceFormaPago'

const FormaPagoComponent = ({formaPagoId}) => {

    const [formaPagoObj, setFormaPago] = useState({})

    useEffect(() => {

        if (formaPagoId) {

            FormaPago.getDetail(formaPagoId)
            .then((form) => {
    
                setFormaPago(form)
            })
            .catch((error) => {
                console.error(error)
            })
        }



    }, [formaPagoId])

/*     const handleOnSubmit = (data) => {

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
    } */


    return (
        <div>
            <Row key={`forma-pago`}>
                <h2> Forma de Pago</h2>


            </Row>

            <p>{formaPagoObj.formaPago_description}</p>

        </div>
    )
}

export default FormaPagoComponent;