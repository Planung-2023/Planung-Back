import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PosibleEstadoRecurso } from "./PosibleEstadoRecurso";
import { Recurso } from "./Recurso";

@Entity({
	name: "recurso_estado",
})
export class EstadoRecurso {
	@PrimaryGeneratedColumn()
	id: string;

	@ManyToOne(() => PosibleEstadoRecurso)
	@JoinColumn({ name: "posible_estado_recurso_id" })
	posibleEstadoRecurso: PosibleEstadoRecurso;

	@ManyToOne(() => Recurso, recurso => recurso.estadosRecurso)
	@JoinColumn({ name: "recurso_id" })
	recurso: Recurso;

	@Column({ name: "fecha_hora", type: "date" })
	fechaHora: Date;

	constructor() {}

	public getPosibleEstadoRecuso(): PosibleEstadoRecurso {
		return this.posibleEstadoRecurso;
	}

	public setPosibleEstadoRecurso(
		posibleEstadoRecurso: PosibleEstadoRecurso
	): void {
		this.posibleEstadoRecurso = posibleEstadoRecurso;
	}

	public getRecurso(): Recurso {
		return this.recurso;
	}

	public setRecurso(recurso: Recurso): void {
		this.recurso = recurso;
	}

	public getFechaHora(): Date {
		return this.fechaHora;
	}

	public setFechaHora(fechaHora: Date) {
		this.fechaHora = fechaHora;
	}
}
