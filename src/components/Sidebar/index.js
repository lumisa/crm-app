import { SidebarStyled } from './styles'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import SolarPowerOutlinedIcon from '@mui/icons-material/SolarPowerOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { Link } from 'react-router-dom';
const Sidebar = () => {

    const menuItem = [
        {
            name: 'Cuentas',
            icon: <SolarPowerOutlinedIcon />,
            link: '/',
        },
        {
            name: 'Contactos',
            icon: <PersonOutlinedIcon />,
            link: '/contact',
        },
        {
            name: 'Parametrizable',
            icon: <SettingsOutlinedIcon />,
            link: '/parametrizable',
        },
        {
            name: 'Oportunidades',
            icon: <CreateNewFolderOutlinedIcon />,
            link: '/opportunity',
        }
    ]

    return (
        <SidebarStyled>
            <nav>
                <List>
                    {menuItem.map((item, index) => (
                        <ListItem disablePadding key={index}>
                            <Link to={item.link}>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    
                    ))}
                </List>
            </nav>

        </SidebarStyled>
    )
}

export default Sidebar;