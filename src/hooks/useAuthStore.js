import { useDispatch, useSelector } from "react-redux"
import { authApi } from "../api";
import { checkingCredentials, clearErrorMessage, clearNoteLogOut, onLogut, onlogin } from "../store";

export const useAuthStore = () => {

    const {status, user, errorMenssage} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const starLogin = async({correo, password}) => {
   
        dispatch(checkingCredentials());
           
        try {
            
            const {data} = await authApi.post('login', { correo, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
           dispatch(onlogin({ id: data.id, name: data.userName, email: data.correo }))

        } catch (error) {
            console.log("Error de backend: " + error) 
            dispatch(onLogut(error.response.data))
            setTimeout(() => {
                dispatch( clearErrorMessage);
            },10);
        }
    }

    const starLogout = async() =>{
          localStorage.clear();
          dispatch(clearNoteLogOut())
          dispatch(onLogut());
    }

    const starRegister = async({userName, email, password}) => {

           dispatch(checkingCredentials());

           try {

            const {data} = await authApi.post('register',{correo: email, userName, password})
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onlogin({ id:data.id, name: data.userName, email: data.correo}))
               
           } catch (error) {
                dispatch(onLogut(error.response.data))
                setTimeout(() => {
                    dispatch( clearErrorMessage);
                },10);
           }
    }

    
        const checkAuthToken = async() => {
            const token = localStorage.getItem('token');
            if(!token) return dispatch(onLogut());

            try {
                const {data} = await authApi.get('renew');
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch(onlogin({ id:data.id, name: data.userName, email: data.correo}))
            } catch (error) {
                console.log(error)
                localStorage.clear();
                dispatch(onLogut());
            }
        }

    return {
        //* Propiedades
        errorMenssage,
        status,
        user,

        //* Metodos
        starLogin,
        starLogout,
        starRegister,
        checkAuthToken
    }
}