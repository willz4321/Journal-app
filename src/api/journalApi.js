
import axios from "axios";

const journalApi = axios.create({
      baseURL: 'https://journal-app-backend-production.up.railway.app/journal/'
    })
    
    journalApi.interceptors.request.use(config => {
      config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
    })

 export default journalApi;