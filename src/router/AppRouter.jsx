import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';


export const AppRouter = () => {

 const {status, checkAuthToken}= useAuthStore();

 useEffect(() => {
     checkAuthToken();
 }, [])
 
   if(status === "checking"){
    return (
      <h3>Cargando...</h3>
    )
   }
   
  return (
    <Routes>

        {
          (status === 'not-authenticated')
            ?  <Route path="/auth/*" element={ <AuthRoutes /> } />
            :  <Route path="/*" element={ <JournalRoutes /> } />
        }
        <Route path="/*" element={ <Navigate to='/auth/login'/> } />
    </Routes>
  )
}
