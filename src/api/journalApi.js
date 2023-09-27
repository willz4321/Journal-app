
import axios from "axios";

const journalApi = axios.create({
      baseURL: 'http://localhost:8080/journal/'
    })
    
    journalApi.interceptors.request.use(config => {
      config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
    })

 export default journalApi;