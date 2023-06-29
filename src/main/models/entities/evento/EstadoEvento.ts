import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Asistente } from "../asistencia/Asistente";
import { Evento } from "./Evento";
import { PosibleEstadoEvento } from "./PosibleEstadoEvento";

@Entity({
	name: "estado_evento"
})
export class EstadoEvento {
	@PrimaryColumn()
	private id: number;

	@ManyToOne(() => Evento)
	@JoinColumn({ name: "evento_id"})
	evento: Evento;

	@Column({ name: "fecha_hora", type: "date" })
	private fechaHora: Date;

	@ManyToOne(() => PosibleEstadoEvento)
	@JoinColumn({ name: "posible_estado_evento_id"})
	private posibleEstadoEvento: PosibleEstadoEvento;

	@ManyToOne(() => Asistente)
	@JoinColumn({ name: "asistente_cambio_estado_id"})
	private asistenteCambioEstado: Asistente;

	constructor() {}

	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
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

	public setPosibleEstadoEvento(
		posibleEstadoEvento: PosibleEstadoEvento
	): void {
		this.posibleEstadoEvento = posibleEstadoEvento;
	}

	public getAsistenteCambioEstado(): Asistente {
		return this.asistenteCambioEstado;
	}

	public setAsistenteCambioEstado(asistenteCambioEstado: Asistente): void {
		this.asistenteCambioEstado = asistenteCambioEstado;
	}
}
