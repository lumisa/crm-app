import { SubItem, Row } from './styles'
import StageChip from '../../UI/StageChip'
import BurgerIconDelete from '../../UI/BurgerIconDelete'
import RowEditable from '../../UI/RowEditable'

const SubvencionItem = (props) => {

    const {
        title,
        opportunityId,
        deleteOportunity,
        accountId,
        updateSubvencion,
    } = props

    const handleOnSubmit = (propertyName, value) => {


        updateSubvencion(propertyName, value)

    }

    const editable = [
        {propertyName: 'accountId', label: 'cuenta id', value: accountId, type: 'text', editable: false},
        {propertyName: 'opportunityId', label: 'Oportunidad id', value: opportunityId, type: 'text', editable: false},
    ]

    return (
        <SubItem>
            <Row>
                <h3>{title}</h3>

{/*                 <StageChip text={stage} options={stages}/>
 */}
                <BurgerIconDelete deleteItem={deleteOportunity}/>
            </Row>
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