import RowInfo from '../../UI/RowInfo'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';


const Documentacion = ({attached, path, label, propertyName}) => {

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

        <>
        <InputLabel>{label}</InputLabel>
        <Input
        size="small"
        label={label} 
        name={propertyName} 
        type="file" 
        fullWidth={true}
        />
        
        </>
        )


}
}

export default Documentacion;