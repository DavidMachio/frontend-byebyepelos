

import './Album.css'

import React, { memo } from 'react'

const Album = memo(({album}) => {
  return (
    <article className='album-container'>
      {console.log('renderizando albums')
      }
        <img src={album.cover} alt="Foto de la portada"  />
        <h2>{album.title}</h2>
    </article>
  )
})

export default Album