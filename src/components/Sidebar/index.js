import { SidebarStyled } from './styles'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const menuItem = [
        {
            name: 'Cuentas',
            icon: <HomeIcon />,
            link: '/',
        },
        {
            name: 'Contactos',
            icon: <PersonIcon />,
            link: '/contact',
        },
        {
            name: 'Parametrizable',
            icon: <PersonIcon />,
            link: '/parametrizable',
        },
        {
            name: 'Oportunidades',
            icon: <PersonIcon />,
            link: '/opportunity',
        },
        {
            name: 'Presupuesto',
            icon: <PersonIcon />,
            link: '/presupuesto',
        }
    ]

    return (
        <SidebarStyled>
            <nav>
                <List>
                    {menuItem.map((item) => (
                        <ListItem disablePadding key={item.name}>
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