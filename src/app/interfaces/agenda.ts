import { Asignatura } from "./asignatura";

export interface Agenda {
    id?: string;
    asignatura?: Asignatura;
    titulo?: string;
    fecha?: Date;
    descripcion?: string;
}
