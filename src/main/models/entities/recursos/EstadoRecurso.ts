import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { PosibleEstadoRecurso } from "./PosibleEstadoRecurso";
import { Recurso } from "./Recurso";
import { JoinColumn } from "typeorm/browser";

@Entity({
	name: "recurso_estado"
})
export class EstadoRecurso {

	@PrimaryColumn()
	private id: number;

	@ManyToOne(() => PosibleEstadoRecurso)
	@JoinColumn({ name: 'recursoPosibleEstado_id', referencedColumnName: 'id' })
	private posibleEstadoRecurso: PosibleEstadoRecurso;

	@ManyToOne(() => Recurso, (recurso) => recurso.estadosRecurso)
	recurso: Recurso;

	@Column({ name: "fechaHora", type: "date" })
	private fechaHora: Date;

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
