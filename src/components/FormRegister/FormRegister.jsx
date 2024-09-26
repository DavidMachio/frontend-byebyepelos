import './FormRegister.css';
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { userContext } from '../../context/UserContext';
import { registerUser } from '../../utils/Api/Register';
import { API } from '../../utils/Api/Api';

const FormRegister = () => {
  const { setUser } = useContext(userContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Crear FormData para el registro
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('name', data.name);
      formData.append('password', data.password);

      if (data.avatar[0]) {
        formData.append('avatar', data.avatar[0]); // Adjuntar el avatar
      }

      // Registro de usuario
      const result = await registerUser(formData);

      // Hacer login inmediatamente tras el registro
      const loginData = {
        email: data.email,
        password: data.password
      };

      const loginResult = await API.post('/users/login', loginData);
      
      // Guardar token y usuario en localStorage y contexto
      localStorage.setItem('token', loginResult.data.token);
      setUser(loginResult.data.user);

      // Redirigir al perfil
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mainregister">
      <h2>Regístrate</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email es requerido" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Nombre</label>
          <input
            type="text"
            {...register("name", { required: "Nombre es requerido" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password es requerido",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label>Avatar (Foto de Perfil)</label>
          <input
            type="file"
            accept="image/*"
            {...register("avatar")} // Cambié el nombre del campo de archivo
          />
        </div>

        <button type="submit">Registrarse</button>
      </form>
    </main>
  );
};

export default FormRegister;