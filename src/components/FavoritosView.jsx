function FavoritosView({
  eventos,
  favoritos,
  onQuitar,
  onVolver,
  onVerDetalle
}) {
  const favoritosDetalle = eventos.filter((e) => favoritos.includes(e.id))

  return (
    <div className='panel'>
      <div className='panelHeader'>
        <h2 className='sectionTitle'>Favoritos</h2>
        <button className='btn btnSecondary' onClick={onVolver}>
          ← Volver
        </button>
      </div>

      {favoritosDetalle.length === 0 ? (
        <p className='muted'>No tienes favoritos todavía.</p>
      ) : (
        <ul className='favList'>
          {favoritosDetalle.map((e) => (
            <li key={e.id} className='favItem'>
              <div className='favInfo'>
                <p className='favTitle'>{e.titulo}</p>
                <p className='mutedSmall'>
                  {e.categoria} · {e.fecha} · {e.lugar}
                </p>
              </div>

              <div className='favActions'>
                <button
                  className='btn btnSecondary'
                  onClick={() => onVerDetalle(e)}>
                  Ver
                </button>
                <button
                  className='btn btnDanger'
                  onClick={() => onQuitar(e.id)}>
                  Quitar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FavoritosView
