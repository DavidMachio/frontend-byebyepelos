import { useMusicContext } from "../../context/MusicContext";
import { useState, useEffect } from "react";
import { API } from "../../utils/Api/Api";
import "./AlbumCardEdit.css";

const AlbumCardEdit = ({ album, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [albumData, setAlbumData] = useState(album);
  const [formData, setFormData] = useState({
    title: album.title,
    year: album.year,
    coverFile: null,
    musicians: album.musicians.map((m) => m._id),
    mixed: album.mixed?._id || "",
    songs: album.songs.map((s) => s._id),
  });
  const [musiciansList, setMusiciansList] = useState([]);
  const [songsList, setSongsList] = useState([]); 
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [isViewingSongs, setIsViewingSongs] = useState(false);
  const { setAlbums } = useMusicContext();


  useEffect(() => {
    const fetchMusicians = async () => {
      try {
        const res = await API.get("/musicians");
        setMusiciansList(res.data);
      } catch (err) {
        console.error("Error al cargar músicos", err);
      }
    };

    const fetchSongs = async () => {
      try {
        const res = await API.get("/songs");
        setSongsList(res.data);
      } catch (err) {
        console.error("Error al cargar canciones", err);
      }
    };

    fetchMusicians();
    fetchSongs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, coverFile: e.target.files[0] }));
  };

  const addMusician = (musicianId) => {
    if (!formData.musicians.includes(musicianId)) {
      setFormData((prev) => ({
        ...prev,
        musicians: [...prev.musicians, musicianId],
      }));
    }
  };

  const removeMusician = (musicianId) => {
    setFormData((prev) => ({
      ...prev,
      musicians: prev.musicians.filter((id) => id !== musicianId),
    }));
  };

  const addSong = (songId) => {
    if (!formData.songs.includes(songId)) {
      setFormData((prev) => ({
        ...prev,
        songs: [...prev.songs, songId],
      }));
    }
  };

  const removeSong = (songId) => {
    setFormData((prev) => ({
      ...prev,
      songs: prev.songs.filter((id) => id !== songId),
    }));
  };

  const handleUpdate = async () => {
    try {
      const dataToSend = new FormData();
      dataToSend.append("title", formData.title);
      dataToSend.append("year", formData.year);
      if (formData.coverFile) dataToSend.append("cover", formData.coverFile);
      dataToSend.append("musicians", JSON.stringify(formData.musicians));
      dataToSend.append("mixed", formData.mixed);
      dataToSend.append("songs", JSON.stringify(formData.songs));
  
      const response = await API.put(`/albums/${album._id}`, dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const updatedAlbum = response.data.album;
      setAlbumData(updatedAlbum);
      setIsEditing(false);
  
      // 🟡 ACTUALIZA EL CONTEXTO
      setAlbums((prevAlbums) =>
        prevAlbums.map((alb) => (alb._id === updatedAlbum._id ? updatedAlbum : alb))
      );
    } catch (error) {
      console.error("Error al actualizar el álbum", error);
      alert("Hubo un error al actualizar el álbum");
    }
  };
  

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el álbum "${album.title}"?`);
    if (!confirmDelete) return;

    try {
      await API.delete(`/albums/${album._id}`);
      alert("Álbum eliminado exitosamente");
      if (onDelete) onDelete(album._id);
    } catch (error) {
      console.error("Error al eliminar el álbum", error);
      alert("Hubo un error al eliminar el álbum");
    }
  };

  const toggleSongModal = () => {
    setIsViewingSongs(!isViewingSongs);
  };

  const toggleAddSongModal = () => {
    setIsAddingSong(!isAddingSong);
  };

  if (isEditing) {
    return (
      <article className="AlbumCardEditform">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Título" />
        <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Año" />
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <div>
          <label>Músicos</label>
          <select
            onChange={(e) => {
              addMusician(e.target.value);
              e.target.value = "";
            }}
            defaultValue=""
          >
            <option value="" disabled>Selecciona un músico</option>
            {musiciansList.map((m) => (
              <option key={m._id} value={m._id}>
                {m.firstName} {m.secondName}
              </option>
            ))}
          </select>
          <ul className="listamusicosañadidos">
            {formData.musicians.map((id) => {
              const musico = musiciansList.find((m) => m._id === id);
              return (
                <li className="musicoañadido" key={id}>
                  {musico ? `${musico.firstName} ${musico.secondName}` : "Desconocido"}
                  <button className="botoneliminar eliminarmusico" type="button" onClick={() => removeMusician(id)}>❌</button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <label>Mezclado por</label>
          <select name="mixed" value={formData.mixed} onChange={handleChange}>
            <option value="" disabled>Selecciona mezclador</option>
            {musiciansList.map((m) => (
              <option key={m._id} value={m._id}>
                {m.firstName} {m.secondName}
              </option>
            ))}
          </select>
        </div>

        <button className="añadircanciones" type="button" onClick={toggleAddSongModal}>Añadir Canciones</button>

        {isAddingSong && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-btn" onClick={toggleAddSongModal}>X</button>
              <h4>Canciones Disponibles</h4>
              <ul className="ulcancion">
                {songsList.filter((s) => !formData.songs.includes(s._id)).map((song) => (
                  <li className="licancion" key={song._id}>
                    <div className="cancion">
                      {song.imagen && <img src={song.imagen} alt={song.titulo}  />}
                      <p>{song.titulo}</p>
                      {song.vso && <p>VSO: {song.vso}</p>}
                      
                    </div>
                    <button className="añadircancion" type="button" onClick={() => addSong(song._id)}>Añadir</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <button className="cancionesactuales" type="button" onClick={toggleSongModal}>Canciones Actuales</button>

        {isViewingSongs && (
          <div className="modal">
            <button className="close-btn" onClick={toggleSongModal}>X</button>
            <div className="modal-content">
              
              <h4>Canciones del Álbum</h4>
              <ul className="ulcancion">
                {formData.songs.map((songId) => {
                  const song = songsList.find((s) => s._id === songId);
                  return song ? (
                    <li className="licancion" key={songId}>
                      <div className="cancion">
                        {song.imagen && <img src={song.imagen} alt={song.titulo}/>}
                        <p>{song.titulo}</p>
                        {song.vso && <p>VSO: {song.vso}</p>}
                        
                      </div>
                      <button className="eliminarcancion" type="button" onClick={() => removeSong(songId)}>Eliminar</button>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </div>
        )}

        <button className="botoneditar" onClick={handleUpdate}>Aceptar</button>
        <button className="botoneditar botoneliminar" onClick={() => setIsEditing(false)}>Cancelar</button>
      </article>
    );
  }

  return (
    <article className="AlbumCardEdit">
      <div className="divbotonescancion">
        <button className="botoneditar" onClick={() => setIsEditing(true)}>Editar</button>
        <button className="botoneditar botoneliminar" onClick={handleDelete}>Eliminar</button>
      </div>
      <h2>{albumData.title}</h2>
      <h2>{albumData.songs?.length} canciones</h2>
      <h3>{albumData.year}</h3>
      <h3>Mezclada: {albumData.mixed?.firstName || "Sin mezclador"}</h3>
      <img src={albumData.cover} alt="Portada del álbum" className="albumCardEditcover" />
      <div>
        {albumData.musicians?.map((musico) => (
          <h4 key={musico._id}>{musico.firstName}</h4>
        ))}
      </div>
    </article>
  );
};

export default AlbumCardEdit;
