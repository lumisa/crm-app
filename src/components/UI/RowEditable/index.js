import { useState, useEffect } from 'react'
import { RowStyle } from './styles'
import { Label } from '../Label'
import TextField from '@mui/material/TextField';
import { dateHtml, dateFormatter } from '../../../utils/date'
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

const RowInfo = ({
    label, 
    value, 
    type, 
    handleOnSubmit, 
    propertyName, 
    editable
}) => {

    const [name, setName] = useState(value);
    const [isNameFocused, setIsNamedFocused] = useState(false);

    useEffect(() => {
        setName(value);
    }
    , [value]);

    const handleChange = () => {
        
        setIsNamedFocused(false);
        handleOnSubmit(propertyName, {value: name})
    }

    const handleOnSave = () => {
        
        setIsNamedFocused(false);
        handleOnSubmit(propertyName, {value: name})
    }

    return (

        <RowStyle>
            <Label text={label}/>

            {!isNameFocused || editable === false? (
                <p
                onClick={() => {
                    setIsNamedFocused(true);
                }}
                >
                {type === 'date' ? dateFormatter(name) : name}
                </p>
            ) : (
                <TextField
                size="small"
                type={type ? type : 'text'}
                autoFocus
                value={type === 'date' ? dateHtml(name) : name}
                onChange={event => setName(event.target.value)}
                onBlur={event => handleOnSave(event)}
                />
            )}

            { editable === true ? 
            <Button onClick={() => setIsNamedFocused(true)}>
                <EditIcon fontSize="small" color="grey" />
                </Button>
                 : null }
        </RowStyle>

    )

}

export default RowInfo