import axios from "axios";

export const APIHeaders = {
    'Content-Type': 'application/json',
    'Authorization': {
        toString(){
            return `Bearer ${localStorage.getItem('token')}`
        }
    }
}

export const API = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: APIHeaders,
})