import './SongAdded.css'

const SongAdded = ({addSong= () =>{}}) => {
  return (
    <div className='songAdded_div' onClick={addSong}>
        <h3>Cancion Añadida</h3>
        <button >Aceptar</button>
    </div>
  )
}

export default SongAdded