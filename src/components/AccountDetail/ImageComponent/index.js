import {useState} from 'react'
import { ImgSpan, ImageStyleDiv } from '../styles'
import UploadModal from '../../UI/UploadModal'
import AccountService from '../../../services/ServiceAccount'

const ImageComponent = ({src, accountId}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    const handleSubmit = (event) => {
        const files = Array.from(event.target.files);
        const [file] = files;
        const formData = new FormData();
        
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




    return (
        <ImageStyleDiv>
            <ImgSpan src={src} onClick={handleOpen}/>
            <UploadModal open={open} 
            handleClose={handleClose} 
            handleSubmit={handleSubmit}
            label="Imagen"
            propertyName="image"

            />
        </ImageStyleDiv>



    )
}

export default ImageComponent;