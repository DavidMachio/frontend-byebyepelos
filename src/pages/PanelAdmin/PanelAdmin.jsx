import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/UserContext';
import { API } from '../../utils/Api/Api';
import './PanelAdmin.css';
import AlbumCardEdit from '../../components/AlbumCardEdit/AlbumCardedit';
import SongCardEdit from '../../components/SongCardEdit/SongCardEdit';
import CreateAlbumForm from '../../components/FormCreateAlbum/FormCreateAlbum';
import FormCreateSong from '../../components/FormCreateSong/FormCreateSong';
import CardUser from '../../components/CardUser/CardUser';

const PanelAdmin = () => {
  const navigate = useNavigate();
  const { user } = useContext(userContext);

  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [view, setView] = useState(''); // Controla la vista actual
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const res = await API.get('/users');
      
      /* const data = await response.json(); */
      if (Array.isArray(res.data)) {
        setUsers(res.data);
        setView('usuarios');
      } else {
        console.error("La respuesta no es un array:", data);
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

 
  const getAlbums = async () => {
    try {
      const res = await API.get('/albums');
      
      /* const data = await response.json(); */
      if (Array.isArray(res.data)) {
        setAlbums(res.data);
        setView('albums');
      } else {
        console.error("La respuesta no es un array:", data);
      }
    } catch (error) {
      console.error("Error al obtener los álbumes:", error);
    }
  };

  const getSongs = async () => {
    try {
      const response = await API.get('/songs');
      if (Array.isArray(response.data)) {
        setSongs(response.data);
        setView('songs');
      } else {
        console.error("La respuesta no es un array:", data);
      }
    } catch (error) {
      console.error("Error al obtener las canciones:", error);
    }
  };


  return (
    <div className='divadmin'>
      {user && user.rol === 'admin' ? (
        <main className='mainadmin'>
          <aside className='aside'>
            <button onClick={getAlbums} className='asidebutton'>Editar álbum</button>
            <button onClick={getSongs} className='asidebutton'>Editar canción</button>
            <button onClick={() => setView('createAlbum')} className='asidebutton'>Crear álbum</button>
            <button onClick={() => setView('createSong')} className='asidebutton'>Crear canción</button>
            <button onClick={getUsers} className='asidebutton'>Usuarios</button>
          </aside>
          <section className='contenedorAccion'>
            {view === 'albums' && albums.length > 0 ? (
              <ul className='albumsList'>
                {albums.map((album) => (
                  <li key={album._id}>
                    <AlbumCardEdit album={album}/>
                  </li>
                ))}
              </ul>
            ) : view === 'songs' && songs.length > 0 ? (
              <ul className='songsList'>
                {songs.map((song) => (
                  <li key={song._id}><SongCardEdit song={song}/></li>
                ))}
              </ul>
            ) : view === 'usuarios' && users.length > 0 ? (
              <ul className='usersList'>
                {users.map((user) => (
                  <li key={user._id}><CardUser user={user}/></li>
                ))}
              </ul>
            )  : view === 'createAlbum' ? (
              <CreateAlbumForm />
            ) : view === 'createSong' ? (
              <FormCreateSong />
            ) : (
              <p>Selecciona una opción para ver los datos</p>
            )}
          </section>
        </main>
      ) : ''}
    </div>
  );
};

export default PanelAdmin;
