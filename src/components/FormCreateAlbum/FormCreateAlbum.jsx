import { useForm } from 'react-hook-form';
import { API } from '../../utils/Api/Api';
import './FormCreateAlbum.css'

const CreateAlbumForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await API.post('/albums', data);
      alert('Álbum creado exitosamente');
      console.log(response.data);
    } catch (error) {
      console.error('Error al crear el álbum', error);
      alert('Hubo un error al crear el álbum');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <label>
        Título:
        <input type="text" {...register('title', { required: 'El título es obligatorio' })}  />
        {errors.title && <p >{errors.title.message}</p>}
      </label>

      <label>
        Año:
        <input type="number" {...register('year', { required: 'El año es obligatorio' })}  />
        {errors.year && <p >{errors.year.message}</p>}
      </label>

      <label>
        Portada (URL):
        <input type="text" {...register('cover', { required: 'La portada es obligatoria' })}  />
        {errors.cover && <p >{errors.cover.message}</p>}
      </label>

      <label>
        Segunda Portada (Opcional):
        <input type="text" {...register('secondCover')}  />
      </label>

      <button type="submit" >Crear Álbum</button>
    </form>
  );
};

export default CreateAlbumForm;
