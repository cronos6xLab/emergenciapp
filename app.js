/* ============================================
   EMERGENCY ID - SISTEMA DE EMERGENCIA MÉDICA
   JavaScript Funcionalidad Completa
   ============================================ */

// ============================================
// CONFIGURACIÓN DE DATOS DEL PACIENTE
// ============================================
// INSTRUCCIONES: Modifica estos datos con la 
// información de la persona registrada
// ============================================

const PATIENT_DATA = {
    // DATOS PERSONALES
    name: "Juan Pérez González",
    dob: "15/03/1985",
    age: "39 años",
    curp: "PEGJ850315HDFRZN05",
    nss: "12345678901",
    insurance: "IMSS + Seguro Privado GNP",
    preferredHospital: "Hospital General de México",
    
    // DATOS MÉDICOS CRÍTICOS
    bloodType: "O+",
    allergies: "Penicilina, Yodo, Nueces, Sulfas",
    medications: "Metformina 500mg (cada 12 hrs), Losartán 50mg (cada 24 hrs)",
    conditions: "Diabetes Tipo 2, Hipertensión Arterial",
    
    // NOTAS ADICIONALES
    additionalNotes: `• NO administrar morfina ni derivados opioides fuertes
• Contactar a médico familiar antes de procedimientos mayores
• Póliza de seguro vigente en guantera del auto
• Donador de órganos: SÍ (registrado en IMSS)
• Última hospitalización: Enero 2024 - Hospital General`,
    
    // CONTACTOS DE EMERGENCIA
    // Puedes agregar más contactos siguiendo el mismo formato
    contacts: [
        {
            name: "María González (Esposa)",
            phone: "5512345678",
            email: "maria.gonzalez@email.com",
            relationship: "Esposa"
        },
        {
            name: "Carlos González (Hijo)",
            phone: "5587654321",
            email: "carlos.gonzalez@email.com",
            relationship: "Hijo"
        },
        {
            name: "Dra. Ana Martínez (Médico Familiar)",
            phone: "5599998888",
            email: "dr.martinez@clinica.com",
            relationship: "Médico"
        }
        // Agregar más contactos aquí:
        // {
        //     name: "Nombre del Contacto",
        //     phone: "5511223344",
        //     email: "email@ejemplo.com",
        //     relationship: "Relación"
        // },
    ]
};

// ============================================
// VARIABLES GLOBALES
// ============================================

let currentLocation = null;
let accessStartTime = null;
let deviceInfo = null;

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Registrar hora de escaneo inmediatamente
    recordScanTime();
    
    // Obtener información del dispositivo
    getDeviceInfo();
    
    // Intentar obtener ubicación inicial
    getInitialLocation();
    
    // Actualizar hora en pantalla de inicio
    updateHomeScreenTime();
});

// ============================================
// FUNCIONES DE REGISTRO Y SEGUIMIENTO
// ============================================

function recordScanTime() {
    accessStartTime = new Date();
    const timeString = accessStartTime.toLocaleString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });
    
    // Actualizar en pantalla de inicio
    const scanTimeElement = document.getElementById('scan-time');
    if (scanTimeElement) {
        scanTimeElement.textContent = timeString;
    }
    
    // Guardar en registro de acceso
    const accessTimeElement = document.getElementById('access-time');
    if (accessTimeElement) {
        accessTimeElement.textContent = timeString;
    }
    
    console.log('🚨 EMERGENCIA - Acceso registrado:', timeString);
}

function getDeviceInfo() {
    deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        online: navigator.onLine
    };
    
    const deviceInfoString = `${deviceInfo.platform} | ${deviceInfo.screenSize} | ${deviceInfo.language.toUpperCase()}`;
    
    const deviceInfoElement = document.getElementById('device-info');
    if (deviceInfoElement) {
        deviceInfoElement.textContent = deviceInfoString;
    }
    
    console.log('📱 Dispositivo:', deviceInfo);
}

function updateHomeScreenTime() {
    // Actualizar cada segundo
    setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleString('es-MX', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const scanTimeElement = document.getElementById('scan-time');
        if (scanTimeElement && document.getElementById('home-screen').classList.contains('active')) {
            const dateString = now.toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            scanTimeElement.textContent = `${dateString} ${timeString}`;
        }
    }, 1000);
}

// ============================================
// ACTIVAR EMERGENCIA
// ============================================

function activateEmergency() {
    // Sonido de alerta (opcional - solo si el dispositivo lo permite)
    playAlertSound();
    
    // Cambiar pantalla
    document.getElementById('home-screen').classList.remove('active');
    document.getElementById('emergency-screen').classList.add('active');
    
    // Cargar datos del paciente
    loadPatientData();
    
    // Obtener ubicación precisa
    getPreciseLocation();
    
    // Registrar activación
    console.log('🚨 EMERGENCIA ACTIVADA - Datos médicos visibles');
    
    // Scroll al inicio
    window.scrollTo(0, 0);
    
    // Notificar si es posible
    if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200, 100, 400]);
    }
}

function playAlertSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 880;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio no disponible:', e);
    }
}

// ============================================
// CARGAR DATOS DEL PACIENTE
// ============================================

function loadPatientData() {
    // Datos personales
    setText('patient-name', PATIENT_DATA.name);
    setText('patient-dob', `${PATIENT_DATA.dob} (${PATIENT_DATA.age})`);
    setText('patient-curp', PATIENT_DATA.curp);
    setText('patient-nss', PATIENT_DATA.nss);
    setText('patient-insurance', PATIENT_DATA.insurance);
    setText('patient-hospital', PATIENT_DATA.preferredHospital);
    
    // Datos médicos críticos
    setText('blood-type', PATIENT_DATA.bloodType);
    setText('allergies', PATIENT_DATA.allergies);
    setText('medications', PATIENT_DATA.medications);
    setText('conditions', PATIENT_DATA.conditions);
    
    // Notas adicionales
    setText('additional-notes', PATIENT_DATA.additionalNotes.replace(/\n/g, '<br>'));
    
    // Cargar contactos dinámicamente
    loadContacts();
}

function setText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = text;
    }
}

function loadContacts() {
    const contactsList = document.getElementById('contacts-list');
    if (!contactsList) return;
    
    // Limpiar lista existente
    contactsList.innerHTML = '';
    
    // Generar contactos dinámicamente
    PATIENT_DATA.contacts.forEach((contact, index) => {
        const contactCard = createContactCard(contact, index + 1);
        contactsList.appendChild(contactCard);
    });
}

function createContactCard(contact, index) {
    const card = document.createElement('div');
    card.className = 'contact-card';
    
    const message = encodeURIComponent(
        `🚨 EMERGENCIA MÉDICA 🚨\n\n` +
        `Su ${contact.relationship} ${PATIENT_DATA.name} ha tenido un accidente.\n\n` +
        `📍 Ubicación: ${getLocationText()}\n` +
        `⏰ Hora: ${new Date().toLocaleString('es-MX')}\n\n` +
        `Datos médicos:\n` +
        `🩸 Tipo de sangre: ${PATIENT_DATA.bloodType}\n` +
        `⚠️ Alergias: ${PATIENT_DATA.allergies}\n\n` +
        `Por favor contacte lo antes posible.`
    );
    
    card.innerHTML = `
        <div class="contact-info">
            <h4>${contact.name}</h4>
            <p>📱 ${formatPhone(contact.phone)}</p>
            <p>✉️ ${contact.email}</p>
            <p>👤 ${contact.relationship}</p>
        </div>
        <div class="contact-actions">
            <a href="tel:${contact.phone}" class="btn-call">📞 Llamar</a>
            <a href="https://wa.me/52${contact.phone}?text=${message}" target="_blank" class="btn-whatsapp">💬 WhatsApp</a>
        </div>
    `;
    
    return card;
}

function formatPhone(phone) {
    // Formatear número mexicano: 55-1234-5678
    if (phone.length === 10) {
        return `${phone.slice(0, 2)}-${phone.slice(2, 6)}-${phone.slice(6)}`;
    }
    return phone;
}

// ============================================
// GEOLOCALIZACIÓN
// ============================================

function getInitialLocation() {
    if (!navigator.geolocation) {
        console.log('Geolocalización no soportada');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError,
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

function getPreciseLocation() {
    const locationAddress = document.getElementById('location-address');
    if (locationAddress) {
        locationAddress.textContent = 'Obteniendo ubicación precisa...';
    }
    
    if (!navigator.geolocation) {
        updateLocationDisplay({
            error: 'Geolocalización no soportada por este dispositivo'
        });
        return;
    }
    
    // Opciones de alta precisión
    const options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
    };
    
    navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError,
        options
    );
    
    // Intentar con IP como fallback
    getLocationByIP();
}

function handleLocationSuccess(position) {
    const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        timestamp: new Date(position.timestamp)
    };
    
    currentLocation = location;
    
    console.log('📍 Ubicación obtenida:', location);
    
    // Intentar obtener dirección con geocodificación inversa
    reverseGeocode(location.latitude, location.longitude);
    
    // Actualizar registro de escaneo
    updateScanLocation(location);
}

function handleLocationError(error) {
    console.error('Error de geolocalización:', error);
    
    let errorMessage = 'No se pudo obtener la ubicación precisa';
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = 'Permiso de ubicación denegado. Por favor habilite la ubicación en su navegador.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = 'Información de ubicación no disponible';
            break;
        case error.TIMEOUT:
            errorMessage = 'Tiempo de espera agotado. Intentando método alternativo...';
            break;
    }
    
    updateLocationDisplay({ error: errorMessage });
    
    // Intentar con IP
    getLocationByIP();
}

function getLocationByIP() {
    // Usar servicio de geolocalización por IP como fallback
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            if (data.latitude && data.longitude) {
                const location = {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    city: data.city,
                    region: data.region,
                    country: data.country_name,
                    source: 'IP'
                };
                
                if (!currentLocation) {
                    currentLocation = location;
                    updateLocationDisplay({
                        address: `${data.city}, ${data.region}, ${data.country}`,
                        coords: `${data.latitude.toFixed(6)}, ${data.longitude.toFixed(6)}`,
                        source: 'IP'
                    });
                    updateScanLocation(location);
                }
            }
        })
        .catch(error => {
            console.log('IP geolocation failed:', error);
        });
}

function reverseGeocode(lat, lon) {
    // Usar OpenStreetMap Nominatim para geocodificación inversa
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    
    fetch(url, {
        headers: {
            'User-Agent': 'EmergencyID-App/1.0'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.display_name) {
            const address = formatAddress(data);
            updateLocationDisplay({
                address: address,
                coords: `${lat.toFixed(6)}, ${lon.toFixed(6)}`,
                accuracy: currentLocation.accuracy 
                    ? `Precisión: ${Math.round(currentLocation.accuracy)} metros` 
                    : '',
                source: 'GPS'
            });
        }
    })
    .catch(error => {
        console.log('Geocodificación fallida:', error);
        updateLocationDisplay({
            address: `Coordenadas: ${lat.toFixed(6)}, ${lon.toFixed(6)}`,
            coords: `Lat: ${lat.toFixed(6)}, Lon: ${lon.toFixed(6)}`,
            source: 'GPS'
        });
    });
}

function formatAddress(data) {
    const addr = data.address;
    const parts = [];
    
    // Construir dirección en formato mexicano
    if (addr.road) parts.push(addr.road);
    if (addr.house_number) parts.push(`#${addr.house_number}`);
    if (addr.suburb || addr.neighbourhood) parts.push(addr.suburb || addr.neighbourhood);
    if (addr.city || addr.town || addr.village) parts.push(addr.city || addr.town || addr.village);
    if (addr.state) parts.push(addr.state);
    if (addr.postcode) parts.push(`CP: ${addr.postcode}`);
    
    return parts.join(', ') || data.display_name;
}

function updateLocationDisplay(data) {
    const addressElement = document.getElementById('location-address');
    const coordsElement = document.getElementById('location-coords');
    const timeElement = document.getElementById('location-time');
    
    if (addressElement) {
        addressElement.textContent = data.address || data.error || 'Ubicación no disponible';
        addressElement.style.color = data.error ? '#DC2626' : '#1E293B';
    }
    
    if (coordsElement) {
        coordsElement.textContent = data.coords || '';
    }
    
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = `📍 Capturado: ${now.toLocaleString('es-MX')} ${data.source ? `(${data.source})` : ''}`;
    }
}

function updateScanLocation(location) {
    const scanLocationElement = document.getElementById('scan-location');
    if (scanLocationElement) {
        const locationText = location.latitude 
            ? `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`
            : 'No disponible';
        scanLocationElement.textContent = locationText;
    }
}

function getLocationText() {
    if (!currentLocation) return 'Ubicación en proceso de obtención...';
    
    const addressElement = document.getElementById('location-address');
    if (addressElement && addressElement.textContent !== 'Obteniendo ubicación...') {
        return addressElement.textContent;
    }
    
    return `${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}`;
}

// ============================================
// ENVÍO DE MENSAJES DE EMERGENCIA
// ============================================

function sendEmergencyWhatsApp() {
    if (!currentLocation) {
        alert('Obteniendo ubicación... Por favor espere un momento e intente de nuevo.');
        getPreciseLocation();
        return;
    }
    
    const locationText = getLocationText();
    const timeText = new Date().toLocaleString('es-MX');
    
    // Mensaje para múltiples contactos
    const message = encodeURIComponent(
        `🚨🚨🚨 EMERGENCIA MÉDICA 🚨🚨🚨\n\n` +
        `Se ha detectado una emergencia con:\n` +
        `👤 ${PATIENT_DATA.name}\n` +
        `🩸 Tipo de sangre: ${PATIENT_DATA.bloodType}\n` +
        `⚠️ Alergias: ${PATIENT_DATA.allergies}\n\n` +
        `📍 UBICACIÓN DEL INCIDENTE:\n${locationText}\n\n` +
        `⏰ Hora del incidente: ${timeText}\n\n` +
        `Este mensaje fue generado automáticamente por el sistema de emergencia médica.`
    );
    
    // Abrir WhatsApp con mensaje predefinido
    // Nota: WhatsApp Web/API requiere número específico
    // Por ahora, mostramos instrucciones
    
    const whatsappUrl = `https://wa.me/?text=${message}`;
    
    // Mostrar modal con opciones
    showWhatsAppOptions(message);
}

function showWhatsAppOptions(message) {
    // Crear modal dinámico
    const modal = document.createElement('div');
    modal.className = 'whatsapp-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeWhatsAppModal()"></div>
        <div class="modal-content">
            <h3>📱 Enviar Alerta por WhatsApp</h3>
            <p>Seleccione un contacto de emergencia:</p>
            <div class="whatsapp-contacts">
                ${PATIENT_DATA.contacts.map(contact => `
                    <a href="https://wa.me/52${contact.phone}?text=${message}" 
                       target="_blank" 
                       class="whatsapp-contact-btn">
                        <span>💬</span>
                        <div>
                            <strong>${contact.name}</strong>
                            <small>${contact.relationship}</small>
                        </div>
                    </a>
                `).join('')}
            </div>
            <div class="modal-actions">
                <button onclick="copyToClipboard('${message}')" class="btn-copy">📋 Copiar mensaje</button>
                <button onclick="closeWhatsAppModal()" class="btn-close">Cerrar</button>
            </div>
        </div>
    `;
    
    // Agregar estilos del modal
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(4px);
        }
        .modal-content {
            position: relative;
            background: white;
            border-radius: 16px;
            padding: 24px;
            max-width: 90%;
            width: 400px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: modalSlide 0.3s ease;
        }
        @keyframes modalSlide {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .modal-content h3 {
            margin-bottom: 16px;
            color: #DC2626;
        }
        .whatsapp-contacts {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin: 16px 0;
        }
        .whatsapp-contact-btn {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
            background: #25D366;
            color: white;
            text-decoration: none;
            border-radius: 12px;
            transition: all 0.3s;
        }
        .whatsapp-contact-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(37, 211, 102, 0.4);
        }
        .whatsapp-contact-btn span {
            font-size: 24px;
        }
        .whatsapp-contact-btn strong {
            display: block;
        }
        .whatsapp-contact-btn small {
            opacity: 0.9;
        }
        .modal-actions {
            display: flex;
            gap: 12px;
            margin-top: 16px;
        }
        .btn-copy, .btn-close {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }
        .btn-copy {
            background: #3B82F6;
            color: white;
        }
        .btn-close {
            background: #E5E7EB;
            color: #374151;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
}

function closeWhatsAppModal() {
    const modal = document.querySelector('.whatsapp-modal');
    if (modal) {
        modal.remove();
    }
}

function copyToClipboard(text) {
    // Decodificar para copiar
    const decodedText = decodeURIComponent(text);
    navigator.clipboard.writeText(decodedText).then(() => {
        alert('📋 Mensaje copiado al portapapeles. Péguelo en WhatsApp.');
    }).catch(err => {
        console.error('Error al copiar:', err);
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = decodedText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('📋 Mensaje copiado al portapapeles');
    });
}

function sendEmergencySMS() {
    if (!currentLocation) {
        alert('Obteniendo ubicación... Por favor espere un momento.');
        return;
    }
    
    const locationText = getLocationText();
    const timeText = new Date().toLocaleString('es-MX');
    
    const message = 
        `EMERGENCIA MEDICA: ${PATIENT_DATA.name} ` +
        `Tipo sangre: ${PATIENT_DATA.bloodType}. ` +
        `Ubicacion: ${locationText}. ` +
        `Hora: ${timeText}`;
    
    // Intentar usar SMS: protocol
    const smsBody = encodeURIComponent(message);
    
    // Mostrar opciones
    const smsOptions = PATIENT_DATA.contacts.map(contact => 
        `<a href="sms:+52${contact.phone}?body=${smsBody}" class="sms-option">
            📱 ${contact.name} - ${formatPhone(contact.phone)}
        </a>`
    ).join('');
    
    const modal = document.createElement('div');
    modal.className = 'whatsapp-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="modal-content">
            <h3>📱 Enviar SMS de Emergencia</h3>
            <p>Mensaje predefinido:</p>
            <div class="sms-preview">${message}</div>
            <div class="sms-contacts">
                ${smsOptions}
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="btn-close" style="width:100%;margin-top:16px;">Cerrar</button>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent += `
        .sms-preview {
            background: #F3F4F6;
            padding: 12px;
            border-radius: 8px;
            margin: 12px 0;
            font-size: 14px;
            word-break: break-word;
        }
        .sms-contacts {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .sms-option {
            padding: 12px;
            background: #3B82F6;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            text-align: center;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
}

// ============================================
// UTILIDADES
// ============================================

// Guardar registro en localStorage para auditoría
function saveAccessLog() {
    const log = {
        timestamp: new Date().toISOString(),
        location: currentLocation,
        device: deviceInfo,
        patient: PATIENT_DATA.name
    };
    
    // Obtener logs existentes
    let logs = JSON.parse(localStorage.getItem('emergencyAccessLogs') || '[]');
    logs.push(log);
    
    // Guardar (limitar a últimos 100)
    if (logs.length > 100) logs = logs.slice(-100);
    localStorage.setItem('emergencyAccessLogs', JSON.stringify(logs));
    
    console.log('📝 Registro de acceso guardado:', log);
}

// Cerrar modales con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeWhatsAppModal();
    }
});

// Guardar log cuando se activa emergencia
document.addEventListener('emergencyActivated', saveAccessLog);

// ============================================
// INSTRUCCIONES PARA PERSONALIZACIÓN
// ============================================
console.log(`
╔══════════════════════════════════════════════════════════════╗
║           🚨 SISTEMA DE EMERGENCIA MÉDICA 🚨                 ║
║                                                              ║
║  Para personalizar esta aplicación:                          ║
║                                                              ║
║  1. Abre el archivo app.js                                   ║
║  2. Busca la sección CONFIGURACIÓN DE DATOS DEL PACIENTE     ║
║  3. Modifica los datos en el objeto PATIENT_DATA             ║
║  4. Para agregar más contactos, copia el formato existente   ║
║  5. Guarda los cambios                                       ║
║                                                              ║
║  Para publicar en GitHub Pages:                              ║
║  1. Crea un repositorio en GitHub                            ║
║  2. Sube estos archivos (index.html, styles.css, app.js)     ║
║  3. Ve a Settings > Pages                                      ║
║  4. Selecciona main branch y carpeta raíz                     ║
║  5. Tu app estará en: https://tuusuario.github.io/repo       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);
