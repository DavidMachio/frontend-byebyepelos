# ByeByePelos · Frontend

Web de música de ByeByePelos: historia de la banda, discos, reproductor y cuentas de usuario.

- Web: https://byebyepelosmusic.vercel.app/
- Backend: [backend-byebyepelos](https://github.com/DavidMachio/backend-byebyepelos)
- Tecnología: React 18 + Vite 5, desplegado en Vercel (Node.js 22.x)

## Cómo se ve

Las pantallas siguen el nuevo diseño: azul noche, blanco hielo, acento cian `#57DBED`, Poppins ligera, portadas cuadradas con esquinas redondeadas y modo claro y oscuro.

![Portada del libro de marca](docs/mockups/00-portada.jpg)

### Home
![Home](docs/mockups/01-home.jpg)

### Music
![Music](docs/mockups/02-music.jpg)

### Perfil
![Perfil](docs/mockups/03-perfil.jpg)

### Móvil
![Home, Music y Perfil en móvil](docs/mockups/04-movil.jpg)

### Modo oscuro y modo claro
![Modo oscuro y claro](docs/mockups/05-claro-oscuro.jpg)

> Los mockups son maquetas con las portadas reales de los discos y datos de ejemplo (canciones y usuario ficticios).

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # compilar para producción
npm run lint     # revisar el código
```

Para probar contra un backend local, copia `.env.example` a `.env.local` y define `VITE_API_URL` (por ejemplo `http://localhost:3000/api/v1`). Sin la variable se usa el backend de producción.

## Diseño

Los colores, espacios y esquinas viven en `src/tokens.css` como variables CSS (modo oscuro por defecto; el claro se activa con `data-theme="light"` o según el dispositivo). Reutiliza esas variables antes de crear estilos nuevos.
