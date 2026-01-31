function EventList({ eventosFiltrados, onVerDetalle }) {
  return (
    <ul className='grid'>
      {eventosFiltrados.map((evento) => (
        <li key={evento.id} className='card'>
          <div>
            <h3 className='cardTitle'>{evento.titulo}</h3>
            <p className='chip'>{evento.categoria}</p>
            <p className='meta'>
              <strong>Fecha:</strong> {evento.fecha}
              <br />
              <strong>Lugar:</strong> {evento.lugar}
            </p>
          </div>

          <button className='btn' onClick={() => onVerDetalle(evento)}>
            Ver detalle
          </button>
        </li>
      ))}
    </ul>
  )
}

export default EventList
