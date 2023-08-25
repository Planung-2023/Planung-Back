import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Asistente } from "./Asistente";

@Entity({
	name: "asistencia",
})
export class Asistencia {
	@PrimaryGeneratedColumn()
	id: string;

	@OneToOne(() => Asistente)
	@JoinColumn({ name: "asistente_id" })
	asistente: Asistente;

	@Column({ name: "fecha_hora", type: "datetime" })
	fechaHora: Date;

	constructor() {}

	public getId(): string {
		return this.id;
	}

	public setId(id: string): void {
		this.id = id;
	}

	public getAsistente(): Asistente {
		return this.asistente;
	}

	public setAsistente(asistente: Asistente): void {
		this.asistente = asistente;
	}

	public getFechaHora(): Date {
		return this.fechaHora;
	}

	public setFechaHora(fechaHora: Date): void {
		this.fechaHora = fechaHora;
	}
}
