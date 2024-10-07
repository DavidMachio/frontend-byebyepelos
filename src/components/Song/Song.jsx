import { useState, useEffect, memo } from 'react';
import LevelsBars from '../LevelsBars/LevelsBars';
import './Song.css';
import { formatDuration } from '../../utils/funtions/formatDuration';

const Song = memo(({play=()=>{}, cancion, songNumber, ocultar, reproduciendo, confirmsongadd}) => {
    
    const [duration, setDuration] = useState(null);


    useEffect(() => {
        const audioElement = document.getElementById(`audio-${cancion._id}`);

        const handleLoadedMetadata = () => {
            setDuration(audioElement.duration);
        };

        // Añadir el evento cuando el componente se monta
        audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

        // Limpiar el evento cuando el componente se desmonta
        return () => {
            audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [cancion]);

    

    return (
        <article id='song' className={reproduciendo} onClick={play}>
            <div className='containersong'>
                <p className='song_number'>{songNumber}</p>
                <img src={cancion.imagen} alt="" />
                <div className='song_info'>
                    <h2 className='song_titulo'>{cancion.titulo}</h2>
                    <p className='song_vsosong'>{cancion.vso}</p>
                    
                </div>
            </div>
            <audio id={`audio-${cancion._id}`} src={cancion.audio}>
            </audio>
            
            <p className='duration'>{formatDuration(duration)}</p>
            
            <div className='divlevels'>
                <LevelsBars ocultar={ocultar} />
            </div>
            
        </article>
    );
})

export default Song;
