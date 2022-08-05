import { SubItem, Row } from './styles'
import StageChip from '../../UI/StageChip'
import BurgerIconDelete from '../../UI/BurgerIconDelete'
import RowEditable from '../../UI/RowEditable'

const SubvencionItem = (props) => {

    const {
        title,
        opportunityId,
        deleteOportunity,
        ccaa,
        updateSubvencion,
        tramiteNumber,
        presentacionDate,
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



    return (
        <SubItem>
            <Row>
                <h3>{title}</h3>

{/*                 <StageChip text={stage} options={stages}/>
 */}
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

        </SubItem>
    )


}

export default SubvencionItem