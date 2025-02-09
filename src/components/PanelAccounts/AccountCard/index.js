
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Contact from "../../../services/ServiceContact"
import { Card, Img, CardBody, Row } from './styles'
import { dateFormatter } from '../../../utils/date'
import RowInfo from '../../UI/RowInfo'
import BurgerIconDelete from '../../UI/BurgerIconDelete'
function AccountCard(props) {


    const {
        image, 
        title, 
        description,
        representation,
        createdAt, 
        id,
        contactId,
        deleteAccount,
        address,
    } = props


    const info = [
        {label: 'Creado', value: dateFormatter(createdAt)},
        {label: 'Dirección', value: address},
        {label: 'Representante', value: representation},
    ]



    return (
            <Card>
                <Img src={image}/>
                <CardBody>
                    <Row>
                        <h2 className="card-text">{<Link to={`/account-detail/${id}`}>{title}</Link>}</h2>

                        <BurgerIconDelete deleteItem={() => deleteAccount(id)}/>
                    </Row>

                    {info.map((el, i) => (

                        <RowInfo key={i} text= {el.label} description={el.value}/>

                    ))}

                </CardBody>
            </Card>

    )
}

export default AccountCard