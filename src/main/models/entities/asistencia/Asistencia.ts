import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Asistente } from "./Asistente";

@Entity({
		name: "asistencia",
	})
		

export class Asistencia {

	
	@PrimaryColumn()
	private id: number;

	@OneToOne(() => Asistente)
	@JoinColumn({name:"asistente_id"})
	private asistente: Asistente;

	@Column({name: "fecha_hora", type:Date})
	private fechaHora: Date

	constructor() {}

	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
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
