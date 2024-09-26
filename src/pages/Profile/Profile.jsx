import FormLogin from "../../components/FormLogin/FormLogin";
import { NavLink, useNavigate } from "react-router-dom";
import "./Profile.css";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/UserContext";
import { useMusicContext } from "../../context/MusicContext";
import {
  playNextSong,
  playPrevSong,
} from "../../utils/funtions/reproduccionCanciones";
import SongInfo from "../../components/SongInfo/SongInfo";
import BarPlaying from "../../components/BarPlaying/BarPlaying";
import Song from "../../components/Song/Song";
import { API } from "../../utils/Api/Api";
import EditProfile from "../../components/EditProfile/EditProfile";

const Profile = () => {
  const { user, setUser, viewEdit, setViewEdit } = useContext(userContext);
  
  
  const [myAlbum, setMyAlbum] = useState({
    _id: 1,
    songs: [],
  }); 

  const {
    albums,
    cancion,
    setCancion,
    currentSong,
    setCurrentSong,
    playing,
    setPlaying,
    currentAudio,
    setCurrentAudio,
    viewPlayer,
    setViewPlayer,
    currentTime,
    setCurrentTime,
    selectedAlbum,
    setSelectedAlbum,
    playListAlbum,
    setPlayListAlbum
  } = useMusicContext();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/api/v1/users/${user.name}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res[0]);
          setPlayListAlbum({
            songs: res[0].playList
          });
          setMyAlbum({ ...myAlbum, songs: res[0].playList });
          
        })
        .catch((err) => console.error("Error fetching user data:", err));
        
    }
  }, [user]);

  

  

  const navigate = useNavigate();

  const selecCancion = (song) => {

    


    if (currentAudio) {
      if (currentSong && currentSong._id === song._id) {
        // Alternar entre reproducir y pausar si la misma canción está seleccionada
        if (currentAudio.paused) {
          currentAudio.play();
          setPlaying(true);
        } else {
          currentAudio.pause();
          setPlaying(false);
        }
      } else {
        // Pausar la canción actual y reproducir la nueva
        currentAudio.pause();
        playSong(song,myAlbum);
      }
    } else {
      // Reproducir la nueva canción si no hay una canción actualmente reproduciéndose
      playSong(song, myAlbum);
    }
  
    setCancion(song); // Actualiza el estado con la nueva canción seleccionada
  };
  

  const playSong = (song, album) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    const newAudio = new Audio(song.audio);
    setCurrentAudio(newAudio);
    setCurrentSong(song);
    setPlaying(true);
    setCurrentTime(0);
    newAudio.play();
    newAudio.addEventListener("ended", () => playNextSong(album, song, selecCancion));
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setCurrentTime(0);
    setPlaying(false);
    setUser(null);
    navigate("/profile");
  };

  const removeSong = async (songId) => {
    try {
      if (user) { // Verificar si el usuario está logueado
        const response = await API.put(`/users/${user._id}/remove-song`, {
          songId: songId,
        });
  
        if (response.status === 200) {
          console.log(`Canción ${songId} eliminada de la playlist del usuario`);
  
          // Actualizar la lista de canciones tanto en userData como en playListAlbum
          const updatedSongs = myAlbum.songs.filter((song) => song._id !== songId);
          
          // Si la canción actual es la que se eliminó, detener la reproducción
          if (currentSong && currentSong._id === songId) {
            currentAudio.pause();
            setPlaying(false);
            setCurrentSong(null);
            setCurrentAudio(null);
          }
  
          // Actualizar el estado de userData y del contexto de la música
          setMyAlbum((prevState) => ({
            ...prevState,
            songs: updatedSongs,
          }));
  
          setPlayListAlbum(updatedSongs);
          
         
  
          // Si no hay canciones en la lista actualizada, detener la reproducción
          if (updatedSongs.length === 0) {
            setPlaying(false);
            setCurrentSong(null);
            setCurrentAudio(null);
          }
        }
        
      } else {
        console.log('No se ha iniciado sesión');
      }
    } catch (error) {
      console.error('Error al eliminar la canción de la playlist', error);
    }
  };
  
  

  return (
    <main>
      {user ? (
        <div className="mainprofile">
          <div className={viewEdit ? "profile_container_edit" : "profile_container_edit close"}>
          <button className="profile_close_editUser" onClick={() => setViewEdit(false)}>X</button>
            <EditProfile/>
            
          </div>
          <div className="profile-left-container">
            <div className="profile_dates_container">
              <img className="profile_avatar" src={user.avatar} alt="Foto de perfil" />
              <div className="profile_user_dates">
                <h2 className="profile_user_name">{user.name}</h2>
                <h3 className="profile_user_email">{user.email}</h3>
                <div className="profile_options">
                  {user.rol === "admin" ? (
                    <NavLink className={"profile_toadmin"} to={"/adminpanel"}>
                      Panel de administración
                    </NavLink>
                  ) : null}
                  <button
                    className="profile_logout"
                    onClick={() => setViewEdit(true)}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="profile_logout"
                    onClick={() => {
                      logOut();
                      currentAudio.pause();
                    }}
                  >
                    Logout
                  </button>
                  
                </div>
              </div>
              <div
                className="profile_foto_fondo"
                style={{
                  backgroundImage: `url(${user.avatar})`,
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
            <div className="profile_playlist">
              <h3>Lista de Reproducción:</h3>
              {console.log(myAlbum.songs)
              }
              <ul className="profile_ul">
                {myAlbum.songs && myAlbum.songs.length != 0 ? (
                  myAlbum.songs.map((song, index) => (
                   
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
                        play={() => {
                          selecCancion(song)
                          if(selectedAlbum._id !== playListAlbum._id){
                            setSelectedAlbum(playListAlbum)
                          }
                        }}
                      />
                      <button
                        onClick={() => removeSong(song._id)}
                        className={`addsongList ${!user ? "oculto" : ""}`}
                      >
                        －
                      </button> 
                    </li>
                   
                  ))
                ) : (
                  <p>No hay canciones en tu PlayList</p>
                )}
              </ul>
            </div>
          </div>
          <div className={viewPlayer ? "right-container mostrarplayer" : "right-container"}>
            <SongInfo
              song={currentSong || cancion}
              playPause={playing ? "/pause.png" : "/play.png"}
              funcionPrev={() => playPrevSong(selectedAlbum, cancion, selecCancion)}
              funcionPlay={() => selecCancion(currentSong || cancion)}
              funcionNext={() => playNextSong(selectedAlbum, cancion, selecCancion)}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              currentAudio={currentAudio}
            />
          </div>
          <div className="barrareproduciendo">
            <BarPlaying
              song={currentSong || cancion}
              funcionprev={() => playPrevSong(selectedAlbum, cancion, selecCancion)}
              playPause={playing ? "/pause.png" : "/play.png"}
              classLevels={!playing ? "oculto" : 'levelsContainer'}
              funcionPlay={() => selecCancion(cancion)}
              funcionnext={() => playNextSong(selectedAlbum, cancion, selecCancion)}
              funcion={() => selecCancion(currentSong || cancion)}
              playing={playing}
              mostrarplayer={() => setViewPlayer(!viewPlayer)}
            />
          </div>
          {console.log(selectedAlbum)
          }
        </div>
      ) : (
        <div className="profile_login_page">
          <FormLogin />
        </div>
      )}
    </main>
  );
};

export default Profile;
