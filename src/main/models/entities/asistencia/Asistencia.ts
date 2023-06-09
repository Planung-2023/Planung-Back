import { Asistente } from "./Asistente";

export class Asistencia {

	private id: number;
	private asistente: Asistente;
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
