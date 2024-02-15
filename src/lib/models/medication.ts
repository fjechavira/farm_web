export interface Medication {
    idMedicamento: number;
    nombre: string;
    concentracion: string;
    idFormaFarmaceutica: number;
    nombreForma: string;
    precio: number;
    stock: number;
    presentacion: string;
    bhabilitado: number;
    records: number;
}

export interface AddMedication {
    nombre: string | null;
    concentracion: string | null;
    idFormaFarmaceutica: number | null;
    precio: number | null;
    stock: number | null;
    presentacion: string | null;
}

export interface PharmaceuticalForm {
    idFormaFarmaceutica: number;
    nombre: string;
    habilitado: number;
}

export interface UpdateMedication {
    nombre: string;
    concentracion: string;
    idFormaFarmaceutica: number;
    precio: number;
    stock: number;
    presentacion: string;
    bhabilitado: number;
}