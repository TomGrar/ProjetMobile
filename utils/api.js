import axios from "axios";
import {getToken} from "./authUtils";

const API_URL = "http://192.168.0.234:3001";

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers : {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    async config => {
        const token = await getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;