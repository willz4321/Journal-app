import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { useNoteStore } from '../../hooks';
import { useEffect } from 'react';


export const JournalPage = () => {

  const dispatch = useDispatch();

   const {startNewNote, getNotes} = useNoteStore();
 
   const {isSaving, active} = useSelector(state => state.journal)

   useEffect(() => {
     getNotes();
   }, [])
   
  return (
    <JournalLayout>
      
      { 
         (!!active)
          ? <NoteView /> 
          : <NothingSelectedView />
      }


      <IconButton
        onClick={startNewNote}
        disabled= {isSaving}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
         }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}
