import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import { blue } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';



export default function IconChips({text, options}) {
    const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  const [optionsList, setOptions] = useState([]);

  useEffect(() => {
    setOptions(options);
  }
  , [options]);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

    <>


      <Button onClick={handleClickListItem}>
      <Stack direction="row" spacing={1}>
        <Chip icon={<FaceIcon />} label={text} color="primary" />
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
        {optionsList.map((option, index) => (
          <MenuItem
            key={option.id}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option.stage_description}
          </MenuItem>
        ))}
      </Menu>
    
    </>
  );
}