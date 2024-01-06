
import axios from "axios";

const authApi = axios.create({
    baseURL: "https://journal-app-backend-production.up.railway.app/auth/"
})

authApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
})


export default authApi;