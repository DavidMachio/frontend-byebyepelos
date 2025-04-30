import { useState, useEffect } from "react";
import { API } from "../../utils/Api/Api";
import './FormCreateAlbum.css';

const FormCreateAlbum = () => {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    cover: null,
    musicians: [],
    mixed: "",
  });

  const [musiciansList, setMusiciansList] = useState([]);
  const [selectedMusician, setSelectedMusician] = useState("");
  const [isCreating, setIsCreating] = useState(false); // nuevo estado
  const [showSuccess, setShowSuccess] = useState(false); // nuevo estado

  useEffect(() => {
    const fetchMusicians = async () => {
      try {
        const response = await API.get("/musicians");
        setMusiciansList(response.data);
      } catch (error) {
        console.error("Error al obtener los músicos:", error);
      }
    };
    fetchMusicians();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);

    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("year", formData.year);
    dataToSend.append("cover", formData.cover);
    dataToSend.append("musicians", JSON.stringify(formData.musicians));
    dataToSend.append("mixed", formData.mixed);

    try {
      const res = await API.post("/albums", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Mostrar banner de éxito
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Limpiar formulario
      setFormData({
        title: "",
        year: "",
        cover: null,
        musicians: [],
        mixed: "",
      });
      setSelectedMusician("");
    } catch (err) {
      console.error("Error al crear el álbum:", err);
      alert("Error al crear el álbum");
    } finally {
      setIsCreating(false);
    }
  };

  const addMusician = (musicianId) => {
    if (!formData.musicians.includes(musicianId)) {
      setFormData((prevState) => ({
        ...prevState,
        musicians: [...prevState.musicians, musicianId],
      }));
    }
  };

  const removeMusician = (musicianId) => {
    setFormData((prevState) => ({
      ...prevState,
      musicians: prevState.musicians.filter((id) => id !== musicianId),
    }));
  };

  return (
    <form className="formalbumcreate" onSubmit={handleSubmit} encType="multipart/form-data">
      {isCreating && <div className="banner loading">Creando álbum...</div>}
      {showSuccess && <div className="banner success">Álbum creado correctamente</div>}

      <input
        type="text"
        placeholder="Título del álbum"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <input
        type="number"
        placeholder="Año"
        value={formData.year}
        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
      />
      <input
        className="subidafoto"
        type="file"
        accept="image/*"
        onChange={(e) => setFormData({ ...formData, cover: e.target.files[0] })}
      />

      {/* Selección de músicos */}
      <div>
        <label>Seleccionar Músicos</label>
        <select
          value={selectedMusician}
          onChange={(e) => {
            addMusician(e.target.value);
            setSelectedMusician("");
          }}
        >
          <option value="" disabled>Selecciona un músico</option>
          {musiciansList.map((musician) => (
            <option key={musician._id} value={musician._id}>
              {musician.firstName} {musician.secondName}
            </option>
          ))}
        </select>

        {/* Lista de músicos seleccionados */}
        <div>
          <h3>Músicos seleccionados</h3>
          <ul>
            {formData.musicians.map((musicianId) => {
              const musician = musiciansList.find((m) => m._id === musicianId);
              return (
                <li key={musicianId}>
                  {musician ? `${musician.firstName} ${musician.secondName}` : "Músico no encontrado"}
                  <button
                    type="button"
                    onClick={() => removeMusician(musicianId)}
                    className="remove-button"
                  >
                    Eliminar
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Seleccionar mezclador */}
      <div>
        <label>Músico que mezcló el álbum</label>
        <select
          value={formData.mixed}
          onChange={(e) => setFormData({ ...formData, mixed: e.target.value })}
        >
          <option value="" disabled>Selecciona el músico que mezcló</option>
          {musiciansList.map((musician) => (
            <option key={musician._id} value={musician._id}>
              {musician.firstName} {musician.secondName}
            </option>
          ))}
        </select>
      </div>

      <button className="botoneditar" type="submit" disabled={isCreating}>
        Crear Álbum
      </button>
    </form>
  );
};

export default FormCreateAlbum;
