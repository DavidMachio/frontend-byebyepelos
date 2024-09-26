import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import './EditProfile.css';
import { userContext } from '../../context/UserContext'; // Contexto de usuario
import { API } from '../../utils/Api/Api'; // Para hacer peticiones API
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { user, setUser, setUpdated, setViewEdit } = useContext(userContext); // Obtener el usuario del contexto
  const { register, handleSubmit, formState: { errors } } = useForm(); // Hook de react-hook-form
  const [preview, setPreview] = useState(user ? user.avatar : ''); // Estado para la previsualización del avatar
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga
   // Estado para controlar si se actualizó el perfil
  const navigate = useNavigate();

  // Actualizar el avatar cuando se cambie el archivo seleccionado
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file)); // Mostrar una previsualización de la imagen
  };

  // Función que maneja el envío del formulario
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name); // Agregar el nombre al FormData
    if (data.avatar && data.avatar[0]) {
      formData.append('avatar', data.avatar[0]); // Agregar el archivo del avatar si se ha seleccionado
    }

    try {
      setLoading(true); // Comienza el estado de carga
      const response = await API.put(`/users/${user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        // Actualizar manualmente el contexto del usuario con los datos nuevos
        const updatedUser = {
          ...user, // Mantener las demás propiedades
          name: data.name, // Actualizar el nombre con los nuevos datos
          avatar: response.data.avatar || user.avatar, // Si hay nuevo avatar, lo tomamos
        };

        setUser(updatedUser); // Actualiza el contexto del usuario
        setUpdated(true); // Marcar que se ha actualizado el perfil
        setLoading(false); // Finaliza el estado de carga
        setViewEdit(false)
        navigate('/profile'); // Redirige después de actualizar
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setLoading(false); // Finaliza el estado de carga en caso de error
      alert('Hubo un error al actualizar el perfil');
    }
  };

  return (
    <div className='formEditUser'>
      <h3>Edit Profile</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="form-edit-profile">
        {/* Previsualización del avatar */}
        <div className="form-group avatar-preview">
          <img
            src={preview}
            alt="Previsualización del avatar"
            className="avatar-img"
          />
        </div>

        <div className="form-group">
          <label htmlFor="avatar">Cambiar avatar</label>
          <input
            type="file"
            accept="image/*"
            {...register('avatar')}
            onChange={handleAvatarChange}
          />
        </div>

        {/* Campo para cambiar el nombre */}
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            defaultValue={user.name} // Valor inicial del nombre
            {...register('name', { required: true, maxLength: 30 })}
          />
          {errors.name && errors.name.type === "required" && (
            <p className="error-message">El nombre es requerido</p>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <p className="error-message">El nombre no puede exceder 30 caracteres</p>
          )}
        </div>

        {/* Botón para enviar el formulario */}
        <button type="submit" className="btn-save" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
