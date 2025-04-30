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
  const [view, setView] = useState('');
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await API.get('/users');
      if (Array.isArray(res.data)) {
        setUsers(res.data);
        setView('usuarios');
      } else {
        console.error("La respuesta no es un array:", res.data);
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const getAlbums = async () => {
    try {
      const res = await API.get('/albums');
      if (Array.isArray(res.data)) {
        setAlbums(res.data);
        setView('albums');
      } else {
        console.error("La respuesta no es un array:", res.data);
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
        console.error("La respuesta no es un array:", response.data);
      }
    } catch (error) {
      console.error("Error al obtener las canciones:", error);
    }
  };

  const handleDeleteSong = async (id) => {
    try {
      await API.delete(`/songs/${id}`);
      setSongs((prevSongs) => prevSongs.filter((song) => song._id !== id));
    } catch (error) {
      console.error("Error al eliminar la canción:", error);
    }
  };

  const handleDeleteAlbum = async (id) => {
    try {
      await API.delete(`/albums/${id}`);
      setAlbums((prevAlbums) => prevAlbums.filter((album) => album._id !== id));
    } catch (error) {
      console.error("Error al eliminar el álbum:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirm) return;

    try {
      await API.delete(`/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert("Hubo un error al eliminar el usuario");
    }
  };

  const handleUpdateSong = async (id, updatedData) => {
    try {
      const config = updatedData instanceof FormData
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : {};

      const res = await API.put(`/songs/${id}`, updatedData, config);

      setSongs((prevSongs) =>
        prevSongs.map((song) =>
          song._id === id ? res.data.song : song
        )
      );
    } catch (error) {
      console.error("Error al actualizar la canción:", error);
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
                    <AlbumCardEdit album={album} onDelete={handleDeleteAlbum} />
                  </li>
                ))}
              </ul>
            ) : view === 'songs' && songs.length > 0 ? (
              <ul className='songsList'>
                {songs.map((song) => (
                  <li key={song._id}>
                    <SongCardEdit song={song} onDelete={handleDeleteSong} onUpdate={handleUpdateSong} />
                  </li>
                ))}
              </ul>
            ) : view === 'usuarios' && users.length > 0 ? (
              <ul className='usersList'>
                {users.map((user) => (
                  <li key={user._id}>
                    <CardUser user={user} onClickDelete={() => handleDeleteUser(user._id)} />
                  </li>
                ))}
              </ul>
            ) : view === 'createAlbum' ? (
              <CreateAlbumForm />
            ) : view === 'createSong' ? (
              <FormCreateSong />
            ) : (
              <p>Selecciona una opción para ver los datos</p>
            )}
          </section>
        </main>
      ) : null}
    </div>
  );
};

export default PanelAdmin;
