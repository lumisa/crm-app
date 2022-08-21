import { useState } from 'react'
import { RowStyle } from '../../UI/RowInfo/styles'
import {Label} from '../../UI/Label'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ServiceSubvencion from '../../../services/ServiceSubvencion'
import UploadModal from '../../UI/UploadModal'


const Documentacion = ({id, attached, path, label, propertyName}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    const handleSubmit = (event) => {
        const files = Array.from(event.target.files);
        const [file] = files;
        const formData = new FormData();
        
        formData.append(event.target.name, file);
            

        ServiceSubvencion.updateFile(id, formData).then(res => {
            console.log(res);
            handleClose();
        }
        ).catch(err => {
            console.log(err);
        }
        );
        
    }

    const openFile = () => (
    <a href={path} target="_blank">
            <InsertDriveFileIcon/>
        </a>

    )

        return (
            
            <RowStyle>
            <Label text={label}/>
            {attached === true && openFile()}
            <Button onClick={handleOpen}><UploadFileIcon/></Button>
            
            <UploadModal 
            open={open} 
            handleClose={handleClose} 
            handleSubmit={handleSubmit}
            label={label}
            propertyName={propertyName}
            />

        
        </RowStyle>
        )


}

export default Documentacion;