import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Account from '../../services/ServiceAccount'
import Contact from '../../services/ServiceContact'
import { Main, Header, Panel1, Panel2, Panel3, Panel0, Row, Item } from  './styles'
import RowEditable from '../UI/RowEditable'
import ActivitiesComponent from './Activities';
import OpportunitiesComponent from './Opportunities';
import Documentacion from './Documentacion'
import ImageComponent from './ImageComponent'

const AccountDetail = () => {

    const [account, setAccount] = useState({})
    const [contact, setContact] = useState({})
    let { id } = useParams()

    useEffect(() => {

        Account.getAccountDetail(id)
        .then((account) => {
            setAccount(account)

            Contact.getContactDetail(account.contact_id).then((contact) => {
                setContact(contact)
    
            })

            
        })
        .catch((error) => {
            console.error(error)
        })


        


    }, [])


    const infoBasica = [
        {propertyName: 'description', label: 'Descripción', value: account.description, type: 'text', editable: true},
        {propertyName: 'address', label: 'Address', value: account.address, type: 'text', editable: true},
        {propertyName: 'cups_number', label: 'CUPS', value: account.cups_number, type: 'text', editable: true},
        {propertyName: 'consumption_yearly', label: 'Consumo Anual', value: account.consumption_yearly, type: 'text', editable: true},
        {propertyName: 'representation', label: 'Representante', value: account.representation, type: 'text', editable: true},
        {propertyName: 'activity_description', label: 'Actividad', value: account.activity_description, type: 'text', editable: true},
        {propertyName: 'comission_percentage', label: 'Comisión', value: account.comission_percentage, type: 'number', editable: true},
        {propertyName: 'referencia_catastral', label: 'Referencia Catastral', value: account.referencia_catastral, type: 'text', editable: true},
        {propertyName: 'tension', label: 'Tensión', value: account.tension, type: 'text', editable: true},
        {propertyName: 'createdAt', label: 'Fecha de creación', value: account.createdAt, type: 'date', editable: false},
        {propertyName: 'updatedAt', label: 'Fecha de actualización', value: account.updatedAt, type: 'date', editable: false},
    ]

    const contactData = [
        {propertyName: 'full_name', label: 'Nombre cliente', value: contact.full_name, type: 'text', editable: true},
        {propertyName: 'phone', label: 'Teléfono', value: contact.phone, type: 'text', editable: true},
        {propertyName: 'email', label: 'Email', value: contact.email, type: 'text', editable: true},
    ]


    const documentacion = [
        {propertyName: 'CIE_file', label: 'CIE', attached: account.CIE_file ? true : false, path: account.CIE_file},
        {propertyName: 'project_file', label: 'Proyecto técnico', attached: account.project_file ? true : false, path: account.project_file},
        {propertyName: 'memoria_file', label: 'Memoria técnica', attached: account.memoria_file ? true : false, path: account.memoria_file},
        {propertyName: 'factura_file', label: 'Factura', attached: account.factura_file ? true : false, path: account.factura_file},
    ]

    // OpportunityService.update(id, { [propertyName]: value.value })

    const handleOnSubmitAccount = (propertyName, value) => {

        Account.update(account.id, {[propertyName] : value.value})
        .then((account) => {
            setAccount(account)
        })
        .catch((error) => {
            console.error(error)
        }
        )

    }

    const handleOnSubmitContact = (propertyName, value) => {

        Contact.update(contact.id, {[propertyName] : value.value})
        .then((contact) => {
            setContact(contact)
        })
        .catch((error) => {
            console.error(error)
        }
        )

    }
    





    return (

        <Main>
            <Header>
                <Row>
                    <h2>{account.title} </h2>
{/*                    {descriptionArray.map((stage) =>  <StageChip text={stage}/>)} */}
                </Row>
                
            </Header>

            <Panel1>

                <Item>

                    <h2> Información básica </h2>

                    {infoBasica.map((el) => 
                    <RowEditable
                    key={el.propertyName}
                    propertyName={el.propertyName}
                    label={el.label}
                    value={el.value}
                    type={el.type}
                    editable={el.editable}
                    handleOnSubmit={(propertyName, value) => handleOnSubmitAccount(propertyName, value)}
                    />
                    )}
                    
                </Item>

                <Item>
                    <h2> Documentación </h2>

                    {documentacion.map((el) => 
                    
                    <Documentacion
                    key={el.propertyName}
                    accountId={id}
                    propertyName={el.propertyName}
                    label={el.label}
                    attached={el.attached}
                    path={el.path}
                                        
                    />
                
                
                )}


                </Item>

                <Item>
                    <h2> Contacto </h2>

                    {contactData.map((el) =>
                    
                    <RowEditable
                    key={el.propertyName}
                    propertyName={el.propertyName}
                    label={el.label}
                    value={el.value}
                    type={el.type}
                    editable={el.editable}
                    handleOnSubmit={(propertyName, value) => handleOnSubmitContact(propertyName, value)}

                    />
                    )}

                    
                </Item>
                <Item>

                    <h2> Mapa </h2>
                    <div>
                        <div>
                            <iframe width="100%" height="300" id="gmap_canvas" 
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(account.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                            frameBorder="0" 
                            scrolling="no" 
                            marginHeight="0" 
                            marginWidth="0"
                            ></iframe>
                        </div>
                    </div>

                </Item>




            </Panel1>

            <Panel2>
                <OpportunitiesComponent
                key={account.id}
                accountId={account.id}
                />



            </Panel2>


            <ImageComponent src={account.image} accountId={account.id}/>
            <Panel0>
                <ActivitiesComponent
                    key={account.id}
                    accountId={account.id} 
                />


            </Panel0>


                

        </Main>

    )
}

export default AccountDetail