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
      
      <form onSubmit={handleSubmit(submit)}>
      <h2>Inicia sesión</h2>
        <div>
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: "Email es requerido" })}
          />
                    {errors.email && <p className="error">{errors.email.message}</p>}

        </div>
        <div>
          <input
            type="password"
            placeholder="contraseña"
            {...register("password", {
              required: "Password es requerido",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
                    {errors.password && <p className="error">{errors.password.message}</p>}

        </div>
        <button type="submit">Log In</button>
        <div className="separador"></div>
      <NavLink className={"toregister"} to={"/register"}>
        Sign In
      </NavLink>
      </form>
      
    </main>
  );
};

export default FormLogin;
