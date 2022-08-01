import { useState, createRef, useRef } from 'react'
import RowInfo from '../../UI/RowInfo'
import { RowStyle } from '../../UI/RowInfo/styles'
import {Label} from '../../UI/Label'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AccountService from '../../../services/ServiceAccount'
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

const Documentacion = ({accountId, attached, path, label, propertyName}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const ref = useRef();

    console.log(propertyName);
    
    
    const handleSubmit = (event) => {
        const files = Array.from(event.target.files);
        const [file] = files;
        const formData = new FormData();
        console.log(event.target.name);
        
        formData.append(event.target.name, file);
            

        AccountService.updateFile(accountId, formData).then(res => {
            console.log(res);
            handleClose();
        }
        ).catch(err => {
            console.log(err);
        }
        );
        
    }

    if (attached === true) {

        return (
            <RowInfo text={label} description = 
            {<a href={path} target="_blank">
                <InsertDriveFileIcon/>
            </a>}/>


        )
    }
    else
    {
        return (

            
            <RowStyle>
            <Label text={label}/>
            <Button onClick={handleOpen}><UploadFileIcon/></Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                
                    <InputLabel>{label}</InputLabel>
                    <Input
                    ref={ref}
                    size="small"
                    label={label} 
                    name={propertyName} 
                    type="file" 
                    fullWidth={true}
                    onChange={(e) => handleSubmit(e)}
                    />
                    <Button type="submit">Submit</Button>
                </Box>
            </Modal>


        
        </RowStyle>
        )


}
}

export default Documentacion;