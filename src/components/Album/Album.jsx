

import './Album.css'

import React, { memo } from 'react'

const Album = memo(({album}) => {
  return (
    <article className='album-container'>
        <img className='portada_del_album' src={album.cover} alt="Foto de la portada"  />
        <h2 className='album_title'>{album.title}</h2>
    </article>
  )
})

export default Album