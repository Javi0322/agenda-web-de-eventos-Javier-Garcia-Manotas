import { useEffect, useState } from 'react'
import './App.css'
import EventList from './components/EventList'
import EventDetail from './components/EventDetail'
import FavoritosView from './components/FavoritosView'

function App() {
  const [eventos, setEventos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas')

  const [eventoSeleccionado, setEventoSeleccionado] = useState(null)

  // "eventos" | "favoritos"
  const [vista, setVista] = useState('eventos')

  const [favoritos, setFavoritos] = useState([])

  useEffect(() => {
    setTimeout(() => {
      fetch('/eventos.json')
        .then((res) => res.json())
        .then((data) => {
          if (!data || data.length === 0) {
            setError('No hay eventos disponibles')
          } else {
            setEventos(data)
          }
          setCargando(false)
        })
        .catch(() => {
          setError('Error al cargar los eventos')
          setCargando(false)
        })
    }, 800)
  }, [])

  const anadirAFavoritos = (id) => {
    if (!favoritos.includes(id)) setFavoritos([...favoritos, id])
  }

  const quitarDeFavoritos = (id) => {
    setFavoritos(favoritos.filter((favId) => favId !== id))
  }

  const esFavorito = (id) => favoritos.includes(id)

  const irAEventos = () => {
    setVista('eventos')
    setEventoSeleccionado(null)
  }

  const irAFavoritos = () => {
    setVista('favoritos')
    setEventoSeleccionado(null)
  }

  // ---- UI común (cabecera) ----
  const Header = (
    <header className='header'>
      <div
        className='headerLeft'
        onClick={irAEventos}
        role='button'
        tabIndex={0}>
        <h1 className='title'>Agenda de eventos</h1>
      </div>

      <button className='iconBtn' onClick={irAFavoritos} title='Ver favoritos'>
        <span className='star'>★</span>
        <span className='badge'>{favoritos.length}</span>
      </button>
    </header>
  )

  // ---- Estados de carga / error ----
  if (cargando) {
    return (
      <div className='page'>
        <div className='container'>
          {Header}
          <div className='panel'>
            <p className='muted'>Cargando...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='page'>
        <div className='container'>
          {Header}
          <div className='panel'>
            <p className='error'>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  // ---- Vista DETALLE (cuando estás en eventos y seleccionas uno) ----
  if (vista === 'eventos' && eventoSeleccionado) {
    return (
      <div className='page'>
        <div className='container'>
          {Header}
          <EventDetail
            evento={eventoSeleccionado}
            onVolver={() => setEventoSeleccionado(null)}
            onAnadirFavorito={anadirAFavoritos}
            esFavorito={esFavorito}
          />
        </div>
      </div>
    )
  }

  // ---- Vista FAVORITOS (pantalla aparte) ----
  if (vista === 'favoritos') {
    return (
      <div className='page'>
        <div className='container'>
          {Header}
          <FavoritosView
            eventos={eventos}
            favoritos={favoritos}
            onQuitar={quitarDeFavoritos}
            onVolver={irAEventos}
            onVerDetalle={(evento) => {
              // Si quieres permitir entrar al detalle desde favoritos
              setVista('eventos')
              setEventoSeleccionado(evento)
            }}
          />
        </div>
      </div>
    )
  }

  // ---- Vista EVENTOS (principal) ----
  const texto = busqueda.toLowerCase()

  const eventosFiltrados = eventos.filter((e) => {
    const coincideTexto =
      e.titulo.toLowerCase().includes(texto) ||
      e.lugar.toLowerCase().includes(texto)

    const coincideCategoria = categoria === 'Todas' || e.categoria === categoria

    return coincideTexto && coincideCategoria
  })

  const categoriasUnicas = [
    'Todas',
    ...new Set(eventos.map((e) => e.categoria))
  ]

  return (
    <div className='page'>
      <div className='container'>
        {Header}

        <div className='panel'>
          <div className='filters'>
            <input
              className='input'
              type='text'
              placeholder='Buscar por título o lugar...'
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <select
              className='select'
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}>
              {categoriasUnicas.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <p className='muted'>
            Mostrando <strong>{eventosFiltrados.length}</strong> de{' '}
            <strong>{eventos.length}</strong> eventos
          </p>
        </div>

        <EventList
          eventosFiltrados={eventosFiltrados}
          onVerDetalle={setEventoSeleccionado}
        />
      </div>
    </div>
  )
}

export default App
