import axios from "axios";
import { API_URL } from "./apiUrl";

// Creando la instancia de Axios (la URL del backend se define en apiUrl.js)
export const REGISTER = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': {
      toString() {
        return `Bearer ${localStorage.getItem('token')}`
      }
    }
  }
});

// Función personalizada para el registro de usuario con avatar
export const registerUser = async (formData) => {
  try {
    // Realizar la solicitud POST a /users/register con el FormData
    const response = await REGISTER.post('/users/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Especificar multipart/form-data
      },
    });
    return response.data; // Devolver los datos de la respuesta
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    throw error; // Propagar el error para manejarlo en el componente
  }
};
