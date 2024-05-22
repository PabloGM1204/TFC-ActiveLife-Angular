export interface Rutina {
    title: string,
    userUUID: string,
    exercises: any[],
    public: boolean,
    day: string,
    description: string,
    id?: any,
    activo?: boolean
}