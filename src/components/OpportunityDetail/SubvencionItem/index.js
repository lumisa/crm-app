import { SubItem, Row } from './styles'
import StageChip from '../../UI/StageChip'
import BurgerIconDelete from '../../UI/BurgerIconDelete'
import RowEditable from '../../UI/RowEditable'
import Documentacion from '../../AccountDetail/Documentacion'
import ServiceStage from '../../../services/ServiceStage'

const SubvencionItem = (props) => {

    const {
        title,
        id,
        opportunityId,
        deleteOportunity,
        ccaa,
        autorizacion_file,
        formulario,
        updateSubvencion,
        tramiteNumber,
        presentacionDate,
        declaracion_file,
        acreditacion_file,
        acuso_recibo_file
    } = props

    const handleOnSubmit = (propertyName, value) => {


        updateSubvencion(propertyName, value)

    }

    const urlCatalunya = () => {
        if (ccaa.toLowerCase() === 'catalunya')
            return <a href='https://ovt.gencat.cat/carpetaciutadana360#/consulta' target='_blank'>Consulta estado Catalunya</a>

    }

    const editable = [
        {propertyName: 'opportunityId', label: 'Oportunidad id', value: opportunityId, type: 'text', editable: false},
        {propertyName: 'ccaa', label: 'CCAA', value: ccaa, type: 'text', editable: true},
        {propertyName: 'tramite_number', label: 'Número trámite', value: tramiteNumber, type: 'text', editable: true},
        {propertyName: 'presentacionDate', label: 'Fecha presentación', value: presentacionDate, type: 'date', editable: true},
    ]

    const documentacion = [
        {propertyName: 'formulario', label: 'formulario', attached: formulario ? true : false, path: formulario},
        {propertyName: 'declaracion_file', label: 'Declaración', attached: declaracion_file ? true : false, path: declaracion_file},
        {propertyName: 'autorizacion_file', label: 'Autorización', attached: autorizacion_file ? true : false, path: autorizacion_file},
        {propertyName: 'acreditacion_file', label: 'Proyecto técnico', attached: acreditacion_file ? true : false, path: acreditacion_file},
        {propertyName: 'acuso_recibo_file', label: 'Acuse de recibo', attached: acuso_recibo_file ? true : false, path: acuso_recibo_file},
    ]



    return (
        <SubItem>
            <Row>
                <h3>{title}</h3>

                {/* <StageChip text={stage} /> */}

                <BurgerIconDelete deleteItem={deleteOportunity}/>
            </Row>
            {urlCatalunya()}
            {editable.map((item, i) => (
                <RowEditable
                key={`subvencion-editable` + i}
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

export default SubvencionItem