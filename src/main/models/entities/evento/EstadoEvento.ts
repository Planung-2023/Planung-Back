import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Asistente } from "../asistencia/Asistente";
import { Evento } from "./Evento";
import { PosibleEstadoEvento } from "./PosibleEstadoEvento";

@Entity({
    name: "estado_evento",
})
export class EstadoEvento {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Evento)
    @JoinColumn({ name: "evento_id" })
    evento: Evento;

    @Column({ name: "fecha_hora", type: "date" })
    fechaHora: Date;

    @ManyToOne(() => PosibleEstadoEvento)
    @JoinColumn({ name: "posible_estado_evento_id" })
    posibleEstadoEvento: PosibleEstadoEvento;

    @ManyToOne(() => Asistente)
    @JoinColumn({ name: "asistente_cambio_estado_id" })
    asistenteCambioEstado: Asistente;

    constructor() {}

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getFechaHora(): Date {
        return this.fechaHora;
    }

    public setFechaHora(fechaHora: Date): void {
        this.fechaHora = fechaHora;
    }

    public getPosibleEstadoEvento(): PosibleEstadoEvento {
        return this.posibleEstadoEvento;
    }

    public setPosibleEstadoEvento(posibleEstadoEvento: PosibleEstadoEvento): void {
        this.posibleEstadoEvento = posibleEstadoEvento;
    }

    public getAsistenteCambioEstado(): Asistente {
        return this.asistenteCambioEstado;
    }

    public setAsistenteCambioEstado(asistenteCambioEstado: Asistente): void {
        this.asistenteCambioEstado = asistenteCambioEstado;
    }
}
