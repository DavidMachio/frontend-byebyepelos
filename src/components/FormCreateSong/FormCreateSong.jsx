import { useForm } from 'react-hook-form';
import { API } from '../../utils/Api/Api';
import './FormCreateSong.css'

const FormCreateSong = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await API.post('/songs', data);
      alert('Canción creada exitosamente');
      console.log(response.data);
    } catch (error) {
      console.error('Error al crear la canción', error);
      alert('Hubo un error al crear la canción');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-auto p-4 border rounded-lg shadow">
      <label>
        Imagen (URL):
        <input type="text" {...register('imagen', { required: 'La imagen es obligatoria' })} className="border p-2 w-full" />
        {errors.imagen && <p className="text-red-500 text-sm">{errors.imagen.message}</p>}
      </label>

      <label>
        Título:
        <input type="text" {...register('titulo', { required: 'El título es obligatorio' })} className="border p-2 w-full" />
        {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo.message}</p>}
      </label>

      <label>
        VSO (Opcional):
        <input type="text" {...register('vso')} className="border p-2 w-full" />
      </label>

      <label>
        Audio (URL):
        <input type="text" {...register('audio', { required: 'El audio es obligatorio' })} className="border p-2 w-full" />
        {errors.audio && <p className="text-red-500 text-sm">{errors.audio.message}</p>}
      </label>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Crear Canción</button>
    </form>
  );
};

export default FormCreateSong;
