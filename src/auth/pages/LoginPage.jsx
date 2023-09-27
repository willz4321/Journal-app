import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useAuthStore, useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { checkingAuthentication } from '../../store/auth/thunks';
import { useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';

  const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
  }

export const LoginPage = () => {

  const {starLogin, errorMenssage} = useAuthStore();

  const {status} = useSelector( state => state.auth);

  const isAuthenticating = useMemo( () => status === 'checking', [status]);
  const dispacth = useDispatch();

  const {loginEmail, loginPassword, onInputChange: onLoginInputChange} = useForm(loginFormFields);

  const onLoginSubmit = (event) => {

    event.preventDefault();
    starLogin({correo: loginEmail, password: loginPassword})
    dispacth(checkingAuthentication());
    
  }

  useEffect(() => {
     
    if(errorMenssage !==undefined){
        Swal.fire('Error en la autenticacion', errorMenssage, 'error')
    }
  }, [errorMenssage])

  return (
    <AuthLayout title="Login">
      <form onSubmit={onLoginSubmit}>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name='loginEmail'
                value={loginEmail}
                onChange={ onLoginInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='loginPassword'
                value={loginPassword}
                onChange={ onLoginInputChange }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button disabled={isAuthenticating} type='submit' variant='contained' fullWidth>
                  Login
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
