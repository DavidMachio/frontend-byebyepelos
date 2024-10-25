import { useContext, useEffect } from "react";
import Cover from "../../components/Cover/Cover";
import "./Music.css";
import Album from "../../components/Album/Album";
import SongInfo from "../../components/SongInfo/SongInfo";
import Song from "../../components/Song/Song";
import BarPlaying from "../../components/BarPlaying/BarPlaying";
import { useMusicContext } from "../../context/MusicContext";
import {
  playNextSong,
  playPrevSong,
} from "../../utils/funtions/reproduccionCanciones";
import { userContext } from "../../context/UserContext";
import { API } from "../../utils/Api/Api";
import SongAdded from "../../components/SongAdded/SongAdded";

const Music = () => {
  const { user } = useContext(userContext);

  const {
    currentSong,
    setCurrentSong,
    albums,
    disco,
    setDisco,
    cancion,
    setCancion,
    playing,
    setPlaying,
    currentAudio,
    setCurrentAudio,
    viewPlayer,
    setViewPlayer,
    setCurrentTime,
    selectedAlbum,
    setSelectedAlbum,
    isLoading,
    confirmAdd,
    setConfirmAdd
    
  } = useMusicContext();

  

  const addToPlaylist = async (songId) => {
    try {
      if (user) {  // Verificar si hay un usuario logueado
        const response = await API.put(`/users/${user._id}`, {
          playList: [songId],
        });
        if (response.status === 200) {
          console.log('Canción añadida a la playlist del usuario');
        }
      } else {
        console.log('No se ha iniciado sesión');
      }
    } catch (error) {
      console.error('Error al agregar la canción a la playlist', error);
    }
  };

  const selecAlbum = (album) => {
    if (disco._id !== album._id) {
      setDisco(album);
      if (!playing && !currentSong) {
        setCancion(album.songs[0]);
      }
    }
  };

  const selecCancion = (song) => {
    // Si la canción pertenece a un álbum diferente al actualmente seleccionado
    
    if (song.album._id !== selectedAlbum._id) {
      const newAlbum = albums.find((album) => album._id === song.album._id);

      // Si hay una canción en reproducción, detenerla
      if (currentAudio) {
        currentAudio.pause();
        setPlaying(false);
      }

      setSelectedAlbum(newAlbum);
      playSong(song, newAlbum); // Pasamos el nuevo álbum a `playSong`
    } else {
      if (currentAudio) {
        if (currentSong && currentSong._id === song._id) {
          // Alternar entre reproducir/pausar
          if (currentAudio.paused) {
            currentAudio.play();
            setPlaying(true);
          } else {
            currentAudio.pause();
            setPlaying(false);
          }
        } else {
          currentAudio.pause();
          playSong(song, selectedAlbum);
        }
      } else {
        playSong(song, selectedAlbum);
      }
    }

    setCancion(song); // Actualiza el estado con la nueva canción seleccionada
  };
 

  const playSong = (song, album) => {
    if (currentAudio) {
      currentAudio.pause(); // Detener el audio actual antes de reproducir uno nuevo
    }

    const newAudio = new Audio(song.audio);
    setCurrentAudio(newAudio);
    setCurrentSong(song);
    setPlaying(true);
    setCurrentTime(0); // Resetea el tiempo al iniciar una nueva canción

    newAudio.play();

    // Evento `ended` usa el álbum actualizado para reproducir la siguiente canción
    newAudio.addEventListener("ended", () =>
      playNextSong(album, song, selecCancion)
    );
  };

  return (
    <main id="main-music">
      {isLoading ? (
        <h2>Cargando datos...</h2>
      ) : (
        <>
        <div className={confirmAdd ? 'confirmadd' : 'confirmoculto'}>
                      <SongAdded
                      addSong={() => setConfirmAdd(false)}
                      />
                      </div>
          <div id="albums-container">
            <h2 className="albums-container-title">Albums</h2>
            <ul>
              {albums.map((album) => (
                <li
                  key={album._id}
                  className="liAlbum"
                  onClick={() => selecAlbum(album)}
                >
                  <Album album={album} />
                </li>
              ))}
            </ul>
          </div>
          <div className="left-container">
            <section id="section-songs">
              <Cover album={disco} />
              {disco.songs.length > 0 ? (
                <ul className="ulsongs">
                  {disco.songs.map((song, index) => (
                    <li className="lisong" key={song._id}>
                      <Song
                      
                        reproduciendo={
                          currentSong && currentSong._id === song._id
                            ? "reproduciendo"
                            : ""
                        }
                        songNumber={index + 1}
                        cancion={song}
                        addSong={user ? "" : "oculto"}
                        ocultar={
                          currentSong && playing && currentSong._id === song._id
                            ? ""
                            : "oculto"
                        }
                        play={() => selecCancion(song)}
                      />
                      <button
                        onClick={() => {
                          addToPlaylist(song._id);
                          setConfirmAdd(true);
                          console.log('añadida');
                        }}
                        
                        className={`addsongList ${!user ? "oculto" : ""}`}
                      >
                        ＋
                      </button>
                      
                    </li>
                  ))}
                </ul>
                
              ) : (
                <p>Este album no tiene canciones</p>
              )}
            </section>
          </div>
          <div
            className={
              viewPlayer ? "right-container mostrarplayer" : "right-container"
            }
          >
            <SongInfo
              song={currentSong || cancion}
              playPause={playing ? "/pause.png" : "/play.png"}
              funcionPrev={() =>
                playPrevSong(selectedAlbum, cancion, selecCancion)
              }
              funcionPlay={() => selecCancion(currentSong || cancion)}
              funcionNext={() =>
                playNextSong(selectedAlbum, cancion, selecCancion)
              }
            />
          </div>
          <div className="barrareproduciendo">
            <BarPlaying
              song={currentSong || cancion}
              funcionprev={() =>
                playPrevSong(selectedAlbum, cancion, selecCancion)
              }
              playPause={playing ? "/pause.png" : "/play.png"}
              ocultar={!playing ? "oculto" : 'levelsContainer'}
              funcionPlay={() => selecCancion(cancion)}
              
              funcionnext={() =>
                playNextSong(selectedAlbum, cancion, selecCancion)
              }
              funcion={() => selecCancion(currentSong || cancion)}
              playing={playing}
              mostrarplayer={() => setViewPlayer(!viewPlayer)}
            />
          </div>
        </>
        
      )}
    </main>
  );
};

export default Music;
