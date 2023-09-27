import { DeleteOutline, SaveOutlined, Title, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components'
import { useForm, useNoteStore } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { setActiveNote } from '../../store';
import Swal from 'sweetalert2';

export const NoteView = () => {

  const dispatch = useDispatch();  
  const {startSaveNotes, startUploadingFiles, startDeletingNote} = useNoteStore();

  const {active: note, messageSaved, isSaving} = useSelector(state => state.journal);
  const {body, title, onInputChange, formState, imageUrls} = useForm(note);

    const tokenInitDate = new Date(parseInt(localStorage.getItem('token-init-date')));
    const fechaLegible = tokenInitDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }); 

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])
  
  useEffect(() => {
    if (messageSaved.length > 0){
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved])

  const onClicSave = () =>{
       dispatch(startSaveNotes)
  }

  const onFileInputChange = ({ target }) => {
     if(target.files === 0) return;
   
   //  dispatch(startuploadingFiles(target.files))
     dispatch( startUploadingFiles(target.files) );
  }

  const onDelete = () => {
     dispatch(startDeletingNote)
  }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' > {fechaLegible} </Typography>
        </Grid>
        <Grid item>

           <input 
              type="file"
              multiple
              ref={fileInputRef}
              onChange={onFileInputChange}
              style={{display: 'none'}}
              />

              <IconButton
                 color='primary'
                 disabled={ isSaving }
                 onClick={ () => fileInputRef.current.click() }
              >
                <UploadOutlined />
              </IconButton>

            <Button 
            color="primary" 
            sx={{ padding: 2 }}
            disabled={isSaving}
            onClick={onClicSave} >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name='title'
                value={title}
                onChange={onInputChange}
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name='body'
                value={body}
                onChange={onInputChange}
            />
        </Grid>

          <Grid container justifyContent='end'>
            <Button
              onClick={onDelete}
              sx={{mt: 2}}
              color='error'
             >
                 <DeleteOutline/>
                 Borrar
            </Button>
          </Grid>

        {/* Image gallery */}
        <ImageGallery images={note.imageUrls} />

    </Grid>
  )
}
