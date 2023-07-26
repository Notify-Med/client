import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../theme';
import InputBase from '@mui/material';
import  LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import  DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import  NotificationsModeOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import  PersonModeOutlinedIcon from '@mui/icons-material/PersonOutlined';

const Navbar = () => {
    const theme = useTheme();
    const colors =tokens(theme.palette.mode);
    const colorMode =useContext(ColorModeContext);

  return (  
    <Box display="flex" justifyContent="space-between" p={2}>
        <h2>NotifyMed</h2>

        <Box>
            <IconButton onClick={colorMode.toggleColorMode}> 
            {theme.palette.mode === 'dark' ? (
                <LightModeOutlinedIcon />
            ) : (
                <DarkModeOutlinedIcon />
            )}
            </IconButton>
            <IconButton>
                <NotificationsModeOutlinedIcon />
            </IconButton>
            <IconButton>
                <PersonModeOutlinedIcon />
            </IconButton> 
        </Box>
    </Box>
  )
} 

export default Navbar
