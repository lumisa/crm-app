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


    
    if (contact) {
        const contactData = [
            {propertyName: 'full_name', label: 'Nombre cliente', value: contact.full_name ? contact.full_name : '', type: 'text', editable: true},
            {propertyName: 'phone', label: 'Teléfono', value: contact.phone ? contact.full_name : '', type: 'text', editable: true},
            {propertyName: 'email', label: 'Email', value: contact.email ? contact.email : '', type: 'text', editable: true},
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
    else
    {

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
                <Button variant="text" onClick={handleOpen}>Añadir contacto existente</Button>
                <CreateNewForm
                boton='Añadir contacto nuevo'
                titulo='Crear nuevo contacto'
                TextFieldEls={TextFieldEls}
                InputFileEls={InputFileEls}
                SelectFieldEls={SelectFieldEls}
                onSubmit={handleSubmitNewContact}
                
                />
            </Stack>

            <AddContactModal
            open={open}
            handleClose={handleClose}
            handleSubmit={(selectedPersonId) => handleSubmitAddContact(selectedPersonId)}
            
            />

            </>
        )
    }



}

export default ContactComponent