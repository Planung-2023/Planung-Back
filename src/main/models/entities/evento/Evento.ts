import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Asistente } from "../asistencia/Asistente";
import { Ubicacion } from "../otros/Ubicacion";
import { Usuario } from "../persona/Usuario";
import { Recurso } from "../recursos/Recurso";
import { EstadoEvento } from "./EstadoEvento";

@Entity({
    name: "evento",
})
export class Evento {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: "nombre", type: "varchar", length: 255 })
    nombre: string;

    @OneToMany(() => Recurso, (recurso) => recurso.evento)
    recursos: Recurso[];

    @OneToOne(() => Ubicacion)
    @JoinColumn({ name: "ubicacion_id" })
    ubicacion: Ubicacion;

    /*TODO: cambiar fecha hora por estas 3, hora fin puede ser null
		fecha: "",
		hora_inicio: ""
		# hora_fin: NULL
	*/

    @Column({ name: "fecha_hora", type: "datetime" })
    fechaHora: Date;

    @OneToMany(() => EstadoEvento, (estadoEvento) => estadoEvento.evento)
    estadoEvento: EstadoEvento;

    @OneToOne(() => Evento)
    @JoinColumn({ name: "evento_anterior_id" })
    eventoAnterior: Evento;

    @OneToMany(() => Asistente, (asistente) => asistente.evento)
    asistentes: Asistente[];

    @Column({ name: "es_visible", type: "boolean" })
    esVisible: boolean;

    @Column({ name: "tipo_evento", type: "varchar", length: 255 })
    tipoEvento: string;

    @OneToOne(() => Asistente)
    @JoinColumn({ name: "presentador_asistente_id" })
    presentador?: Asistente;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "usuario_id", referencedColumnName: "id" })
    creador: Usuario;

    // TODO: agregar descripcion evento
    // TODO: agregar tipo de invitacion (directo, aprobacion)

    constructor() {}

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getNombre(): String {
        return this.nombre;
    }

    public setNombre(nombre: String): void {
        this.nombre = nombre;
    }

    public getRecursos(): Recurso[] {
        return this.recursos;
    }

    public setRecursos(recursos: Recurso[]): void {
        this.recursos = recursos;
    }

    public getUbicacion(): Ubicacion {
        return this.ubicacion;
    }

    public setUbicacion(ubicacion: Ubicacion): void {
        this.ubicacion = ubicacion;
    }

    public getFechaHora(): Date {
        return this.fechaHora;
    }

    public setFechaHora(fechaHora: Date): void {
        this.fechaHora = fechaHora;
    }

    public getEstadoEvento(): EstadoEvento {
        return this.estadoEvento;
    }

    public setEstadoEvento(estadoEvento: EstadoEvento): void {
        this.estadoEvento = estadoEvento;
    }

    public getEventoAnterior(): Evento {
        return this.eventoAnterior;
    }

    public setEventoAnterior(eventoAnterior: Evento): void {
        this.eventoAnterior = eventoAnterior;
    }

    public getAsistentes(): Asistente[] {
        return this.asistentes;
    }

    public setAsistentes(asistentes: Asistente[]): void {
        this.asistentes = asistentes;
    }

    public getEsVisible(): boolean {
        return this.esVisible;
    }

    public setEsVisible(esVisible: boolean): void {
        this.esVisible = esVisible;
    }

    public getCreador(): Usuario {
        return this.creador;
    }

    public setCreador(creador: Usuario) {
        this.creador = creador;
    }
}
