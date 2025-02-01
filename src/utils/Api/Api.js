import axios from "axios";

export const APIHeaders = {
    'Content-Type': 'application/json',
    'Authorization': {
        toString(){
            return `Bearer ${localStorage.getItem('token')}`
        }
    }
}
/* http://localhost:3000/api/v1
 */export const API = axios.create({
    baseURL: 'https://backend-byebyepelos.vercel.app/api/v1',
    headers: APIHeaders,
})


