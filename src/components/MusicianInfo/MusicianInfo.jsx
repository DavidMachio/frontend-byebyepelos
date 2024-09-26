import './MusicianInfo.css'


const MusicianInfo = ({musico}) => {
    return (
        <article className="musico">
          <img className='musicianimg' src={musico?.foto} alt="" />
          <div className="infomusico">
            <h3>{musico.firstName}</h3>
            <h3>{musico.secondName}</h3>
          </div>
        </article>
    )
}

export default MusicianInfo