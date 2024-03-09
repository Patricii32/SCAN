import axios from "axios";

export const API_URL = "https://gateway.scan-interfax.ru/api/v1/account";

const $api = axios.create({
    baseURL: API_URL,
    headers: {'Content-Type': 'application/json'},
})


$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api;
