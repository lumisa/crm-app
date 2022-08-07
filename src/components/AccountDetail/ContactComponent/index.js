import { useState } from 'react'
import RowEditable from '../../UI/RowEditable'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddContactModal from '../../UI/AddContactModal'
import CreateNewForm from '../../UI/CreateNewForm';
import ContactService from '../../../services/ServiceContact'

const ContactComponent = ({contact, handleOnSubmitContact}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmitAddContact = (selectedPersonId) => {
        handleOnSubmitContact(selectedPersonId)
        
    }

    const handleSubmitNewContact = (data) => {
        ContactService.create(data).then((contact) => {
            handleOnSubmitContact(contact.id)

        })
        .catch((error) => {
            console.error(error)
        }
        )
    }

    const conditionDisplay = () => {
        if (contact) {
            const contactData = [
                {propertyName: 'full_name', label: 'Nombre cliente', value: contact.full_name ? contact.full_name : '', type: 'text', editable: false},
                {propertyName: 'phone', label: 'Teléfono', value: contact.phone ? contact.full_name : '', type: 'text', editable: false},
                {propertyName: 'email', label: 'Email', value: contact.email ? contact.email : '', type: 'text', editable: false},
            ]
            
            return (
        
                <>
        
                {contactData.map((el) => 
        
                    <RowEditable
                    key={el.propertyName}
                    propertyName={el.propertyName}
                    label={el.label}
                    value={el.value}
                    type={el.type}
                    editable={el.editable}
                    handleOnSubmit={(propertyName, value) => handleOnSubmitContact(propertyName, value)}
                    />
        
        
                            
                )}
                
                
                </>
            )
        }
    
    }

    const newContactButton = () => {
        <AddContactModal
        open={open}
        handleClose={handleClose}
        handleSubmit={(selectedPersonId) => handleSubmitNewContact(selectedPersonId)}
        />
    }

    const TextFieldEls = [
        {label: 'Nombre Completo', name: 'full_name', required: true},
        {label: 'Teléfono', name: 'phone', required: true},
        {label: 'Email', name: 'email', required: true},    
    
    ]
    
    const InputFileEls = []
    
    const SelectFieldEls  = []

    return (

        <>
            <Stack spacing={2} direction="row">
                <Button variant="text" onClick={handleOpen}>{contact ? 'Cambiar contacto' : 'Añadir contacto existente'}</Button>
                {contact ? newContactButton() : null}
            </Stack>
            <AddContactModal
                open={open}
                handleClose={handleClose}
                handleSubmit={(selectedPersonId) => handleSubmitAddContact(selectedPersonId)}
                />
            {conditionDisplay()}
        
        </>


    )
    



}

export default ContactComponent