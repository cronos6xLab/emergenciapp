"use client"

import { useState, useEffect, useRef } from "react"

/* ============================================================
   ██████╗  █████╗ ████████╗ ██████╗ ███████╗    ██████╗ ███████╗
   ██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔════╝    ██╔══██╗██╔════╝
   ██║  ██║███████║   ██║   ██║   ██║███████╗    ██║  ██║█████╗
   ██║  ██║██╔══██║   ██║   ██║   ██║╚════██║    ██║  ██║██╔══╝
   ██████╔╝██║  ██║   ██║   ╚██████╔╝███████║    ██████╔╝███████╗
   ╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝    ╚═════╝ ╚══════╝
   EMERGENCIA VIAL - DATOS DE LA PERSONA
   ============================================================

   🔴 INSTRUCCIONES PARA PERSONALIZAR ESTE ARCHIVO:

   1. Busca la sección "DATOS DE LA PERSONA" más abajo (~línea 80)
   2. Rellena cada campo con la información real de la persona
   3. Sube el archivo a un repositorio de GitHub Pages (un repo por persona)
   4. Genera un código QR con la URL de GitHub Pages
   5. Imprime el QR y pégalo en el casco, mochila o vehículo

   Formato del repositorio GitHub:
   - Nombre sugerido: emergencia-[nombre]-[apellido]
   - URL de GitHub Pages: https://[usuario].github.io/emergencia-[nombre]

   ============================================================ */

/* ============================================================
   ▼▼▼  DATOS DE LA PERSONA — EDITA AQUÍ  ▼▼▼
   ============================================================ */

const PERSONA = {
  // ── DATOS PERSONALES ──────────────────────────────────────
  nombre: "Juan Carlos",               // ← Nombre(s)
  apellidos: "Martínez López",         // ← Apellido(s)
  fechaNacimiento: "1990-05-14",       // ← YYYY-MM-DD
  edad: 35,                            // ← Edad en años
  sexo: "Masculino",                   // ← Masculino / Femenino / Otro
  curp: "MALJ900514HDFRRN09",          // ← CURP (opcional)
  nss: "12345678901",                  // ← Número de Seguridad Social (IMSS)
  foto: "",                            // ← URL de foto (opcional)

  // ── DATOS MÉDICOS CRÍTICOS ────────────────────────────────
  tipoSangre: "O+",                    // ← A+, A-, B+, B-, AB+, AB-, O+, O-
  alergias: [                          // ← Lista de alergias (vacío = ninguna)
    "Penicilina",
    "Aspirina",
    "Polen"
  ],
  medicamentos: [                      // ← Medicamentos que toma actualmente
    "Metformina 850mg (diabetes)",
    "Losartán 50mg (presión)"
  ],
  condicionesMedicas: [               // ← Enfermedades o condiciones
    "Diabetes tipo 2",
    "Hipertensión arterial"
  ],
  discapacidades: "",                  // ← Discapacidades físicas / sensoriales
  marcapaso: false,                    // ← true / false
  donadorOrganos: true,                // ← true / false
  notas_medicas: "Paciente con intolerancia a AINEs. En caso de dolor NO administrar ibuprofeno ni naproxeno.",

  // ── SEGURO MÉDICO ─────────────────────────────────────────
  seguroMedico: "IMSS",               // ← IMSS / ISSSTE / Seguro Popular / Privado / Ninguno
  numeroPoliza: "123456789",           // ← Número de póliza o afiliación
  hospitalAsignado: "Hospital General Dr. Enrique Cabrera, CDMX",

  // ── VEHÍCULO ──────────────────────────────────────────────
  tipoVehiculo: "Motocicleta",         // ← Moto / Bicicleta eléctrica / Scooter / Auto / etc.
  marcaVehiculo: "Honda",
  modeloVehiculo: "CB500F",
  colorVehiculo: "Rojo",
  placas: "ABC-1234",

  // ── CONTACTOS DE EMERGENCIA ───────────────────────────────
  // Agrega o quita contactos según necesites. Orden: más importante primero.
  contactos: [
    {
      nombre: "María López",                    // ← Nombre completo
      relacion: "Esposa",                        // ← Parentesco / Relación
      telefono: "5512345678",                    // ← 10 dígitos sin guiones
      whatsapp: "5512345678",                    // ← igual al teléfono o diferente
      email: "maria.lopez@email.com",            // ← Correo electrónico
    },
    {
      nombre: "Roberto Martínez",
      relacion: "Padre",
      telefono: "5598765432",
      whatsapp: "5598765432",
      email: "roberto.martinez@email.com",
    },
    {
      nombre: "Ana Martínez López",
      relacion: "Hermana",
      telefono: "5587654321",
      whatsapp: "5587654321",
      email: "ana.martinez@email.com",
    },
  ],

  // ── DIRECCIÓN DE CASA ─────────────────────────────────────
  domicilio: {
    calle: "Calle Morelos",
    numero: "245",
    colonia: "Del Valle Centro",
    alcaldia: "Benito Juárez",
    ciudad: "Ciudad de México",
    cp: "03100",
    referencias: "Entre Insurgentes y Eje 3 Sur, casa color beige"
  },
}

/* ============================================================
   ▲▲▲  FIN DE DATOS — NO MODIFIQUES MÁS ABAJO  ▲▲▲
   ============================================================ */

// Números de emergencia México / CDMX
const EMERGENCIAS_MX = [
  { nombre: "Emergencias (Único)", numero: "911", color: "#DC2626", icono: "🚨" },
  { nombre: "Cruz Roja", numero: "065", color: "#DC2626", icono: "🏥" },
  { nombre: "ERUM - CDMX", numero: "5556580001", color: "#B45309", icono: "🚑" },
  { nombre: "Bomberos CDMX", numero: "068", color: "#B45309", icono: "🚒" },
  { nombre: "Policía Preventiva CDMX", numero: "088", color: "#1D4ED8", icono: "👮" },
  { nombre: "Policía Federal Carreteras", numero: "800-0044800", color: "#1D4ED8", icono: "🛣️" },
  { nombre: "LOCATEL", numero: "5556581111", color: "#047857", icono: "📞" },
  { nombre: "CAPUFE - Carreteras", numero: "800-0023777", color: "#047857", icono: "🚧" },
  { nombre: "SSP CDMX (Seguridad)", numero: "5556580400", color: "#1D4ED8", icono: "🔵" },
  { nombre: "Línea Mujeres CDMX", numero: "800-0010-800", color: "#9333EA", icono: "👩" },
  { nombre: "DIF Nacional", numero: "800-0040800", color: "#D97706", icono: "💛" },
  { nombre: "Toxicología / Intoxicaciones", numero: "5556 88 91 45", color: "#DC2626", icono: "⚠️" },
]

export default function EmergencyApp() {
  const [vista, setVista] = useState<"inicio" | "datos" | "emergencias">("inicio")
  const [ubicacion, setUbicacion] = useState<{ lat: number; lng: number; direccion: string } | null>(null)
  const [cargandoUbi, setCargandoUbi] = useState(false)
  const [scanLog, setScanLog] = useState<{ hora: string; coords: string; direccion: string } | null>(null)
  const [mostrarInstrucciones, setMostrarInstrucciones] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const scanRegistrado = useRef(false)

  // Calcular edad desde fecha de nacimiento
  const calcularEdad = (fechaNac: string) => {
    const hoy = new Date()
    const nac = new Date(fechaNac)
    let edad = hoy.getFullYear() - nac.getFullYear()
    const m = hoy.getMonth() - nac.getMonth()
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--
    return edad
  }

  const edad = PERSONA.fechaNacimiento ? calcularEdad(PERSONA.fechaNacimiento) : PERSONA.edad

  // Obtener y registrar ubicación automáticamente al cargar
  useEffect(() => {
    if (scanRegistrado.current) return
    scanRegistrado.current = true

    const hora = new Date().toLocaleString("es-MX", {
      timeZone: "America/Mexico_City",
      dateStyle: "full",
      timeStyle: "medium",
    })

    if ("geolocation" in navigator) {
      setCargandoUbi(true)
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords
          let direccion = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=es`
            )
            const data = await res.json()
            if (data && data.display_name) {
              direccion = data.display_name
            }
          } catch {
            // fallback a coordenadas
          }

          setUbicacion({ lat: latitude, lng: longitude, direccion })
          setScanLog({ hora, coords: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`, direccion })
          setCargandoUbi(false)

          // Guardar en localStorage para registro
          const logs = JSON.parse(localStorage.getItem("emergencia_scans") || "[]")
          logs.push({ hora, lat: latitude, lng: longitude, direccion })
          localStorage.setItem("emergencia_scans", JSON.stringify(logs.slice(-50)))
        },
        () => {
          setScanLog({ hora, coords: "No disponible", direccion: "Ubicación no autorizada" })
          setCargandoUbi(false)
        },
        { timeout: 10000, maximumAge: 0 }
      )
    } else {
      setScanLog({ hora, coords: "No soportado", direccion: "Geolocalización no disponible" })
    }
  }, [])

  const generarMensajeEmergencia = () => {
    const dir = ubicacion?.direccion || "Ubicación no disponible"
    const mapsLink = ubicacion
      ? `https://maps.google.com/?q=${ubicacion.lat},${ubicacion.lng}`
      : ""
    const hora = scanLog?.hora || "Hora desconocida"

    return (
      `🚨 EMERGENCIA - ACCIDENTE DE TRÁNSITO 🚨\n\n` +
      `Se reporta que ${PERSONA.nombre} ${PERSONA.apellidos} ha tenido un ACCIDENTE.\n\n` +
      `📋 DATOS MÉDICOS:\n` +
      `• Tipo de Sangre: ${PERSONA.tipoSangre}\n` +
      `• Alergias: ${PERSONA.alergias.length > 0 ? PERSONA.alergias.join(", ") : "Ninguna conocida"}\n` +
      `• Condiciones: ${PERSONA.condicionesMedicas.length > 0 ? PERSONA.condicionesMedicas.join(", ") : "Ninguna"}\n` +
      `• Medicamentos: ${PERSONA.medicamentos.length > 0 ? PERSONA.medicamentos.join(", ") : "Ninguno"}\n\n` +
      `📍 UBICACIÓN DEL ACCIDENTE:\n${dir}\n` +
      (mapsLink ? `🗺️ Ver en mapa: ${mapsLink}\n` : "") +
      `⏰ Hora del reporte: ${hora}\n\n` +
      `📞 CONTACTOS DE EMERGENCIA:\n` +
      PERSONA.contactos.map((c, i) => `${i + 1}. ${c.nombre} (${c.relacion}): ${c.telefono}`).join("\n") +
      `\n\n⚠️ Por favor comuníquese de inmediato. Esta es una emergencia real.`
    )
  }

  const abrirWhatsApp = (telefono: string) => {
    const msg = encodeURIComponent(generarMensajeEmergencia())
    window.open(`https://wa.me/52${telefono}?text=${msg}`, "_blank")
  }

  const enviarSMS = (telefono: string) => {
    const msg = encodeURIComponent(generarMensajeEmergencia())
    window.open(`sms:${telefono}?body=${msg}`, "_blank")
  }

  const enviarEmail = (email: string) => {
    const msg = encodeURIComponent(generarMensajeEmergencia())
    window.open(
      `mailto:${email}?subject=${encodeURIComponent("🚨 EMERGENCIA - " + PERSONA.nombre + " " + PERSONA.apellidos)}&body=${msg}`,
      "_blank"
    )
  }

  const llamar = (numero: string) => {
    window.open(`tel:${numero}`, "_blank")
  }

  const copiarMensaje = () => {
    navigator.clipboard.writeText(generarMensajeEmergencia()).then(() => {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    })
  }

  const abrirMapa = () => {
    if (ubicacion) {
      window.open(`https://maps.google.com/?q=${ubicacion.lat},${ubicacion.lng}`, "_blank")
    }
  }

  // ─── VISTA INICIO ────────────────────────────────────────────────
  if (vista === "inicio") {
    return (
      <div style={s.page}>
        <div style={s.container}>
          {/* Header */}
          <div style={s.header}>
            <div style={s.pulseRing}>
              <div style={s.crossIcon}>✚</div>
            </div>
            <h1 style={s.headerTitle}>ID de Emergencia</h1>
            <p style={s.headerSubtitle}>Sistema de Respuesta Rápida para Accidentes</p>
          </div>

          {/* Registro de escaneo */}
          {scanLog && (
            <div style={s.scanCard}>
              <div style={s.scanCardTitle}>
                <span style={{ fontSize: 16 }}>📡</span> Escaneo registrado automáticamente
              </div>
              <p style={s.scanText}>🕐 {scanLog.hora}</p>
              <p style={s.scanText}>
                📍 {cargandoUbi ? "Obteniendo ubicación..." : scanLog.direccion}
              </p>
              {ubicacion && (
                <button style={s.mapBtn} onClick={abrirMapa}>
                  🗺️ Ver ubicación en Google Maps
                </button>
              )}
            </div>
          )}

          {/* BOTÓN PRINCIPAL DE EMERGENCIA */}
          <button style={s.emergencyBtn} onClick={() => setVista("datos")}>
            <span style={s.emergencyBtnIcon}>🚨</span>
            <span style={s.emergencyBtnText}>¡ESTO ES UNA EMERGENCIA!</span>
            <span style={s.emergencyBtnSub}>Presiona para ver datos de la persona</span>
          </button>

          {/* Instrucciones para quien escanea */}
          <div style={s.instructCard}>
            <button
              style={s.instructToggle}
              onClick={() => setMostrarInstrucciones(!mostrarInstrucciones)}
            >
              {mostrarInstrucciones ? "▲" : "▼"} ¿Qué hacer si encontraste este código QR?
            </button>
            {mostrarInstrucciones && (
              <div style={s.instructBody}>
                <div style={s.step}>
                  <div style={s.stepNum}>1</div>
                  <div>
                    <strong>Llama al 911</strong> de inmediato si hay heridos graves
                  </div>
                </div>
                <div style={s.step}>
                  <div style={s.stepNum}>2</div>
                  <div>
                    Presiona el botón rojo <strong>"¡ESTO ES UNA EMERGENCIA!"</strong> para ver los datos médicos de la persona
                  </div>
                </div>
                <div style={s.step}>
                  <div style={s.stepNum}>3</div>
                  <div>
                    Comparte la información con los <strong>paramédicos o servicios de emergencia</strong>
                  </div>
                </div>
                <div style={s.step}>
                  <div style={s.stepNum}>4</div>
                  <div>
                    Usa los botones de <strong>WhatsApp, SMS o llamada</strong> para avisar a los familiares
                  </div>
                </div>
                <div style={s.step}>
                  <div style={s.stepNum}>5</div>
                  <div>
                    La <strong>ubicación exacta</strong> ya fue registrada automáticamente al escanear
                  </div>
                </div>
                <div style={{ ...s.step, background: "#FEF3C7", borderRadius: 8, padding: "10px 12px", marginTop: 8 }}>
                  <div style={{ ...s.stepNum, background: "#D97706" }}>!</div>
                  <div style={{ fontSize: 13 }}>
                    NO muevas a la persona si sospechas lesión de columna. Espera a los paramédicos.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botón emergencias nacionales */}
          <button style={s.emerBtn} onClick={() => setVista("emergencias")}>
            📞 Números de Emergencia México / CDMX
          </button>

          {/* Footer */}
          <div style={s.footer}>
            <p style={s.footerText}>Sistema de Identificación de Emergencias Viales</p>
            <p style={{ ...s.footerText, opacity: 0.5, fontSize: 10, marginTop: 4 }}>
              Este código QR contiene datos médicos privados. Úselo solo en caso de emergencia.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ─── VISTA DATOS ─────────────────────────────────────────────────
  if (vista === "datos") {
    return (
      <div style={s.page}>
        <div style={s.container}>
          {/* Barra superior */}
          <div style={s.topBar}>
            <button style={s.backBtn} onClick={() => setVista("inicio")}>
              ← Volver
            </button>
            <div style={s.topBarBadge}>🚨 MODO EMERGENCIA</div>
          </div>

          {/* Nombre principal */}
          <div style={s.personHeader}>
            <div style={s.personAvatar}>
              {PERSONA.nombre.charAt(0)}{PERSONA.apellidos.charAt(0)}
            </div>
            <div>
              <h2 style={s.personName}>{PERSONA.nombre} {PERSONA.apellidos}</h2>
              <p style={s.personMeta}>{edad} años · {PERSONA.sexo}</p>
              {PERSONA.tipoVehiculo && (
                <p style={s.personMeta}>
                  🏍️ {PERSONA.tipoVehiculo} {PERSONA.marcaVehiculo} {PERSONA.modeloVehiculo} — Placas: {PERSONA.placas}
                </p>
              )}
            </div>
          </div>

          {/* TIPO DE SANGRE - DATO MÁS CRÍTICO */}
          <div style={s.bloodCard}>
            <div style={s.bloodIcon}>🩸</div>
            <div>
              <div style={s.bloodLabel}>TIPO DE SANGRE</div>
              <div style={s.bloodValue}>{PERSONA.tipoSangre}</div>
            </div>
            {PERSONA.marcapaso && (
              <div style={s.marcapasoBadge}>⚡ MARCAPASO</div>
            )}
          </div>

          {/* ALERGIAS */}
          {PERSONA.alergias.length > 0 && (
            <div style={s.alertCard}>
              <div style={s.alertTitle}>⚠️ ALERGIAS — NO ADMINISTRAR</div>
              <div style={s.tagRow}>
                {PERSONA.alergias.map((a, i) => (
                  <span key={i} style={s.tagAlert}>{a}</span>
                ))}
              </div>
            </div>
          )}

          {/* CONDICIONES MÉDICAS */}
          {PERSONA.condicionesMedicas.length > 0 && (
            <div style={s.infoCard}>
              <div style={s.cardTitle}>🏥 Condiciones Médicas</div>
              {PERSONA.condicionesMedicas.map((c, i) => (
                <div key={i} style={s.listItem}>• {c}</div>
              ))}
            </div>
          )}

          {/* MEDICAMENTOS */}
          {PERSONA.medicamentos.length > 0 && (
            <div style={s.infoCard}>
              <div style={s.cardTitle}>💊 Medicamentos Actuales</div>
              {PERSONA.medicamentos.map((m, i) => (
                <div key={i} style={s.listItem}>• {m}</div>
              ))}
            </div>
          )}

          {/* NOTAS MÉDICAS */}
          {PERSONA.notas_medicas && (
            <div style={{ ...s.infoCard, borderLeft: "4px solid #F59E0B" }}>
              <div style={s.cardTitle}>📋 Notas Importantes</div>
              <p style={{ fontSize: 14, color: "#374151", margin: 0 }}>{PERSONA.notas_medicas}</p>
            </div>
          )}

          {/* DONADOR DE ÓRGANOS */}
          {PERSONA.donadorOrganos && (
            <div style={s.donorCard}>
              <span style={{ fontSize: 22 }}>❤️</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>DONADOR DE ÓRGANOS</span>
            </div>
          )}

          {/* SEGURO MÉDICO */}
          <div style={s.infoCard}>
            <div style={s.cardTitle}>🏦 Seguro / Derechohabiencia</div>
            <div style={s.listItem}><strong>Institución:</strong> {PERSONA.seguroMedico}</div>
            {PERSONA.numeroPoliza && <div style={s.listItem}><strong>No. Póliza / Afiliación:</strong> {PERSONA.numeroPoliza}</div>}
            {PERSONA.hospitalAsignado && <div style={s.listItem}><strong>Hospital:</strong> {PERSONA.hospitalAsignado}</div>}
            {PERSONA.nss && <div style={s.listItem}><strong>NSS:</strong> {PERSONA.nss}</div>}
            {PERSONA.curp && <div style={s.listItem}><strong>CURP:</strong> {PERSONA.curp}</div>}
          </div>

          {/* UBICACIÓN ACTUAL */}
          <div style={{ ...s.infoCard, borderLeft: "4px solid #3B82F6" }}>
            <div style={s.cardTitle}>📍 Ubicación del Accidente</div>
            {cargandoUbi ? (
              <p style={{ color: "#6B7280", fontSize: 13 }}>Obteniendo ubicación GPS...</p>
            ) : ubicacion ? (
              <>
                <p style={{ fontSize: 13, color: "#374151", margin: "4px 0" }}>{ubicacion.direccion}</p>
                <p style={{ fontSize: 12, color: "#6B7280", margin: "2px 0" }}>
                  Coordenadas: {ubicacion.lat.toFixed(6)}, {ubicacion.lng.toFixed(6)}
                </p>
                <button style={s.mapBtn} onClick={abrirMapa}>
                  🗺️ Abrir en Google Maps
                </button>
              </>
            ) : (
              <p style={{ fontSize: 13, color: "#9CA3AF" }}>Ubicación no disponible</p>
            )}
          </div>

          {/* DOMICILIO */}
          <div style={s.infoCard}>
            <div style={s.cardTitle}>🏠 Domicilio de la Persona</div>
            <p style={{ fontSize: 14, color: "#374151", margin: "4px 0" }}>
              {PERSONA.domicilio.calle} #{PERSONA.domicilio.numero}, Col. {PERSONA.domicilio.colonia}
            </p>
            <p style={{ fontSize: 13, color: "#6B7280", margin: "2px 0" }}>
              {PERSONA.domicilio.alcaldia}, {PERSONA.domicilio.ciudad} — CP {PERSONA.domicilio.cp}
            </p>
            {PERSONA.domicilio.referencias && (
              <p style={{ fontSize: 12, color: "#9CA3AF", margin: "4px 0" }}>Ref: {PERSONA.domicilio.referencias}</p>
            )}
          </div>

          {/* ── CONTACTOS DE EMERGENCIA ────────────────────────── */}
          <div style={s.sectionTitle}>👥 Contactos de Emergencia</div>

          {PERSONA.contactos.map((contacto, idx) => (
            <div key={idx} style={s.contactCard}>
              <div style={s.contactHeader}>
                <div style={s.contactAvatar}>{contacto.nombre.charAt(0)}</div>
                <div>
                  <div style={s.contactName}>{contacto.nombre}</div>
                  <div style={s.contactRel}>{contacto.relacion}</div>
                </div>
                <button style={s.callBtn} onClick={() => llamar(contacto.telefono)}>
                  📞 Llamar
                </button>
              </div>
              <div style={s.contactActions}>
                <button
                  style={s.waBtn}
                  onClick={() => abrirWhatsApp(contacto.whatsapp || contacto.telefono)}
                >
                  <WhatsAppIcon /> WhatsApp
                </button>
                <button
                  style={s.smsBtn}
                  onClick={() => enviarSMS(contacto.telefono)}
                >
                  💬 SMS
                </button>
                {contacto.email && (
                  <button
                    style={s.emailBtn}
                    onClick={() => enviarEmail(contacto.email)}
                  >
                    ✉️ Email
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* MENSAJE AUTO-GENERADO */}
          <div style={s.sectionTitle}>📤 Mensaje Automático de Emergencia</div>
          <div style={s.msgCard}>
            <pre style={s.msgPre}>{generarMensajeEmergencia()}</pre>
            <button style={s.copyBtn} onClick={copiarMensaje}>
              {copiado ? "✅ ¡Copiado!" : "📋 Copiar mensaje completo"}
            </button>
          </div>

          {/* LLAMAR A EMERGENCIAS */}
          <button style={s.sos911} onClick={() => llamar("911")}>
            🚨 LLAMAR AL 911 — EMERGENCIAS
          </button>

          {/* Más números */}
          <button style={s.emerBtn} onClick={() => setVista("emergencias")}>
            📞 Ver todos los números de emergencia
          </button>

          {/* Registro */}
          {scanLog && (
            <div style={{ ...s.scanCard, marginTop: 16, fontSize: 12 }}>
              <div style={s.scanCardTitle}>📡 Registro del escaneo</div>
              <p style={s.scanText}>🕐 {scanLog.hora}</p>
              <p style={s.scanText}>📍 {scanLog.direccion}</p>
              <p style={{ ...s.scanText, opacity: 0.6 }}>Coordenadas: {scanLog.coords}</p>
            </div>
          )}

          <div style={{ ...s.footer, marginTop: 24 }}>
            <p style={s.footerText}>ID de Emergencia Vial · Datos cifrados localmente</p>
          </div>
        </div>
      </div>
    )
  }

  // ─── VISTA EMERGENCIAS ────────────────────────────────────────────
  return (
    <div style={s.page}>
      <div style={s.container}>
        <div style={s.topBar}>
          <button style={s.backBtn} onClick={() => setVista("inicio")}>
            ← Volver
          </button>
          <div style={s.topBarBadge}>📞 EMERGENCIAS</div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 4, textAlign: "center" }}>
          Números de Emergencia
        </h2>
        <p style={{ fontSize: 13, color: "#6B7280", textAlign: "center", marginBottom: 20 }}>
          México · CDMX · 2026
        </p>

        {EMERGENCIAS_MX.map((e, i) => (
          <button
            key={i}
            style={{ ...s.emergNumCard, borderLeft: `5px solid ${e.color}` }}
            onClick={() => llamar(e.numero)}
          >
            <div style={s.emergNumLeft}>
              <span style={{ fontSize: 22 }}>{e.icono}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{e.nombre}</div>
                <div style={{ fontSize: 13, color: e.color, fontWeight: 800 }}>{e.numero}</div>
              </div>
            </div>
            <div style={{ ...s.callTag, background: e.color }}>Llamar</div>
          </button>
        ))}

        <div style={{ ...s.footer, marginTop: 24 }}>
          <p style={s.footerText}>Toca cualquier número para llamar directamente</p>
        </div>
      </div>
    </div>
  )
}

// WhatsApp SVG Icon
function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 4 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* ────────────────────────────────────────────────
   ESTILOS EN LÍNEA — COMPATIBLE CON CUALQUIER
   SERVIDOR ESTÁTICO (GitHub Pages, etc.)
──────────────────────────────────────────────── */
const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
    padding: "12px 0 40px",
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  },
  container: {
    maxWidth: 520,
    margin: "0 auto",
    padding: "0 14px",
  },
  header: {
    textAlign: "center",
    padding: "32px 0 24px",
  },
  pulseRing: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "#DC2626",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    boxShadow: "0 0 0 0 rgba(220,38,38,0.4)",
    animation: "pulse 2s infinite",
  },
  crossIcon: {
    fontSize: 36,
    color: "#fff",
    fontWeight: 900,
    lineHeight: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 900,
    color: "#fff",
    margin: "0 0 6px",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#94A3B8",
    margin: 0,
  },
  scanCard: {
    background: "#1e3a2f",
    border: "1px solid #16a34a",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  scanCardTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#4ade80",
    marginBottom: 6,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  scanText: {
    fontSize: 12,
    color: "#86efac",
    margin: "2px 0",
  },
  emergencyBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #DC2626, #B91C1C)",
    color: "#fff",
    border: "none",
    borderRadius: 16,
    padding: "22px 20px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
    boxShadow: "0 8px 32px rgba(220,38,38,0.45)",
    transition: "transform 0.1s",
  },
  emergencyBtnIcon: { fontSize: 40 },
  emergencyBtnText: { fontSize: 22, fontWeight: 900, letterSpacing: -0.5 },
  emergencyBtnSub: { fontSize: 13, opacity: 0.85, fontWeight: 400 },

  instructCard: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  instructToggle: {
    width: "100%",
    background: "none",
    border: "none",
    color: "#93C5FD",
    fontSize: 13,
    fontWeight: 700,
    padding: "14px 16px",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  instructBody: {
    padding: "4px 16px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  step: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    fontSize: 13,
    color: "#CBD5E1",
  },
  stepNum: {
    minWidth: 26,
    height: 26,
    borderRadius: "50%",
    background: "#DC2626",
    color: "#fff",
    fontSize: 13,
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emerBtn: {
    width: "100%",
    background: "#1e293b",
    color: "#60A5FA",
    border: "1px solid #334155",
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: 12,
  },
  footer: {
    textAlign: "center",
    marginTop: 32,
  },
  footerText: {
    fontSize: 11,
    color: "#475569",
    margin: 0,
  },

  // ─── VISTA DATOS ───
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0 12px",
    marginBottom: 8,
  },
  backBtn: {
    background: "none",
    border: "1px solid #334155",
    color: "#94A3B8",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 13,
    cursor: "pointer",
  },
  topBarBadge: {
    background: "#DC2626",
    color: "#fff",
    borderRadius: 20,
    padding: "6px 14px",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0.5,
  },
  personHeader: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 16,
    padding: 16,
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  personAvatar: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#DC2626",
    color: "#fff",
    fontSize: 20,
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  personName: { fontSize: 20, fontWeight: 900, color: "#F1F5F9", margin: "0 0 4px" },
  personMeta: { fontSize: 12, color: "#94A3B8", margin: "1px 0" },

  bloodCard: {
    background: "linear-gradient(135deg, #7f1d1d, #991b1b)",
    border: "2px solid #DC2626",
    borderRadius: 16,
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
  },
  bloodIcon: { fontSize: 40 },
  bloodLabel: { fontSize: 11, color: "#FCA5A5", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" },
  bloodValue: { fontSize: 40, fontWeight: 900, color: "#fff", lineHeight: 1 },
  marcapasoBadge: {
    background: "#F59E0B",
    color: "#fff",
    borderRadius: 8,
    padding: "6px 10px",
    fontSize: 11,
    fontWeight: 800,
    marginLeft: "auto",
  },

  alertCard: {
    background: "#431407",
    border: "2px solid #EA580C",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: 800,
    color: "#FED7AA",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  tagAlert: {
    background: "#DC2626",
    color: "#fff",
    borderRadius: 20,
    padding: "4px 12px",
    fontSize: 12,
    fontWeight: 700,
  },

  infoCard: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 800,
    color: "#93C5FD",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  listItem: { fontSize: 14, color: "#CBD5E1", marginBottom: 4 },

  donorCard: {
    background: "#1a1a2e",
    border: "2px solid #ec4899",
    borderRadius: 12,
    padding: "12px 16px",
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "#f9a8d4",
    fontWeight: 700,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: 800,
    color: "#E2E8F0",
    marginBottom: 10,
    marginTop: 6,
    borderBottom: "2px solid #334155",
    paddingBottom: 8,
  },

  contactCard: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  contactHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#0369A1",
    color: "#fff",
    fontSize: 16,
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  contactName: { fontSize: 15, fontWeight: 700, color: "#F1F5F9" },
  contactRel: { fontSize: 12, color: "#64748B" },
  callBtn: {
    marginLeft: "auto",
    background: "#16A34A",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  contactActions: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  waBtn: {
    flex: 1,
    background: "#16A34A",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 8px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  smsBtn: {
    flex: 1,
    background: "#7C3AED",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 8px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },
  emailBtn: {
    flex: 1,
    background: "#0369A1",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 8px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },

  msgCard: {
    background: "#0f172a",
    border: "1px solid #1E40AF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  msgPre: {
    fontSize: 12,
    color: "#93C5FD",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    margin: "0 0 12px",
    fontFamily: "monospace",
    lineHeight: 1.6,
  },
  copyBtn: {
    width: "100%",
    background: "#1D4ED8",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "12px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },

  sos911: {
    width: "100%",
    background: "linear-gradient(135deg, #DC2626, #B91C1C)",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    padding: "18px",
    fontSize: 18,
    fontWeight: 900,
    cursor: "pointer",
    marginBottom: 12,
    letterSpacing: -0.5,
    boxShadow: "0 6px 24px rgba(220,38,38,0.4)",
  },

  mapBtn: {
    background: "#1D4ED8",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 8,
  },

  // ─── EMERGENCIAS ───
  emergNumCard: {
    width: "100%",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 12,
    padding: "14px 16px",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    textAlign: "left",
  },
  emergNumLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  callTag: {
    color: "#fff",
    borderRadius: 8,
    padding: "6px 12px",
    fontSize: 12,
    fontWeight: 800,
  },
}
