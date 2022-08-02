import React from 'react'
import RowEditable from '../../UI/RowEditable'
import { OpItem, Row } from './styles'
import BurgerIconDelete from '../../UI/BurgerIconDelete'
import StageChip from '../../UI/StageChip'

const Opportunity = (props) => {

    const {
        title,
        description,
        closingDate,
        probability,
        amount,
        createdAt,
        id,
        stage,
        stages,
        key,
        deleteOportunity,
        opportunityType,
        updateOpportunity,
    } = props

    const editable = [
        {propertyName: 'opportunity_type_id', label: 'Oportunidad', value: opportunityType, type: 'text', editable: false},
        {propertyName: 'description', label: 'descripción', value: description, type: 'text', editable: true},
        {propertyName: 'closing_date', label: 'Fecha cierre', value: closingDate, type: 'date', editable: true},
        {propertyName: 'probability', label: 'Probabilidad', value: probability, type: 'number', editable: true},
        {propertyName: 'amount', label: 'Importe', value: amount, type: 'number', editable: true},
        {propertyName: 'createdAt', label: 'Creado', value: createdAt, type: 'date', editable: false},
    ]

    const handleOnSubmit = (propertyName, value) => {


        updateOpportunity(propertyName, value)

    }



    return (

        <OpItem key={key}>

            <Row>
                <h3>{title}</h3>

                <StageChip text={stage} options={stages}/>

                <BurgerIconDelete deleteItem={deleteOportunity}/>
            </Row>

            {editable.map(item => (
                <RowEditable
                editable={item.editable}
                label= {item.label} 
                propertyName={item.propertyName}
                value= {item.value} 
                type={item.type} 
                handleOnSubmit={(propertyName, value) => handleOnSubmit(propertyName, value)}
                />
            ))}

        </OpItem>

    )
}

export default Opportunity