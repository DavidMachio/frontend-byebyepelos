import { useForm } from 'react-hook-form';
import { useEffect, useState, useContext } from 'react';
import { API } from '../../utils/Api/Api';
import { MusicContext } from '../../context/MusicContext';
import './FormCreateSong.css';

const FormCreateSong = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { albums, musicians, setAlbums } = useContext(MusicContext); // Obtener datos del contexto
  const [selectedMusician, setSelectedMusician] = useState('');
  const [addedMusicians, setAddedMusicians] = useState([]);

  const addMusician = (id) => {
    if (!addedMusicians.includes(id)) {
      setAddedMusicians((prev) => [...prev, id]);
    }
  };

  const removeMusician = (id) => {
    setAddedMusicians((prev) => prev.filter((m) => m !== id));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('imagen', data.imagen[0]);
      formData.append('titulo', data.titulo);
      formData.append('vso', data.vso);
      formData.append('audio', data.audio);
      formData.append('album', data.album);
      formData.append('musicians', JSON.stringify(addedMusicians));

      const response = await API.post('/songs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Canción creada exitosamente');
      console.log(response.data);

      // Reset estado
      setAddedMusicians([]);
      setSelectedMusician('');
    } catch (error) {
      console.error('Error al crear la canción', error);
      alert('Hubo un error al crear la canción');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formcreate-song">
      <label>
        Imagen:
        <input
          type="file"
          {...register('imagen', { required: 'La imagen es obligatoria' })}
        />
        {errors.imagen && <p>{errors.imagen.message}</p>}
      </label>

      <label>
        Título:
        <input
          type="text"
          {...register('titulo', { required: 'El título es obligatorio' })}
        />
        {errors.titulo && <p>{errors.titulo.message}</p>}
      </label>

      <label>
        VSO (Opcional):
        <input type="text" {...register('vso')} />
      </label>

      <label>
        Audio (URL):
        <input
          type="text"
          {...register('audio', { required: 'El audio es obligatorio' })}
        />
        {errors.audio && <p>{errors.audio.message}</p>}
      </label>

      <label>
        Álbum:
        <select {...register('album', { required: 'El álbum es obligatorio' })}>
          <option value="">Selecciona un álbum</option>
          {albums.map((album) => (
            <option key={album._id} value={album._id}>
              {album.title}
            </option>
          ))}
        </select>
        {errors.album && <p>{errors.album.message}</p>}
      </label>

      {/* Selección de músicos */}
      <div className="musician-select">
        <label>Seleccionar Músicos</label>
        <select
          value={selectedMusician}
          onChange={(e) => {
            addMusician(e.target.value);
            setSelectedMusician('');
          }}
        >
          <option value="">Selecciona un músico</option>
          {musicians.map((m) => (
            <option key={m._id} value={m._id}>
              {m.firstName} {m.secondName}
            </option>
          ))}
        </select>

        {/* Lista de músicos agregados */}
        <div>
          <h3>Músicos añadidos:</h3>
          <ul className="listamusicosañadidos">
            {addedMusicians.map((id) => {
              const m = musicians.find((mu) => mu._id === id);
              return (
                <li className="musicoañadido" key={id}>
                  {m ? `${m.firstName} ${m.secondName}` : 'Desconocido'}
                  <button
                    type="button"
                    onClick={() => removeMusician(id)}
                    className="eliminarmusico"
                  >
                    ❌
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <button className="botoneditar" type="submit">Crear Canción</button>
    </form>
  );
};

export default FormCreateSong;
