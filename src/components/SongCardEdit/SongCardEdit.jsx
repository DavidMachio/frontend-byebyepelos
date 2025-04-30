import { useContext, useState, useEffect } from "react";
import { MusicContext } from "../../context/MusicContext";
import { API } from "../../utils/Api/Api";
import './SongCardEdit.css';

const SongCardEdit = ({ song, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...song,
    album: song.album?._id || "",  // 🔧 Usar solo el _id
    musicians: song.musicians?.map((m) => m._id) || [],
    imagenFile: null,
  });

  const { albums, musicians } = useContext(MusicContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, imagenFile: e.target.files[0] }));
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

  const handleSubmit = () => {
    const dataToSend = new FormData();
    dataToSend.append("titulo", formData.titulo);
    dataToSend.append("vso", formData.vso);
    dataToSend.append("audio", formData.audio);
    dataToSend.append("album", formData.album);
    dataToSend.append("musicians", JSON.stringify(formData.musicians));
    if (formData.imagenFile) {
      dataToSend.append("imagen", formData.imagenFile);
    }

    onUpdate(song._id, dataToSend);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <article className="SongCardEditform">
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Título"
        />
        <input
          type="text"
          name="vso"
          value={formData.vso}
          onChange={handleChange}
          placeholder="VSO"
        />
        <input
          type="text"
          name="audio"
          value={formData.audio}
          onChange={handleChange}
          placeholder="URL Audio"
        />
        <input
          className="subidafoto"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <label>Álbum:</label>
        <select name="album" value={formData.album || ""} onChange={handleChange}>
          <option value="" disabled>Selecciona un álbum</option>
          {albums.map((album) => (
            <option key={album._id} value={album._id}>
              {album.title}
            </option>
          ))}
        </select>

        <div>
          <label>Músicos:</label>
          <select
            onChange={(e) => {
              addMusician(e.target.value);
              e.target.value = "";
            }}
            defaultValue=""
          >
            <option value="" disabled>Selecciona un músico</option>
            {musicians.map((m) => (
              <option key={m._id} value={m._id}>
                {m.firstName} {m.secondName}
              </option>
            ))}
          </select>
          <ul className="listamusicosañadidos">
            {formData.musicians.map((id) => {
              const musico = musicians.find((m) => m._id === id);
              return (
                <li className="musicoañadido" key={id}>
                  {musico ? `${musico.firstName} ${musico.secondName}` : "Desconocido"}
                  <button className="botoneliminar eliminarmusico" type="button" onClick={() => removeMusician(id)}>❌</button>
                </li>
              );
            })}
          </ul>
        </div>

        <button className="botoneditar" onClick={handleSubmit}>Aceptar</button>
        <button className="botoneditar botoneliminar" onClick={() => setIsEditing(false)}>Cancelar</button>
      </article>
    );
  }

  return (
    <article className="SongCardEdit">
      <div className="divbotonescancion">
        <button className="botoneditar" onClick={() => setIsEditing(true)}>Editar</button>
        <button
          className="botoneliminar botoneditar"
          onClick={() => {
            if (window.confirm(`¿Estás seguro de que deseas eliminar la canción "${song.titulo}"?`)) {
              onDelete(song._id);
            }
          }}
        >
          Eliminar
        </button>
      </div>
      <div className="songcardimage">
        {song.imagen && (
          <img className="songcardimg" src={song.imagen} alt={song.titulo} />
        )}
      </div>
      <div className="songcardinfo">
  <h3>{song.titulo}</h3>
  <p>VSO: {song.vso}</p>
  <p>Álbum: {song.album.title}</p>

  <div>
    <p>Músicos:</p>
    <ul className="listamusicosañadidos">
      {song.musicians?.map((musico) => (
        <li  key={musico._id}>
          {musico.firstName} {musico.secondName}
        </li>
      ))}
    </ul>
  </div>
</div>
    </article>
  );
};

export default SongCardEdit;
