import { useEffect, useState } from 'react'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import Select from '@mui/material/Select';
import ServiceContact from '../../../services/ServiceContact';
import CreateNewForm from '../../UI/CreateNewForm'
import ContactService from '../../../services/ServiceContact'
import TextField from '@mui/material/TextField';
import { RowStyle, Block } from './styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const AddContactModal = ({open, handleClose, handleSubmit}) => {
    const [contacts, setContacts] = useState([]);
    const [selectedPersonId, setSelectedPersonId] = useState([]);

    useEffect(() => {
        ServiceContact.getContact().then(contact => {
            setContacts(contact);
        }).catch(err => {
            console.log(err);
        })}, [])

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
            value.push(options[i].value);
            }
        }
        setSelectedPersonId(value);
    };

    const handleOnClick = () => {

        handleSubmit(selectedPersonId);
        handleClose();
        
    }

    const onSubmit = (data) => {
        ContactService.create(data).then((account) => {
            setContacts([account, ...contacts])
        })
        .catch((error) => {
            console.error(error)
        }
        )
    }
    
    const TextFieldEls = [
        {label: 'Nombre Completo', name: 'full_name', required: true},
        {label: 'Teléfono', name: 'phone', required: true},
        {label: 'Email', name: 'email', required: true},    

    ]




    return (

        
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        
        <Box sx={style}>
            <RowStyle>

                <Block>
                    <h3>Contactos</h3>

                    <Select
                    multiple
                    native
                    value={selectedPersonId}
                    // @ts-ignore Typings are not considering `native`
                    onChange={handleChangeMultiple}
                    label="Native"
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
                    >
                    {contacts.map((name) => (
                        <option key={name.id} value={name.id}>
                        {name.full_name}
                        </option>
                    ))}
                    </Select>
                    
                    <Button type="submit" onClick={() => handleOnClick()}>Submit</Button>

                </Block>


                <Block>
                    <h3>Añadir nuevo Contacto</h3>
                    {TextFieldEls.map(el => 

                        
                    <TextField
                        key={`${el.name}`}
                        size="small"
                        label={el.label} 
                        name={el.name} 
                        fullWidth={true} 
                        required={el.required} 
                        type={el.type ? el.type : 'text'}
                        /*                 onChange={(e) => {
                            setFormInput({...formInput, [e.target.name]: e.target.value})
                        }} */
                        />
                        
                        )}
                    <Button type="submit" onClick={() => onSubmit()}>Submit</Button>

                </Block>
            </RowStyle>




        </Box>
    </Modal>



    )
}

export default AddContactModal