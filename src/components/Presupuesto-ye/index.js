import {Container, Header } from '../UI/Layout/styles'
import Lineas from './Lineas';
import Rendimiento from './Rendimiento'


const PresupuestoIndex = () => {

    return (

        <Container>
            <Header>
                <h2>Estudio Solar</h2>    
            </Header>
            <div>
                <Lineas/>

                <Rendimiento/>


            </div>



        </Container>



    )
}

export default PresupuestoIndex;