
import axios from "axios";

const authApi = axios.create({
    baseURL: "http://localhost:8080/auth/"
})

authApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
})


export default authApi;