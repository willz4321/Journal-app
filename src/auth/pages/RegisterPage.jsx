import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useAuthStore, useForm } from '../../hooks';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

const formData = {
  email: "",
  password: "",
  displayName: "",
}

const formValidations = {
  email: [(value) => value.includes("@"), 'El correo debe tener una @'],
  password: [(value) => value.length >= 6, 'El password debe tener mas de 6 letras.'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const {starRegister, errorMenssage}  = useAuthStore();
  const [formSubmitted, setformSubmitted] = useState(false);

  const { displayName, email, password, onInputChange,
           displayNameValid, emailValid, passwordValid
        } = useForm(formData,formValidations);

  const onRegisterSubmit = (ev) => {
    ev.preventDefault();
    starRegister({userName: displayName, email: email, password});
    setformSubmitted(true)
  }

  useEffect(() => {
     
    if(errorMenssage !==undefined){
        Swal.fire('Error en la autenticacion', errorMenssage, 'error')
    }
  }, [errorMenssage])
     
  
  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onRegisterSubmit}>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name='displayName'
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name='email'
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button type='submit' variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
