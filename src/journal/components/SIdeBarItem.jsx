import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { useMemo } from 'react';
import { setActiveNote } from '../../store';
import { useDispatch } from 'react-redux';



export const SIdeBarItem = ({note}) => {
    
    const dispatch = useDispatch();

    const onCliickNote = () => {
        dispatch(setActiveNote(note = {
            title: note.title,
            id: note.id,
            body: note.body,
            imageUrls: note.imageUrls
          }))
    }

    const newTitle = useMemo(() => {
        return note.title.length > 17
            ? note.title.substring(0,17) + '...'
            : note.title;
    }, [note.title])

  return (
    <ListItem disablePadding >
        <ListItemButton onClick={onCliickNote}>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={newTitle}/>
                <ListItemText secondary={ note.body } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
