import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { SIdeBarItem } from './SIdeBarItem';

export const SideBar = ({ drawerWidth = 240 }) => {

    const {name} = useSelector( state => state.auth.user);
    const {notes} = useSelector(state => state.journal)
  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='permanent' // temporary
            open
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                   {name}
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {
                    notes.map( note => (
                        
                            <SIdeBarItem key={note.id} note={note}/>
                        
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}
