import { useRef } from 'react'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

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
const UploadModal = ({open, handleClose, handleSubmit, label, propertyName}) => {
    const ref = useRef();


    return (
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



    )
}

export default UploadModal