import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../theme';
import Button from '@mui/material/Button';
import  LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import  DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import  NotificationsModeOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import  PersonModeOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    // NAVIGATION
    const navigate = useNavigate(); // Get the navigation function
    // Navigate to the '/register' route
    const RegisterRoute = () => {
        navigate('/register'); 
    };
    // Navigate to the '/register' route
    const LoginRoute = () => {
        navigate('/login'); 
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);


    const outlinedButtonColor = colors.primary[100]; 
    const buttonTextcolor = colors.primary[100]; 
    const outlinedButtonStyle = {
        borderColor: outlinedButtonColor,
        color: buttonTextcolor,
      };
      

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
            <Button variant="text" style={{ color: buttonTextcolor }} onClick={LoginRoute}>Log In</Button>
            <Button variant="outlined" style={outlinedButtonStyle} onClick={RegisterRoute}>Register</Button>
        </Box>
    </Box>
  )
} 

export default Navbar
