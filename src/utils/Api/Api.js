import axios from "axios";
import { API_URL } from "./apiUrl";

export const APIHeaders = {
    'Content-Type': 'application/json',
    'Authorization': {
        toString(){
            return `Bearer ${localStorage.getItem('token')}`
        }
    }
}
// La URL del backend se define en apiUrl.js (variable VITE_API_URL)
export const API = axios.create({
    baseURL: API_URL,
    headers: APIHeaders,
})



