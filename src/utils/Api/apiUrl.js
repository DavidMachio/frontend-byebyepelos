// URL base del backend: único sitio donde está escrita.
// Se puede cambiar con la variable VITE_API_URL (en .env.local o en Vercel).
// Si no está definida o está vacía, se usa el backend de producción, como hasta ahora.
const API_URL_PRODUCCION = 'https://backend-byebyepelos.vercel.app/api/v1'

// Se quita la barra final para no generar rutas del tipo //albums
export const API_URL = (import.meta.env.VITE_API_URL || API_URL_PRODUCCION).replace(/\/+$/, '')
