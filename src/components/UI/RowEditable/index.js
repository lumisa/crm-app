import { useState, useEffect } from 'react'
import { RowStyle } from './styles'
import { Label } from '../Label'
import TextField from '@mui/material/TextField';


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

    return (

        <RowStyle>
            <Label text={label}/>

            {!isNameFocused || editable === false ? (
                <p
                onClick={() => {
                    setIsNamedFocused(true);
                }}
                >
                {name}
                </p>
            ) : (
                <TextField
                size="small"
                type={type ? type : 'text'}
                autoFocus
                value={name}
                onChange={event => setName(event.target.value)}
                onBlur={event => handleChange(event)}
                />
            )}
        </RowStyle>

    )

}

export default RowInfo