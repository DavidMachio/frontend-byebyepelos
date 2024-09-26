import { useState } from "react";
import "./Home.css";
import { useMusicContext } from "../../context/MusicContext";
import BarPlaying from "../../components/BarPlaying/BarPlaying";
import { NavLink } from "react-router-dom";

const Home = () => {





  
     const {cancion, playing, currentSong, selectedAlbum, viewPlayer } = useMusicContext()
 

  return (
    <main className="mainhome">
      <h1>ByeByePelos</h1>
      <div className="portada"></div>
      <article>
        <h4>BBP (abreviatura de ByeByePelos) es una formación musical que comenzó su andadura en 2008 cuando un grupo de amigos deciden reunirse para tocar música sin mas pretensión que la de verse y disfrutar con algo que les apasiona.</h4>
        <img src="https://res.cloudinary.com/drmbhl3f6/image/upload/v1722088140/Juan_C_Medrano_ltg535.jpg" alt="" />
      </article>
      <article>
        <img src="https://res.cloudinary.com/drmbhl3f6/image/upload/v1722087931/Paco_Salazar_ftnlo0.jpg" alt="" />
        <h4>Durante varios años y hasta el comienzo de 2020 desarrollamos un repertorio basado en versiones de blues, r&b, rock y pop; y también algunas composiciónes propias, en diversos clubs de Madrid. Entre ellos nos gustaría destacar el Café Casa Pueblo dónde durante aproximadamente dos años y medio disfrutamos del cariño de Arturo (promotor) y del heterogéneo público que visitaba este precioso bar del Barrio de las Letras en Madrid. </h4>
      </article>
      <img src="https://yourbutlerinmadrid.com/wp-content/uploads/2023/02/blog-YBIM-post-Barrio-de-las-Letras-01-opt.jpg" alt="" />
      <article>
        <h4>En estas actuaciones contamos con colaboraciones como las de Luismi Baladron, Manu Sirvent, Kike Rubio, Marina Hernandez o el Gran Wyoming... A todos les agradecemos su cariño y su buen hacer.  
        A partir de 2020 dedicamos toda nuestra atención al conjunto de grabaciones que en formato de disco puedes encontrar en esta web.</h4>
        <img src="https://res.cloudinary.com/drmbhl3f6/image/upload/v1722072728/Carlos_del_Soto_lirdgj.jpg" alt="" />
      </article>
      <p className="footer">Esperamos que te guste y que disfrutes tanto como lo hicimos nosotros interpretándolos.</p>
      
       {currentSong ? 
       <div className="cancionActual">
       <NavLink to={'/music'} className='navtomusic'>
       <BarPlaying
       song={currentSong}
       ocultar={!playing ? 'oculto' : ''}
       buttonsClass={'oculto'}
       classLevels={'levelsContainer'}
       funcionprev={() => playPrevSong(selectedAlbum, cancion)}
       playPause={playing ? '/pause.png' : '/play.png'}
       funcionPlay={() => selecCancion(cancion)}
       funcionnext={() => playNextSong(selectedAlbum, cancion)}
       funcion={() => selecCancion(currentSong || cancion)}
       playing={playing}
       />
     </NavLink>
 
</div> : <></>}
    
    </main>
  );
};

export default Home;
