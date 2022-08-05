import { useEffect, useState } from 'react'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import Select from '@mui/material/Select';
import ServiceContact from '../../../services/ServiceContact';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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



    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <InputLabel shrink htmlFor="select-multiple-native">
            Contactos
            </InputLabel>
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
        </Box>
    </Modal>



    )
}

export default AddContactModal