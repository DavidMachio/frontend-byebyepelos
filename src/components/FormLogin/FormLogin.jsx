import "./FormLogin.css";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { API } from "../../utils/Api/Api";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";

const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const { setUser } = useContext(userContext)

  const submit = async (data) => {

    try {
    const result = await API.post('/users/login', data);
    localStorage.setItem('token', result.data.token)
    setUser(result.data.user)
    
    navigate('/profile')
    } catch (error) {
      console.log(error);

    }
    
    

      /* if (updateAvatar) {
        updateAvatar(avatar); // Asegúrate de que esta función esté disponible
      }
      if (updatePlayList) {
        updatePlayList(playList);
      } */
  };

  return (
    <main className="mainlogin">
      <h2>Inicia sesión</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email es requerido" })}
          />
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
        </div>
        <button type="submit">Enviar</button>
      </form>
      <div className="separador"></div>
      <h3>¿No tienes cuenta?</h3>
      <NavLink className={"toregister"} to={"/register"}>
        Registrate
      </NavLink>
    </main>
  );
};

export default FormLogin;
