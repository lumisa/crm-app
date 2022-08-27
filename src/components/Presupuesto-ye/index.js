import { useState, useEffect } from 'react'
import {Container, Header } from '../UI/Layout/styles'
import Lineas from './Lineas';
import DatosCliente from './DatosCliente'
import DatosInstalacion from './DatosInstalacion'
import DatosPago from './DatosPago'
import PrecioEnergia from './PrecioEnergia';
import Adjuntos from './Adjuntos'

const PresupuestoIndex = () => {

    const [ tension, setTension ] = useState({tension: 'monofasico'})

    const tensionType = [
        {value: "monofasico", checked: true},
        {value: "trifasico", checked: false},
    ]

    return (

        <Container>
            <Header>
                <h2>Estudio Solar</h2>    
            </Header>
            <div>
                {tensionType.map((el) => (
                    <>
                        <input type="radio" name="tension" value={el.value} defaultChecked={el.checked ? true : false}/> {el.value}
                    </>

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

export default PresupuestoIndex;