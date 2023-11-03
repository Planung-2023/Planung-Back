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
import { TipoInvitacion } from "../asistencia/TipoInvitacion";
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

    @Column({ name: "fecha", type: "date" })
    fecha: Date;

    @Column({ name: "hora_inicio", type: "time" })
    horaInicio: Date;

    @Column({ name: "hora_fin", type: "time", nullable: true })
    horaFin: Date;

    @OneToMany(() => EstadoEvento, (estadoEvento) => estadoEvento.evento, { nullable: true })
    estadoEvento: EstadoEvento;

    @OneToOne(() => Evento, { nullable: true })
    @JoinColumn({ name: "evento_anterior_id" })
    eventoAnterior: Evento;

    @OneToMany(() => Asistente, (asistente) => asistente.evento)
    asistentes: Asistente[];

    @Column({ name: "es_visible", type: "boolean", default: false })
    esVisible: boolean;

    @Column({ name: "tipo_evento", type: "varchar", length: 255, nullable: true })
    tipoEvento: string;

    @OneToOne(() => Asistente)
    @JoinColumn({ name: "presentador_asistente_id" })
    presentador?: Asistente;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "usuario_id", referencedColumnName: "id" })
    creador: Usuario;

    @Column({ name: "tipo_invitacion", type: "varchar", length: 100 })
    tipoInvitacion: TipoInvitacion;

    @Column({ name: "descripcion", type: "varchar", length: 255, nullable: true })
    descripcion: string;

    constructor() {}

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
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

    public getFecha(): Date {
        return this.fecha;
    }
    public setFecha(fecha: Date): void {
        this.fecha = fecha;
    }

    public getHoraInicio(): Date {
        return this.horaInicio;
    }
    public setHoraInicio(hora: Date): void {
        this.horaInicio = hora;
    }

    public getHoraFin(): Date {
        return this.horaFin;
    }
    public setHoraFin(hora: Date): void {
        this.horaFin = hora;
    }

    public getTipoInvitacion(): TipoInvitacion {
        return this.tipoInvitacion;
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

    public setDescripcion(descripcion: string) {
        this.descripcion = descripcion;
    }
    public setTipoEvento(tipoEvento: string) {
        this.tipoEvento = tipoEvento;
    }
    public setTipoInvitacion(tipoInvitacion: TipoInvitacion) {
        this.tipoInvitacion = tipoInvitacion;
    }
}
