import { useState } from 'react'
import './App.css'

const CORREO = 'arevaloyahir329@gmail.com'
const WHATSAPP = '523326496716'

const servicios = [
  {
    icono: '🥗',
    nombre: 'Consulta nutricional',
    descripcion:
      'Conoce tus hábitos, preferencias y objetivos para empezar con claridad.',
  },
  {
    icono: '📋',
    nombre: 'Plan personalizado',
    descripcion:
      'Recomendaciones flexibles y prácticas para tu rutina diaria.',
  },
  {
    icono: '💚',
    nombre: 'Seguimiento',
    descripcion:
      'Revisa tus avances y adapta tu plan con acompañamiento.',
  },
]

const planes = [
  {
    nombre: 'Consulta inicial',
    precio: '$650',
    descripcion: 'Un punto de partida para conocer tus objetivos.',
    incluye: [
      'Evaluación inicial',
      'Recomendaciones personalizadas',
      'Plan de acción práctico',
    ],
  },
  {
    nombre: 'Seguimiento',
    precio: '$450',
    descripcion: 'Acompañamiento para continuar avanzando.',
    destacado: true,
    incluye: [
      'Revisión de avances',
      'Ajustes al plan alimentario',
      'Resolución de dudas',
    ],
  },
  {
    nombre: 'Paquete bienestar',
    precio: '$1,450',
    descripcion: 'Tres sesiones para desarrollar hábitos sostenibles.',
    incluye: [
      '1 consulta inicial',
      '2 consultas de seguimiento',
      'Material educativo',
    ],
  },
]

const preguntas = [
  {
    pregunta: '¿Las consultas pueden ser en línea?',
    respuesta:
      'La modalidad presencial o en línea se confirmará al solicitar tu cita.',
  },
  {
    pregunta: '¿Necesito seguir una dieta estricta?',
    respuesta:
      'Nuestro enfoque prioriza hábitos flexibles y sostenibles.',
  },
  {
    pregunta: '¿Cómo puedo agendar una consulta?',
    respuesta:
      'Selecciona un plan, elige una fecha y horario preferidos y envía tu solicitud.',
  },
  {
    pregunta: '¿La cita queda confirmada automáticamente?',
    respuesta:
      'No. NutriEddy confirmará la disponibilidad antes de agendar definitivamente.',
  },
  {
    pregunta: '¿Los precios son definitivos?',
    respuesta:
      'Los precios mostrados son ilustrativos hasta que NutriEddy confirme sus tarifas.',
  },
]

function App() {
  const [servicioSeleccionado, setServicioSeleccionado] =
    useState('Consulta inicial')

  const [resena, setResena] = useState({
    nombre: '',
    estrellas: '5',
    comentario: '',
  })

  const [mensajeCita, setMensajeCita] = useState('')
  const [mensajeResena, setMensajeResena] = useState('')

  const agendar = (servicio = 'Consulta inicial') => {
    setServicioSeleccionado(servicio)

    document.getElementById('agendar')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  const abrirWhatsApp = (mensaje) => {
    const enlace =
      `https://wa.me/${WHATSAPP}?text=` +
      encodeURIComponent(mensaje)

    window.open(enlace, '_blank', 'noopener,noreferrer')
  }

  const enviarCorreo = (asunto, mensaje) => {
    const enlace =
      `mailto:${CORREO}` +
      `?subject=${encodeURIComponent(asunto)}` +
      `&body=${encodeURIComponent(mensaje)}`

    window.location.href = enlace
  }

  const crearMensajeCita = (datos) => {
    return `Hola, quiero solicitar una consulta en NutriEddy.

Nombre: ${datos.get('nombre')}
Correo: ${datos.get('correo')}
Servicio: ${servicioSeleccionado}
Fecha preferida: ${datos.get('fecha')}
Horario preferido: ${datos.get('horario')}
Comentarios: ${datos.get('comentarios') || 'Sin comentarios'}

Quedo pendiente de confirmación.`
  }

  const enviarSolicitud = (event) => {
    event.preventDefault()

    const datos = new FormData(event.currentTarget)
    const mensaje = crearMensajeCita(datos)

    enviarCorreo('Solicitud de consulta NutriEddy', mensaje)

    setMensajeCita(
      'Se preparó tu solicitud. Debes enviarla desde tu aplicación de correo.'
    )
  }

  const enviarSolicitudWhatsApp = () => {
    const formulario = document.getElementById('formulario-cita')

    if (!formulario) return

    if (!formulario.reportValidity()) return

    const datos = new FormData(formulario)
    const mensaje = crearMensajeCita(datos)

    abrirWhatsApp(mensaje)

    setMensajeCita(
      'Se abrió WhatsApp con tu solicitud. Presiona Enviar para completar el proceso.'
    )
  }

  const enviarResena = (event) => {
    event.preventDefault()

    const mensaje = `Nueva reseña para NutriEddy.

Nombre: ${resena.nombre}
Calificación: ${resena.estrellas} estrellas
Comentario: ${resena.comentario}

Solicito que esta reseña sea revisada antes de publicarse.`

    enviarCorreo('Reseña NutriEddy', mensaje)

    setMensajeResena(
      'Se preparó tu reseña. Envíala desde tu aplicación de correo.'
    )
  }

  return (
    <main className="nutri-page">

      {/* MENÚ */}

      <header className="nutri-header">
        <div className="nutri-container nutri-nav">

          <a href="#inicio" className="nutri-logo">
            nutri<span>eddy</span>.
          </a>

          <nav className="nutri-links">
            <a href="#servicios">Servicios</a>
            <a href="#enfoque">Enfoque</a>
            <a href="#precios">Precios</a>
            <a href="#resenas">Reseñas</a>
            <a href="#preguntas">Preguntas</a>
          </nav>

          <button
            className="nutri-button"
            onClick={() => agendar()}
          >
            Agendar consulta →
          </button>

        </div>
      </header>


      {/* INICIO */}

      <section className="nutri-container nutri-hero" id="inicio">

        <div>
          <span className="nutri-label">
            NUTRICIÓN CONSCIENTE · A TU RITMO
          </span>

          <h1>
            Aliméntate mejor.
            <br />
            <em>Vive a tu ritmo.</em>
          </h1>

          <p className="nutri-description">
            Una experiencia de nutrición cercana, flexible y
            personalizada. Construye hábitos sostenibles que
            se adapten a tu vida, no al revés.
          </p>

          <div className="nutri-actions">

            <button
              className="nutri-button"
              onClick={() => agendar()}
            >
              Agenda tu consulta →
            </button>

            <a href="#precios" className="nutri-outline">
              Conoce los precios
            </a>

          </div>

          <p className="nutri-description">
            ✓ Atención personalizada
            &nbsp;&nbsp;
            ✓ Sin dietas extremas
          </p>
        </div>

        <img
          className="nutri-photo"
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200"
          alt="Plato con alimentos saludables"
        />

      </section>


      {/* SERVICIOS */}

      <section className="nutri-section nutri-soft" id="servicios">
        <div className="nutri-container">

          <div className="nutri-center">
            <span className="nutri-label">SERVICIOS</span>
            <h2>Tu bienestar, a tu manera.</h2>
            <p className="nutri-subtitle">
              Acompañamiento para cada etapa de tu proceso.
            </p>
          </div>

          <div className="nutri-grid">

            {servicios.map((servicio) => (
              <article className="nutri-card" key={servicio.nombre}>

                <div className="nutri-icon">
                  {servicio.icono}
                </div>

                <h3>{servicio.nombre}</h3>

                <p>{servicio.descripcion}</p>

                <button
                  className="nutri-button"
                  onClick={() => agendar()}
                >
                  Solicitar información →
                </button>

              </article>
            ))}

          </div>
        </div>
      </section>


      {/* ENFOQUE */}

      <section className="nutri-section" id="enfoque">
        <div className="nutri-container">

          <span className="nutri-label">
            NUESTRO ENFOQUE
          </span>

          <h2>Nutrición real para una vida real.</h2>

          <p className="nutri-description">
            Sin reglas imposibles ni promesas milagrosas.
            Queremos ayudarte a construir una relación saludable
            con la alimentación mediante hábitos sostenibles.
          </p>

          <ul className="nutri-list">
            <li>Objetivos realistas y personalizados.</li>
            <li>Educación alimentaria sin juicios.</li>
            <li>Acompañamiento y ajustes a tu ritmo.</li>
          </ul>

        </div>
      </section>


      {/* PRECIOS */}

      <section className="nutri-section nutri-soft" id="precios">
        <div className="nutri-container">

          <div className="nutri-center">
            <span className="nutri-label">
              PLANES Y PRECIOS
            </span>

            <h2>Elige cómo empezar.</h2>

            <p className="nutri-subtitle">
              Precios ilustrativos en MXN, pendientes de confirmar.
            </p>
          </div>

          <div className="nutri-grid">

            {planes.map((plan) => (
              <article
                key={plan.nombre}
                className={
                  'nutri-card ' +
                  (plan.destacado ? 'nutri-featured' : '')
                }
              >

                <h3>{plan.nombre}</h3>

                <p>{plan.descripcion}</p>

                <div className="nutri-price">
                  {plan.precio}
                  <small style={{ fontSize: 12 }}> MXN</small>
                </div>

                <ul className="nutri-list">
                  {plan.incluye.map((elemento) => (
                    <li key={elemento}>{elemento}</li>
                  ))}
                </ul>

                <button
                  className="nutri-button"
                  onClick={() => agendar(plan.nombre)}
                >
                  Elegir plan →
                </button>

              </article>
            ))}

          </div>
        </div>
      </section>


      {/* AGENDA */}

      <section className="nutri-section" id="agendar">
        <div className="nutri-container">

          <div className="nutri-center">
            <span className="nutri-label">
              AGENDA TU CONSULTA
            </span>

            <h2>Tu primer paso empieza aquí.</h2>

            <p className="nutri-subtitle">
              Elige una fecha y horario preferidos.
              NutriEddy confirmará la disponibilidad.
            </p>
          </div>

          <form
            id="formulario-cita"
            className="nutri-form"
            onSubmit={enviarSolicitud}
            style={{
              maxWidth: 650,
              margin: '40px auto 0',
            }}
          >

            <label>
              Nombre completo
              <input
                name="nombre"
                placeholder="Tu nombre"
                required
              />
            </label>

            <label>
              Correo electrónico
              <input
                name="correo"
                type="email"
                placeholder="tu@correo.com"
                required
              />
            </label>

            <label>
              Servicio
              <select
                name="servicio"
                value={servicioSeleccionado}
                onChange={(event) =>
                  setServicioSeleccionado(event.target.value)
                }
              >
                {planes.map((plan) => (
                  <option key={plan.nombre} value={plan.nombre}>
                    {plan.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Fecha preferida
              <input
                name="fecha"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </label>

            <label>
              Horario preferido
              <select name="horario" required>
                <option value="">Selecciona un horario</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
              </select>
            </label>

            <label>
              Comentarios (opcional)
              <textarea
                name="comentarios"
                rows="3"
                placeholder="Cuéntanos brevemente qué necesitas"
              />
            </label>

            <button className="nutri-button" type="submit">
              📧 Solicitar por correo
            </button>

            <button
              className="nutri-button"
              type="button"
              onClick={enviarSolicitudWhatsApp}
              style={{
                background: '#25D366',
                marginLeft: 10,
              }}
            >
              💬 Solicitar por WhatsApp
            </button>

            <p className="nutri-subtitle" style={{ fontSize: 12 }}>
              Selecciona cómo enviar tu solicitud.
              La cita requiere confirmación de NutriEddy.
            </p>

            {mensajeCita && (
              <p role="status" className="nutri-subtitle">
                {mensajeCita}
              </p>
            )}

          </form>
        </div>
      </section>


      {/* RESEÑAS */}

      <section className="nutri-section nutri-soft" id="resenas">
        <div className="nutri-container">

          <div className="nutri-center">
            <span className="nutri-label">RESEÑAS</span>

            <h2>Experiencias que inspiran.</h2>

            <p className="nutri-subtitle">
              Este espacio mostrará opiniones reales y autorizadas
              de pacientes.
            </p>
          </div>

          <div className="nutri-grid">

            {[
              'Atención personalizada',
              'Hábitos sostenibles',
              'Acompañamiento cercano',
            ].map((titulo) => (
              <article className="nutri-card" key={titulo}>

                <div style={{ color: '#C7A36B' }}>
                  ☆☆☆☆☆
                </div>

                <h3>{titulo}</h3>

                <p>
                  Espacio para un testimonio verificado,
                  aún sin publicar.
                </p>

              </article>
            ))}

          </div>


          {/* FORMULARIO DE RESEÑAS */}

          <form
            className="nutri-form"
            onSubmit={enviarResena}
            style={{
              maxWidth: 650,
              margin: '40px auto 0',
            }}
          >

            <h3>Comparte tu experiencia</h3>

            <p className="nutri-subtitle">
              Tu opinión será revisada antes de publicarse.
              Evita incluir información médica privada.
            </p>

            <label>
              Tu nombre
              <input
                required
                value={resena.nombre}
                onChange={(event) =>
                  setResena({
                    ...resena,
                    nombre: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Calificación
              <select
                value={resena.estrellas}
                onChange={(event) =>
                  setResena({
                    ...resena,
                    estrellas: event.target.value,
                  })
                }
              >
                <option value="5">⭐⭐⭐⭐⭐ 5 estrellas</option>
                <option value="4">⭐⭐⭐⭐ 4 estrellas</option>
                <option value="3">⭐⭐⭐ 3 estrellas</option>
                <option value="2">⭐⭐ 2 estrellas</option>
                <option value="1">⭐ 1 estrella</option>
              </select>
            </label>

            <label>
              Tu reseña
              <textarea
                required
                minLength={10}
                rows="4"
                placeholder="Cuéntanos cómo fue tu experiencia"
                value={resena.comentario}
                onChange={(event) =>
                  setResena({
                    ...resena,
                    comentario: event.target.value,
                  })
                }
              />
            </label>

            <button className="nutri-button" type="submit">
              Enviar reseña para revisión →
            </button>

            {mensajeResena && (
              <p role="status" className="nutri-subtitle">
                {mensajeResena}
              </p>
            )}

          </form>

        </div>
      </section>


      {/* PREGUNTAS FRECUENTES */}

      <section className="nutri-section" id="preguntas">
        <div className="nutri-container">

          <div className="nutri-center">
            <span className="nutri-label">
              PREGUNTAS FRECUENTES
            </span>

            <h2>Resolvemos tus dudas.</h2>

            <p className="nutri-subtitle">
              Todo lo que necesitas saber antes de tu consulta.
            </p>
          </div>

          <div
            style={{
              maxWidth: 750,
              margin: '40px auto',
              display: 'grid',
              gap: 12,
            }}
          >

            {preguntas.map((item) => (
              <details className="nutri-card" key={item.pregunta}>

                <summary
                  style={{
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  {item.pregunta}
                </summary>

                <p>{item.respuesta}</p>

              </details>
            ))}

          </div>
        </div>
      </section>


      {/* CONTACTO */}

      <section
        style={{
          background: '#294C35',
          color: 'white',
          textAlign: 'center',
          padding: '70px 20px',
        }}
      >

        <h2>Tu bienestar merece un comienzo.</h2>

        <p>
          Empieza con hábitos que funcionen para ti.
        </p>

        <div className="nutri-actions" style={{ justifyContent: 'center' }}>

          <button
            className="nutri-button"
            style={{
              background: 'white',
              color: '#294C35',
            }}
            onClick={() => agendar()}
          >
            Agendar consulta →
          </button>

          <button
            className="nutri-button"
            style={{ background: '#25D366' }}
            onClick={() =>
              abrirWhatsApp(
                'Hola, quiero información sobre las consultas de NutriEddy.'
              )
            }
          >
            💬 WhatsApp
          </button>

        </div>

        <p style={{ marginTop: 25 }}>
          📱 33 2649 6716
          <br />
          📧 {CORREO}
        </p>

      </section>


      {/* FOOTER */}

      <footer className="nutri-footer">

        <h3>nutrieddy.</h3>

        <p>Nutrición consciente, a tu ritmo.</p>

        <small>
          Prototipo de demostración · Precios y datos
          profesionales pendientes de confirmar.
        </small>

      </footer>

    </main>
  )
}

export default App