import React, { useState, useEffect } from 'react'
import OpportunityService from '../../../services/ServiceOpportunity'
import OpportunityTypes from '../../../services/ServiceOpportunityTypes'
import Opportunity from '../Opportunity'
import { Row } from '../styles'
import AddIcon from '@mui/icons-material/Add';
import { dateFormatter } from '../../../utils/date'
import CreateNewForm from '../../UI/CreateNewForm'
import Stage from '../../../services/ServiceStage'


const OpportunitiesComponent = ({accountId}) => {
    const [opportunities, setOpportunities] = useState([])
    const [opportunityTypes, setOpportunityTypes] = useState([])
    const [stages, setStages] = useState([])

    useEffect(() => {
        OpportunityService.getOpportunity()
        .then((elements) => {
            const filteredById = elements.filter((el) => { return el.account_id === accountId})
            setOpportunities(filteredById)
    
        })
        .catch((error) => {
            console.error(error);
        })
    
    
        OpportunityTypes.getOpportunity()
        .then((opportunityTypes) => {
            setOpportunityTypes(opportunityTypes)
        })
        .catch((err) => {
            console.error(err)
        })
    
        Stage.getStages()
        .then((stages) => {
            setStages(stages)
        })
        .catch((err) => {
            console.error(err)
        })

    }, [])




    const handleOnSubmit = (data) => {

        let dataX = {...data, account_id: accountId}
        OpportunityService.create(dataX).then(() => {
            let withNew = [...opportunities];
            withNew.push(dataX)
            setOpportunities(withNew)
        })
    
    }

    const deleteOportunity = (id) => {
        OpportunityService.remove(id).then(() => {
            let without = opportunities.filter((opportunities) => { return opportunities.id !== id})
            setOpportunities(without)
        }).catch((error) => {
            console.error(error)
        })
    }

    const updateOpportunity = (id, propertyName, value) => {

        //let withNew = opportunities.filter((opportunities) => { return opportunities.id == id})

        OpportunityService.update(id, { [propertyName]: value.value })
    }

    const TextFieldEls = [
        {label: 'Titulo', name: 'title', required: true},
        {label: 'Descripción', name: 'description', required: false},
        {label: 'Fecha de cierre', name: 'closing_date', required: false, type: 'date'},
    
    ]
    
    const InputFileEls = [
        /* {label: 'Presupuesto', name: 'quotation', required: false}, */
    ]
    
    const SelectFieldEls  = [
        {label: 'Tipo oportunidad', name: 'opportunity_type_id', required: true, options: opportunityTypes.map((opportunityType) => {return {value: opportunityType.id, label: opportunityType.opportunity_type_description}})},
        {label: 'Estado', name: 'stage_id', required: true, options: stages.map((stage) => ({value: stage.id, label: stage.stage_description}))},
    ]

    return (

        <>

        
            <Row key={accountId}>
                <h2> Oportunidades </h2>

                <CreateNewForm
                key='create-opportunity'
                boton={<AddIcon/>}
                titulo='Crear Oportunidad'
                TextFieldEls={TextFieldEls}
                InputFileEls={InputFileEls}
                SelectFieldEls ={SelectFieldEls}
                onSubmit={handleOnSubmit}
                />

            </Row>


            {opportunities.map((opportunity) =>

            (

                <Opportunity
                    key={opportunity.id}
                    title={opportunity.title}
                    description={opportunity.description}
                    closingDate={opportunity.closing_date}
                    createdAt={opportunity.createdAt}
                    probability={opportunity.probability}
                    amount={opportunity.amount}
                    AddIcon={dateFormatter(opportunity.createdAt)}
                    id={opportunity.id}
                    opportunityType={opportunityTypes.map((opportunityType) => opportunityType.id === opportunity.oportunity_type_id ? opportunityType.oportunity_type_description : null)}
                    stageId={opportunity.stage_id}
                    deleteOportunity={() => deleteOportunity(opportunity.id)}
                    updateOpportunity={(propertyName, value) => updateOpportunity(opportunity.id, propertyName, value)}
                />
            )

            
            )}
        
        </>

    )
}

export default OpportunitiesComponent