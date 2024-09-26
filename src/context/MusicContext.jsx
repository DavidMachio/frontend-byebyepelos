import React, { createContext, useContext, useEffect, useState } from "react";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [albums, setAlbums] = useState([]);
  const [disco, setDisco] = useState(null);
  const [cancion, setCancion] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [viewPlayer, setViewPlayer] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playListAlbum, setPlayListAlbum] = useState({
    _id: 2626262, // Un ID único para la playList
    title: 'Mi Playlist',
    songs: null,
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/albums")
      .then((res) => res.json())
      .then((res) => {
        setAlbums(res);
        setDisco(res[0]);
        setCancion(res[0].songs[0]);
        setIsLoading(false);
        setSelectedAlbum(res[0]);
      });
  }, []);

  // Este efecto se encarga de actualizar el currentTime cada segundo cuando hay una canción reproduciéndose
  useEffect(() => {
    let interval = null;

    if (playing && currentAudio) {
      // Inicia un intervalo para actualizar currentTime cada segundo
      interval = setInterval(() => {
        setCurrentTime(currentAudio.currentTime);
      }, 1000);
    } else if (!playing && interval) {
      // Detiene el intervalo si se pausa la reproducción
      clearInterval(interval);
    }

    // Limpia el intervalo al desmontar el componente o cuando se detenga la reproducción
    return () => clearInterval(interval);
  }, [playing, currentAudio]);

  // Este useEffect garantiza que el currentAudio sigue manteniendo el tiempo correcto
  useEffect(() => {
    if (currentAudio) {
      // Escucha el evento 'timeupdate' del audio para actualizar el tiempo de reproducción
      const handleTimeUpdate = () => {
        setCurrentTime(currentAudio.currentTime);
      };

      currentAudio.addEventListener("timeupdate", handleTimeUpdate);

      // Limpia el evento cuando cambia el audio
      return () => {
        currentAudio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [currentAudio]);

  return (
    <MusicContext.Provider
      value={{
        isLoading,
        setIsLoading,
        currentSong,
        setCurrentSong,
        albums,
        setAlbums,
        disco,
        setDisco,
        cancion,
        setCancion,
        currentAudio,
        setCurrentAudio,
        currentTime,
        setCurrentTime,
        playing,
        setPlaying,
        selectedAlbum,
        setSelectedAlbum,
        viewPlayer,
        setViewPlayer,
        playListAlbum,
        setPlayListAlbum,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusicContext = () => {
  return useContext(MusicContext);
};
