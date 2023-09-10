import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'Journal',
  initialState: {
    status: 'no-authentication',
    uid: null,
    email: null,
    displaName: null,
    photoURL: null,
    errorMenssage: null,
        }, 
  reducers: {

   login: (state, action) => {

   },
   logout: (state, payload) => {

   },
   checkingCredentials: (state) => {
       state.status = "checking";
   }
      
    }
});

export const {
  login,
  logout,
  checkingCredentials
} = authSlice.actions;
