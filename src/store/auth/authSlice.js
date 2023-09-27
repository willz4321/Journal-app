import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated',
   user : {},
    errorMenssage: undefined,
        }, 
  reducers: {

    onlogin: (state, {payload}) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMenssage = undefined;
   },
   onLogut: (state, {payload}) => {
    state.status = "not-authenticated";
    state.user = {};
    state.errorMenssage = payload;
   },
   checkingCredentials: (state) => {
       state.status = "checking";
       state.user = {};
       state.errorMenssage = undefined;
   },
   clearErrorMessage: (state) => {
        state.errorMenssage = undefined;
   }   
  }
});

export const {
  onlogin,
  onLogut,
  clearErrorMessage,
  checkingCredentials,
} = authSlice.actions;
