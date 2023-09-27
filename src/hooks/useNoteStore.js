import { useDispatch, useSelector } from "react-redux"
import { journalApi } from "../api"
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNotes, setSaving, updateNote } from "../store"
import { fileUpload } from "../api/fileUpload";


export const useNoteStore = () => {
    
  const { id } = useSelector(state => state.auth.user);
  const {active: note} = useSelector(state => state.journal);

  const dispatch = useDispatch();

  const newNote = {
    title: '',
    body: '',
    imageUrls: [], 
    data: new Date().getTime(),
    }

    const startNewNote = async() => {

     dispatch(savingNewNote());
    
        try {
            const { data } = await journalApi.post( `registerNote/${id}`, newNote);
            newNote.id = data.id;
            dispatch( addNewEmptyNote(newNote))
            dispatch( setActiveNote(newNote))
        } catch (error) {
            console.log(error)
        }
    }
  
    const getNotes = async() => {

      
        if(!id) throw new Error("El uid del usuario no existe");
        console.log(id);

         try {
             const {data} = await journalApi.get(`notes/${id}`)
             dispatch(setNotes(data))
             console.log(data)
         } catch (error) {
            console.log(error);
         }
    }

    const startSaveNotes = async() => {

        const noteToSpring = {...note};
        dispatch(setSaving())
        try {
            const {data} = await journalApi.put(`modifNotes/${noteToSpring.id}`, noteToSpring)
            dispatch(updateNote(note))
            console.log(data)
        } catch (error) {
           console.log(error);
        }
   }
   
    const startUploadingFiles = async(files = [] ) => {
           
        dispatch(setSaving());
        
        
        const fileUploadPromises = [];
        for(const file of files) {
            fileUploadPromises.push( fileUpload(file) )
        }
        const photoUrls = await Promise.all(fileUploadPromises)
          console.log(photoUrls);
          dispatch( setPhotosToActiveNotes(photoUrls) )    
    }

    const startDeletingNote = async() => {
  
         try {
            await journalApi.delete(`deleteNote/${note.id}`)
            dispatch(deleteNoteById(note.id))
         } catch (error) {
            console.log(error)
         }
         
    }

    return {
        startUploadingFiles,
        startDeletingNote,
        startSaveNotes,
        startNewNote,
        getNotes
    }

   
}