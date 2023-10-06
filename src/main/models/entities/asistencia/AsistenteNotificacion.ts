import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Asistente } from "./Asistente";
import { Notificacion } from "./Notificacion";

@Entity({
	name: "asistente_notificacion",
})
export class AsistenteNotificacion {
	@PrimaryGeneratedColumn()
	id: string;

	@ManyToOne(() => Notificacion)
	@JoinColumn({ name: "notificacion_id" })
	notificacion: Notificacion;

	@ManyToOne(() => Asistente)
	@JoinColumn({ name: "asistente_id" })
	asistente: Asistente;

	@Column({ type: "boolean" })
	visto: boolean;

	@Column({ type: "date", nullable: true })
	fechaVisto?: Date;

	constructor() {}

	public getId(): string {
		return this.id;
	}

	public setId(id: string): void {
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

	public getFechaVisto(): Date | undefined {
		return this.fechaVisto;
	}

	public setFechaVisto(fechaVisto: Date): void {
		this.fechaVisto = fechaVisto;
	}
}
