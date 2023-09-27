import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useAuthStore } from '../../hooks';


export const NavBar = ({ drawerWidth = 240 }) => {
    
    const {starLogout} = useAuthStore();

  return (
    <AppBar 
        position='fixed'
        sx={{ 
            width: { sm: `calc(100% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }px` }
         }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                <IconButton color='error' onClick={starLogout}>
                    <LogoutOutlined />
                </IconButton>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}
