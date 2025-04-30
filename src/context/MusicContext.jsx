// MusicContext.js
import { createContext, useContext, useEffect, useState } from 'react';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [albums, setAlbums] = useState([]);
  const [musicians, setMusicians] = useState([]);
  const [disco, setDisco] = useState(null);
  const [cancion, setCancion] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [viewPlayer, setViewPlayer] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmAdd, setConfirmAdd] = useState(false);
  const [playListAlbum, setPlayListAlbum] = useState({
    _id: 2626262,
    title: 'Mi Playlist',
    songs: null,
  });

  useEffect(() => {
    fetch('https://backend-byebyepelos.vercel.app/api/v1/albums')
      .then((res) => res.json())
      .then((res) => {
        setAlbums(res);
        setDisco(res[0]);
        setCancion(res[0]?.songs[0]);
        setIsLoading(false);
        setSelectedAlbum(res[0]);
      });

    fetch('https://backend-byebyepelos.vercel.app/api/v1/musicians')
      .then((res) => res.json())
      .then((res) => {
        setMusicians(res);
      });
  }, []);

  useEffect(() => {
    let interval = null;
    if (playing && currentAudio) {
      interval = setInterval(() => {
        setCurrentTime(currentAudio.currentTime);
      }, 1000);
    } else if (!playing && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playing, currentAudio]);

  useEffect(() => {
    if (currentAudio) {
      const handleTimeUpdate = () => {
        setCurrentTime(currentAudio.currentTime);
      };
      currentAudio.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        currentAudio.removeEventListener('timeupdate', handleTimeUpdate);
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
        musicians,
        setMusicians,
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
        confirmAdd,
        setConfirmAdd
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusicContext = () => useContext(MusicContext);
