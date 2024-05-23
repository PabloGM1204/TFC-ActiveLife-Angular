export interface Cita {
    id: string,
    descripcion: string,
    fechaCita: any,
    fechaSolicitud: any,
    imagen: string,
    titulo: string,
    userUUID: string,
    clienteNombre?: string,
    encargadoUuid?: string,
    encargadoNombre?: string,
    estado?: string,
    respuesta?: string,
    clienteFoto?: string
}