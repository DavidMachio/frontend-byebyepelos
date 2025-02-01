import './SongCardEdit.css'

const SongCardEdit = ({song}) => {
    return (
<article className='SongCardEdit'>
<div className='divbotonescancion'>
<button className="botoneditar" onClick={() => console.log(song._id)}>Editar</button>
<button className="botoneliminar botoneditar" onClick={() => console.log(song._id)}>Eliminar</button>
</div>
<h2>{song.titulo}</h2>
<img className='SongCardEditimagen' src={song.imagen}></img>
<h3>{song.vso}</h3>
<div>
        {song.musicians?.map((musico) => (
          <h4 key={musico._id}>{musico.firstName}</h4>
        ))}
                

      </div>
</article>
    )
}
export default SongCardEdit