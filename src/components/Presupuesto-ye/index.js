import { useState, useEffect } from 'react'
import {Container, Header } from '../UI/Layout/styles'
import Lineas from './Lineas';
import DatosCliente from './DatosCliente'
import DatosInstalacion from './DatosInstalacion'
import DatosPago from './DatosPago'
import PrecioEnergia from './PrecioEnergia';
import * as Presupuesto from './Classes/Presupuesto'

const PresupuestoIndex = () => {

    const [ tension, setTension ] = useState({tension: 'monofasico'})

    const tensionType = [
        {value: "monofasico", checked: true},
        {value: "trifasico", checked: false},
    ]

    const updatePresupuesto = () => {

        /* presupuestoUd, update */

        const presupuestoData = new Presupuesto()


    }

    return (

        <Container>
            <Header>
                <h2>Estudio Solar</h2>    
            </Header>
            <div>
                {tensionType.map((el) => (
                    <input type="radio" name="tension" value={el.value} checked={el.checked ? true : false}/>

                ))}


                <Lineas/>
                <PrecioEnergia/>
                <DatosCliente/>
                <DatosInstalacion/>
                <DatosPago/>
                <Adjuntos/>


            </div>



        </Container>



    )
}

export default Presupuesto;