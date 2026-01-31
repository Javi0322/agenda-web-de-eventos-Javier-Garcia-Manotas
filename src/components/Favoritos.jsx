function Favoritos({ eventos, favoritos, onQuitar }) {
  const favoritosDetalle = eventos.filter((e) => favoritos.includes(e.id))

  return (
    <div className='panel' style={{ marginTop: '15px' }}>
      <h2 className='sectionTitle'>Favoritos</h2>

      {favoritosDetalle.length === 0 ? (
        <p className='meta'>No tienes favoritos todavía.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {favoritosDetalle.map((e) => (
            <li key={e.id} className='favItem'>
              <span>{e.titulo}</span>
              <button className='btn btnDanger' onClick={() => onQuitar(e.id)}>
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Favoritos
