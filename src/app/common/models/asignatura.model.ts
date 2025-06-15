export interface Horario {
    dia: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado';
    horaInicio: string; // Formato "HH:mm", ej: "08:30"
    horaFin: string;    // Formato "HH:mm", ej: "10:00"
}

export interface Asignatura {
    id: string;                 // El ID único que le dará Firestore
    nombre: string;             // Ej: "Programación de Aplicaciones Móviles"
    seccion: string;            // Ej: "PGY4121-007D"
    profesorId: string;         // El UID del usuario con perfil "profesor"
    alumnosInscritos: string[]; // Una lista que contendrá los UIDs de los alumnos
    horario: Horario[];         // El horario de la clase
}