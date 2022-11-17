import axios from "axios";
axios.defaults.withCredentials = true;
export const transport = axios.create({
    baseURL: process.env.REACT_APP_SERVER_API || 'http://localhost:3001',
})
