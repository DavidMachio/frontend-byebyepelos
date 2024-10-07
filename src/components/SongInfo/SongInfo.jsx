import { useEffect, useState } from "react";
import { formatDuration } from "../../utils/funtions/formatDuration";
import "./SongInfo.css";
import "./InputStyle.css"
import MusicianInfo from "../MusicianInfo/MusicianInfo";
import { useMusicContext } from "../../context/MusicContext";

const SongInfo = ({ song, playPause, funcionPrev, funcionPlay, funcionNext}) => {
  const [duration, setDuration] = useState(0);
  const [verinfo, setVerinfo] = useState(false)
  const {
    currentAudio,
    currentTime,
    setCurrentTime,

    viewPlayer,
    setViewPlayer,
    
  } = useMusicContext();
  

  useEffect(() => {
    const audioElement = new Audio(song?.audio);

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [song]);
  
  const handleTimeChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime); // Actualiza el estado del tiempo actual
    if (currentAudio) {
      currentAudio.currentTime = newTime; // Cambia la posición del audio
    }
  };

  return (
    <>
    {song ? 
    <div className="componenteSongInfo">
    <div className="songinfo_reproductor_container">
      <div className="songinfo">
        <h2>{song.album.title}</h2>
        <h2 className="songinfo_titulocancion">{song.titulo}</h2>
        <h2 className="songinfo_vso">{song.vso}</h2>
      </div>
      <img className="songinfo_portadacancion" src={song.imagen} alt="Portada de la cancion" />
      <div className="songinfo_controls_container">
        <div className="songinfo_time_container">
          <p className="songinfo_currentTime">{formatDuration(currentTime)}</p>
          <input
          className="songinfo_range"
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleTimeChange}
          />
          <p className="songinfo_duration">{formatDuration(duration)}</p>
        </div>
        <div className="songinfo_controls_buttons">
          <button className="songinfo_prev_button songinfo_button" onClick={funcionPrev}>
            <img src="/back.png" alt="Botón para pasar a la canción anterior" className="img_button_back" />
          </button>
          <button className="songinfo_play_button songinfo_button" onClick={funcionPlay}>
            <img src={playPause} alt="Botón para reproducir o pausar la canción" className="img_button_play" />
          </button>
          <button className="songinfo_next_button songinfo_button" onClick={funcionNext}>
            <img src="/next.png" alt="Botón para pasar a la canción siguiente" className="img_button_next" />
          </button>
        </div>
      </div>
      <button onClick={() => setVerinfo(!verinfo)} className="songinfo_verinfo">Artistas</button>
      <button onClick={() => setViewPlayer(!viewPlayer)} className="songinfo_verinfo">X</button>
      <div className="songinfo_fotocancion_fondo" style={{ backgroundImage: `url(${song.imagen})`, backgroundSize:'cover', backgroundPosition:'center'}}></div>
    </div>
    
    <div className={`musicosContainer ${!verinfo ? "infooculta" : ""}`}>
      <button onClick={() => setVerinfo(!verinfo)} className="songinfo_cerrarinfo">⬇</button>
      <div className="musicosContainer_infosong">
      <h2>{song.album.title}</h2>
      <h2 className="songinfo_titulocancion">{song.titulo}</h2>
      <h2 className="songinfo_vso">{song.vso}</h2>
      
      </div>
      {song.musicians?.map((musico) => (
        <MusicianInfo key={musico._id} musico={musico}/>
      ))}
      
    </div>
    
  </div> :
  <h2>Este album no tiene canciones</h2>
  }
    </>
  );
};

export default SongInfo;
