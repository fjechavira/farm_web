export interface User {
    idUsuario: number;
    nombre: string;
    fechaCreacion: Date;
	usuario: string;
    password: string;
    idPerfil: number;
    estatus: number;
    records: number;
}

export interface AddUser {
    nombre: string | null;
    usuario: string | null;
    password: string | null;
    idPerfil: number | null;
}
