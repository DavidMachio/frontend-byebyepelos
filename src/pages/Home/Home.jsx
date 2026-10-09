import { useLayoutEffect, useRef } from "react";
import "./Home.css";
import { useMusicContext } from "../../context/MusicContext";
import BarPlaying from "../../components/BarPlaying/BarPlaying";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { cancion, playing, currentSong, selectedAlbum, viewPlayer } = useMusicContext();
  const mainRef = useRef(null);

  // Aparición suave al hacer scroll. Si no hay IntersectionObserver o la
  // persona prefiere menos movimiento, todo se ve desde el principio.
  useLayoutEffect(() => {
    const main = mainRef.current;
    if (!main || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    main.classList.add("js-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    main.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="mainhome" ref={mainRef}>
      <header className="home_hero" role="img" aria-label="Foto de ByeByePelos">
        <div className="home_hero_text">
          <h1>ByeByePelos</h1>
          <p>Formación musical · Madrid · desde 2008</p>
        </div>
      </header>

      <section className="timeline" aria-label="Nuestra historia">
        <article className="timeline_item reveal">
          <div className="timeline_text">
            <span className="timeline_year">2008</span>
            <h2>El comienzo</h2>
            <p>BBP (abreviatura de ByeByePelos) es una formación musical que comenzó su andadura en 2008 cuando un grupo de amigos deciden reunirse para tocar música sin mas pretensión que la de verse y disfrutar con algo que les apasiona.</p>
          </div>
          <img className="timeline_media" src="https://res.cloudinary.com/drmbhl3f6/image/upload/v1722088140/Juan_C_Medrano_ltg535.jpg" alt="Juan C. Medrano, de ByeByePelos" loading="lazy" />
        </article>

        <article className="timeline_item reveal">
          <div className="timeline_text">
            <span className="timeline_year">Hasta 2020</span>
            <h2>Los clubs de Madrid</h2>
            <p>Durante varios años y hasta el comienzo de 2020 desarrollamos un repertorio basado en versiones de blues, r&b, rock y pop; y también algunas composiciónes propias, en diversos clubs de Madrid. Entre ellos nos gustaría destacar el Café Casa Pueblo dónde durante aproximadamente dos años y medio disfrutamos del cariño de Arturo (promotor) y del heterogéneo público que visitaba este precioso bar del Barrio de las Letras en Madrid.</p>
          </div>
          <img className="timeline_media" src="https://res.cloudinary.com/drmbhl3f6/image/upload/v1722087931/Paco_Salazar_ftnlo0.jpg" alt="Paco Salazar, de ByeByePelos" loading="lazy" />
        </article>

        <figure className="timeline_item timeline_item--wide reveal">
          <img src="https://res.cloudinary.com/drmbhl3f6/image/upload/v1746111083/barrio_de_las_letras_j4rkqc.jpg" alt="Calle del Barrio de las Letras, en Madrid" loading="lazy" />
          <figcaption>Barrio de las Letras, Madrid</figcaption>
        </figure>

        <article className="timeline_item reveal">
          <div className="timeline_text">
            <span className="timeline_year">Desde 2020</span>
            <h2>Los discos</h2>
            <p>En estas actuaciones contamos con colaboraciones como las de Luismi Baladron, Manu Sirvent, Kike Rubio, Marina Hernandez o el Gran Wyoming... A todos les agradecemos su cariño y su buen hacer. A partir de 2020 dedicamos toda nuestra atención al conjunto de grabaciones que en formato de disco puedes encontrar en esta web.</p>
            <NavLink to="/music" className="home_cta">Escuchar los discos</NavLink>
          </div>
          <img className="timeline_media" src="https://res.cloudinary.com/drmbhl3f6/image/upload/v1722072728/Carlos_del_Soto_lirdgj.jpg" alt="Carlos del Soto, de ByeByePelos" loading="lazy" />
        </article>
      </section>

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
