/* ============================================
   EMERGENCY ID - CONFIGURACIÓN DE PACIENTE
   ============================================
   
   INSTRUCCIONES:
   1. Modifica SOLO los valores entre comillas
   2. No borres las comas al final de cada línea
   3. Para contactos, puedes agregar más copiando el formato
   4. Guarda el archivo cuando termines
   
   ============================================ */

const PATIENT_CONFIG = {
    // ==========================================
    // DATOS PERSONALES
    // ==========================================
    name: "Juan Pérez González",           // Tu nombre completo
    dob: "15/03/1985",                   // Fecha de nacimiento DD/MM/AAAA
    age: "39 años",                      // Edad actual
    curp: "PEGJ850315HDFRZN05",          // CURP (18 caracteres)
    nss: "12345678901",                  // Número de Seguro Social IMSS
    insurance: "IMSS + Seguro Privado GNP",  // Seguro médico
    preferredHospital: "Hospital General de México",  // Hospital preferido
    
    // ==========================================
    // DATOS MÉDICOS CRÍTICOS (MÁS IMPORTANTES)
    // ==========================================
    bloodType: "O+",                     // Tipo de sangre: A+, A-, B+, B-, O+, O-, AB+, AB-
    allergies: "Penicilina, Yodo, Nueces, Sulfas",  // Alergias (separadas por comas)
    medications: "Metformina 500mg (cada 12 hrs), Losartán 50mg (cada 24 hrs)",  // Medicamentos actuales
    conditions: "Diabetes Tipo 2, Hipertensión Arterial",  // Condiciones médicas
    
    // ==========================================
    // NOTAS ADICIONALES IMPORTANTES
    // ==========================================
    additionalNotes: `• NO administrar morfina ni derivados opioides fuertes
• Contactar a médico familiar antes de procedimientos mayores
• Póliza de seguro vigente en guantera del auto
• Donador de órganos: SÍ (registrado en IMSS)
• Última hospitalización: Enero 2024 - Hospital General`,
    
    // ==========================================
    // CONTACTOS DE EMERGENCIA
    // ==========================================
    // Puedes agregar más contactos copiando el formato
    // IMPORTANTE: Teléfono debe tener 10 dígitos, sin espacios, sin +52
    
    contacts: [
        {
            name: "María González (Esposa)",      // Nombre y relación
            phone: "5512345678",                  // Teléfono: 10 dígitos, sin espacios
            email: "maria.gonzalez@email.com",    // Correo electrónico
            relationship: "Esposa"                // Relación: Esposa, Hijo, Médico, etc.
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
        // ==========================================
        // AGREGAR MÁS CONTACTOS AQUÍ
        // ==========================================
        // Copia desde aquí...
        // ,
        // {
        //     name: "Nombre del Contacto (Relación)",
        //     phone: "5511223344",
        //     email: "email@ejemplo.com",
        //     relationship: "Hermano"
        // }
        // ...hasta aquí y pega después del último contacto
    ]
};

// ============================================
// NO MODIFICAR NADA DEBAJO DE ESTA LÍNEA
// ============================================

// Convertir configuración al formato esperado por la app
const PATIENT_DATA = { ...PATIENT_CONFIG };

// Exportar para uso en la aplicación
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PATIENT_DATA, PATIENT_CONFIG };
}
