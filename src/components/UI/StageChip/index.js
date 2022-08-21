import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import { blue } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Stage from '../../../services/ServiceStage'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const expression = [
  {description: 'rechazado', color: 'error', icon: <CancelIcon />},
  {description: 'aceptado', color: 'success', icon: <CheckCircleIcon />},
]

export default function IconChips({stageId, propertyName, handleOnSubmit}) {
  const [stages, setStages] = useState([])

  const [anchorEl, setAnchorEl] = useState(null);
  const [text, setText ] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [attr, setAttr] = useState({})

  const open = Boolean(anchorEl);
  
  useEffect(() => {
    
    Stage.getStages()
    .then((stages) => {
      const selectedDescription = stages.filter((el) => el.id === stageId)[0].stage_description
        setStages(stages)
        console.log(selectedDescription)
        setText(selectedDescription)
        const getAttr = expression.filter((el) => el.description === selectedDescription)[0]
        setAttr(getAttr)
    })
    .catch((err) => {
        console.error(err)
    })

  }
  , [stageId]);
  
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuItemClick = (optionId) => {
    const selectedDescription = stages.map((el) => el.id === optionId && el.stage_description)
    setText(selectedDescription)
    handleOnSubmit(propertyName, {value: optionId});
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  const iconWithColor = () => {
    console.log(attr)

    if (attr) {
      return <Chip icon={attr.icon} label={text} color={attr.color} />
    }
    else {
      return <Chip icon={<FaceIcon/>} label={text} color='primary' />
    }
  }

  return (

    <>


      <Button onClick={handleClickListItem}>
      <Stack direction="row" spacing={1}>
        {iconWithColor()}
      </Stack>


      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {stages.map((option, index) => (
          <MenuItem
            key={option.id}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(option.id)}
          >
            {option.stage_description}
          </MenuItem>
        ))}
      </Menu>
    
    </>
  );
}