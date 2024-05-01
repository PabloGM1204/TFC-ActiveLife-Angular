export interface Cita {
    descripcion: string,
    fechaCita: any,
    fechaSolicitud: any,
    imagen: string,
    titulo: string,
    userUUID: string,
    encargadoUuid?: string,
    estado?: string,
    respuesta?: string
}