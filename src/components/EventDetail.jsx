function EventDetail({ evento, onVolver, onAnadirFavorito, esFavorito }) {
  const yaEsFavorito = esFavorito(evento.id)

  return (
    <div className='panel'>
      <div className='panelHeader'>
        <h2 className='sectionTitle'>Detalle</h2>
        <button className='btn btnSecondary' onClick={onVolver}>
          ← Volver
        </button>
      </div>

      <h1 className='detailTitle'>{evento.titulo}</h1>

      <div className='detailMeta'>
        <span className='chip'>{evento.categoria}</span>
        <span className='mutedSmall'>{evento.fecha}</span>
        <span className='mutedSmall'>{evento.lugar}</span>
      </div>

      <p className='detailText'>{evento.descripcion}</p>

      <button
        className='btn'
        onClick={() => onAnadirFavorito(evento.id)}
        disabled={yaEsFavorito}>
        {yaEsFavorito ? 'En favoritos' : 'Añadir a favoritos'}
      </button>
    </div>
  )
}

export default EventDetail
