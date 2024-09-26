import LevelsBars from '../LevelsBars/LevelsBars';
import './BarPlaying.css';

const BarPlaying = ({ song, ocultar, classLevels, buttonsClass, funcionprev, funcionPlay, playPause, funcionnext, mostrarplayer=()=>{} }) => {
 

  
  return (
    <>
    { song ? 
    <div className='barplaying' >
      <div className='barPlaying_container_levelsBars'>
      <LevelsBars ocultar={ocultar}/>
      </div>
      <div className={`buttonsplayer ${buttonsClass}`}>
        <button className='barplaying_prevsong_button' onClick={funcionprev} ><img className={`${buttonsClass} barplaying_prevsong_button`} src="/back.png" alt="" /></button>
       <button   onClick={funcionPlay}><img src={playPause} alt="Botón para reproducir o pausar la canción" className={`play ${buttonsClass}`}/></button>
       <button  className='barplaying_prevsong_button'   onClick={funcionnext}><img className={`${buttonsClass} barplaying_prevsong_button`} src="/next.png" alt="" /></button>
      </div>
      
    <div className='barplaying_info' onClick={mostrarplayer}>
      <img src={song.imagen} alt=""  />
      <div>
        <h2>{song.titulo}</h2>
        <h3>{song.album.title}</h3>
      </div>
      
      
    </div>
    
  </div> :
  <>Elige una canción</>
  }
    </>
  );
}

export default BarPlaying;
