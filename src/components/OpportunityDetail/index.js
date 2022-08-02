import React, { useState, useEffect } from 'react'
import OpportunityService from '../../services/ServiceOpportunity'
import OpportunityTypes from '../../services/ServiceOpportunityTypes'
import Stage from '../../services/ServiceStage'
import { useParams } from "react-router-dom";
import { Main, Header, Panel1, Panel2, Panel3, Row } from "./styles"
import SubvencionComponent from './Subvencion';
import ActivitiesComponent from '../AccountDetail/Activities';

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

            <SubvencionComponent
            key={opportunity.id}
            opportunityId={opportunity.id}
            />

        </Panel1>

        <Panel3></Panel3>

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