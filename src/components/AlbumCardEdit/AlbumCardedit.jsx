import MusicianInfo from "../MusicianInfo/MusicianInfo";
import "./AlbumCardEdit.css";

const AlbumCardEdit = ({ album }) => {
  return (
    <article className="AlbumCardEdit">
        <button className="botoneditar" onClick={() => console.log(album._id)}>Editar</button>
      <h2>{album.title}</h2>
      <h2>{album.songs.length} canciones</h2>
      <h3>{album.year}</h3>
      <h3>Mezclada : {album.mixed?.firstName}</h3>
      <img
        src={album.cover}
        alt="Portada del album"
        className="albumCardEditcover"
      />
      <div>
        {album.musicians?.map((musico) => (
          <h4 key={musico._id}>{musico.firstName}</h4>
        ))}
                

      </div>
    </article>
  );
};
export default AlbumCardEdit;
