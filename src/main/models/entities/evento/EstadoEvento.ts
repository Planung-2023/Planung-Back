import { Asistente } from "../asistencia/Asistente";
import { PosibleEstadoEvento } from "./PosibleEstadoEvento";

export class EstadoEvento {

	private id: number;
	private fechaHora: Date;
	private posibleEstadoEvento: PosibleEstadoEvento;
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
