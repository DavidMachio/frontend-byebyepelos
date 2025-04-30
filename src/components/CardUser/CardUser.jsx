import React from 'react';
import './CardUser.css';

const CardUser = ({ user, onClickDelete }) => {
  return (
    <div className='cardUser'>
      <div className='cardUser_info'>
        <img className='userAvatar' src={user.avatar} alt="Foto del usuario" />
        <div>
          <h2 className='userName'>{user.name}</h2>
          <h3>{user.email}</h3>
        </div>
      </div>
      <button className="botoneliminar botoneditar" onClick={onClickDelete}>Eliminar</button>
    </div>
  );
};

export default CardUser;
