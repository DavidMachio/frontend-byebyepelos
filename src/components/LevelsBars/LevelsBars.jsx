import './LevelsBars.css'

const LevelsBars = ({ocultar}) => {
    return (
        <div className={`levelsbars ${ocultar}`}>
            <div className='bar primera'></div>
            <div className='bar segunda'></div>
            <div className='bar tercera'></div>
            <div className='bar cuarta'></div>
        </div>
    )
}

export default LevelsBars