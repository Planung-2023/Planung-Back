import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Asistente } from "./Asistente";
import { Notificacion } from "./Notificacion";

Entity({
	name: "asistente_notificacion"
})
export class AsistenteNotificacion {
	@PrimaryColumn()
	private id: number;

	@ManyToOne(() => Notificacion)
	@JoinColumn({ name: "notificacion_id " })
	private notificacion: Notificacion;

	@ManyToOne(() => Asistente)
	@JoinColumn({ name: "asistente_id " })
	asistente: Asistente;

	@Column({ type: "boolean" })
	private visto: boolean;

	@Column({ type: "date" })
	private fechaVisto: Date;

	constructor() {}

	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
		this.id = id;
	}

	public getNotificacion(): Notificacion {
		return this.notificacion;
	}

	public setNotificacion(notificacion: Notificacion): void {
		this.notificacion = notificacion;
	}

	public getAsistente(): Asistente {
		return this.asistente;
	}

	public setAsistente(asistente: Asistente): void {
		this.asistente = asistente;
	}

	public getVisto(): boolean {
		return this.visto;
	}

	public setVisto(visto: boolean): void {
		this.visto = visto;
	}

	public getFechaVisto(): Date {
		return this.fechaVisto;
	}

	public setFechaVisto(fechaVisto: Date): void {
		this.fechaVisto = fechaVisto;
	}
}
