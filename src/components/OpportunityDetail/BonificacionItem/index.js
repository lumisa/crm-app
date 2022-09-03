import { SubItem, Row } from './styles'
import StageChip from '../../UI/StageChip'
import BurgerIconDelete from '../../UI/BurgerIconDelete'
import EditableInput from '../../UI/EditableInput'
import Documentacion from '../../AccountDetail/Documentacion'
import ServiceStage from '../../../services/ServiceStage'

const BonificacionItem = (props) => {

    const {
        title,
        id,
        municipio,
        tramiteNumber,
        opportunityId,
        formulario,
        updateBonificacion,
        presentacionDate,
    } = props

    const handleOnSubmit = (propertyName, value) => {


        updateBonificacion(propertyName, value)

    }

    const editable = [
        {propertyName: 'opportunityId', label: 'Oportunidad id', value: opportunityId, type: 'text', editable: false},
        {propertyName: 'municipio', label: 'Municipio', value: municipio, type: 'text', editable: true},
        {propertyName: 'tramite_number', label: 'Número trámite', value: tramiteNumber, type: 'text', editable: true},
        {propertyName: 'url_municipio', label: 'Url', value: presentacionDate, type: 'text', editable: true},
        {propertyName: 'presentacionDate', label: 'Fecha presentación', value: presentacionDate, type: 'date', editable: true},
    ]

    const documentacion = [
        {propertyName: 'formulario', label: 'formulario', attached: formulario ? true : false, path: formulario},
    ]



    return (
        <SubItem>
            <Row>
                <h3>{title}</h3>

                {/* <StageChip text={stage} /> */}

{/*                 <BurgerIconDelete deleteItem={deleteOportunity}/> */}
            </Row>
            {editable.map((item, i) => (
                <EditableInput
                key={`bonificacion-editable` + i}
                editable={item.editable}
                label= {item.label} 
                propertyName={item.propertyName}
                value= {item.value} 
                type={item.type} 
                handleOnSubmit={(propertyName, value) => handleOnSubmit(propertyName, value)}
                />
            ))}

            {documentacion.map((el) => 
                    
            <Documentacion
            key={el.propertyName}
            id={id}
            propertyName={el.propertyName}
            label={el.label}
            attached={el.attached}
            path={el.path}
                                
            />
            )}

        </SubItem>
    )


}

export default BonificacionItem