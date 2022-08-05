import React, { useState, useEffect } from 'react'
import OpportunityService from '../../services/ServiceOpportunity'
import OpportunityTypes from '../../services/ServiceOpportunityTypes'
import Stage from '../../services/ServiceStage'
import { useParams } from "react-router-dom";
import { Main, Header, Panel1, Panel2, Panel3, Row, Item } from "./styles"
import SubvencionComponent from './Subvencion';
import ActivitiesComponent from '../AccountDetail/Activities';
import RowEditable from '../UI/RowEditable'
import Tramites from '../Tramites'
import TimelineComponent from '../UI/Timeline'

const OpportunityDetail = () => {
    const [opportunity, setOpportunity] = useState({})
    const [opportunityTypes, setOpportunityTypes] = useState([])
    const [stages, setStages] = useState([])
    let { id } = useParams()

    useEffect(() => {
        OpportunityService.getOpportunityDetail(id)
        .then((elements) => {
            setOpportunity(elements)
    
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

    const editable = [
        {propertyName: 'description', label: 'descripción', value: opportunity.description, type: 'text', editable: true},
        {propertyName: 'closing_date', label: 'Fecha cierre', value: opportunity.closingDate, type: 'date', editable: true},
        {propertyName: 'probability', label: 'Probabilidad', value: opportunity.probability, type: 'number', editable: true},
        {propertyName: 'amount', label: 'Importe', value: opportunity.amount, type: 'number', editable: true},
        {propertyName: 'createdAt', label: 'Creado', value: opportunity.createdAt, type: 'date', editable: false},
    ]

    const updateOpportunity = (id, propertyName, value) => {

        //let withNew = opportunities.filter((opportunities) => { return opportunities.id == id})

        OpportunityService.update(id, { [propertyName]: value.value })
    }





    return (
        <div>

        <Main>
        <Header>
                <Row>
                    <h2>{opportunity.title} </h2>
{/*                    {descriptionArray.map((stage) =>  <StageChip text={stage}/>)} */}
                </Row>
                
            </Header>

            
        <Panel1>
        <Item>

            <h2> Información básica </h2>

            {editable.map((el) => 
            <RowEditable
            key={el.propertyName}
            propertyName={el.propertyName}
            label={el.label}
            value={el.value}
            type={el.type}
            editable={el.editable}
            handleOnSubmit={(propertyName, value) => updateOpportunity(el.id, propertyName, value)}
            />
            )}

            </Item>

            <TimelineComponent/>

        </Panel1>

        <Panel3>
            <SubvencionComponent
            key={opportunity.id}
            opportunityId={opportunity.id}
            />

        <Tramites/>

        </Panel3>

        <Panel2>
        <ActivitiesComponent
                    key={opportunity.id}
                    accountId={opportunity.account_id} 
                />

        </Panel2>

        </Main>
        </div>
    )}

export default OpportunityDetail;