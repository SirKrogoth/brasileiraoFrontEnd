import axios from 'axios';
import { parseCookies } from 'nookies';

export function setupAPIClient(ctx = undefined){
    const api = axios.create({
        baseURL: 'http://localhost:3000'
    });

    api.interceptors.response.use(response => {
        return response;
    });
    
    return api;
}