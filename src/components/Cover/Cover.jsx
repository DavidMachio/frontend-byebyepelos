import { memo } from 'react'
import './Cover.css'

const Cover = memo(({album}) => {
    return(
        <>
        <section id='cover' >
            {console.log('renderizando cover')
            }
            <img src={album.cover} alt="Portada del disco" />
            <div id='info-cover'>
                <h2 className='titlecover'>{album.title}</h2>
                <h4>{album.songs.length} canciones</h4>
                <h4>{album.year}</h4>
            </div>
            <div className='foto_fondo' style={{backgroundImage:`url(${album.cover})`, backgroundSize:'cover',backgroundPosition:'left'}}></div>
        </section>
        </>
    )
})

export default Cover