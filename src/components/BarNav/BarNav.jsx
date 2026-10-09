import { NavLink } from "react-router-dom";
import "./BarNav.css";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";
import { routes } from "../../utils/datas/routes";
import { MusicContext } from "../../context/MusicContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const BarNav = () => {
  const { user } = useContext(userContext);
  const { setViewPlayer } = useContext(MusicContext);

  return (
    <div id="bar-nav">
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          onClick={()=>setViewPlayer(false)
          }
        >
          {route.text}
        </NavLink>
      ))}
      {/* <NavLink to="/about">
        About
        </NavLink> */}
      <div className="bar-nav_right">
        <ThemeToggle />
        <NavLink to="/profile" className={`profile ${user ? "border" : ""}`}>
          <img
            className={!user ? "default" : ""}
            src={user ? user.avatar : "/user.png"}
            alt="Foto del perfil"
            onClick={()=>setViewPlayer(false)
            }
          />
        </NavLink>
      </div>
      {/* {admin && admin=== 'admin' ? <NavLink to='/profile' className={'profile'}>
        <img src={avatar} alt="Foto del perfil" />
        </NavLink> : ''} */}
    </div>
  );
};

export default BarNav;
