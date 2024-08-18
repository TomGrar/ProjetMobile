import axios from "axios";

const API_URL = "http://192.168.0.234:3001";

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers : {
        'Content-Type': 'application/json',
    }
});

export default api;