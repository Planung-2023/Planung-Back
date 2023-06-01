import { Asistente } from "./Asistente";

export class Invitacion {
	constructor(
		private id: number,
		private asistente: Asistente,
		private fechaHoraEnvio: Date,
		private fechaHoraVisto: Date,
		private fechaHoraRespuesta: Date,
		private estaVisto: boolean,
		private estaAceptado: boolean
	) {}

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

	public getFechaHoraEnvio(): Date {
		return this.fechaHoraEnvio;
	}

	public setFechaHoraEnvio(fechaHoraEnvio: Date): void {
		this.fechaHoraEnvio = fechaHoraEnvio;
	}

	public getFechaHoraVisto(): Date {
		return this.fechaHoraVisto;
	}

	public setFechaHoraVisto(fechaHoraVisto: Date): void {
		this.fechaHoraVisto = fechaHoraVisto;
	}

	public getFechaHoraRespuesta(): Date {
		return this.fechaHoraRespuesta;
	}

	public setFechaHoraRespuesta(fechaHoraRespuesta: Date): void {
		this.fechaHoraRespuesta = fechaHoraRespuesta;
	}

	public getEstaVisto(): boolean {
		return this.estaVisto;
	}

	public setEstaVisto(estaVisto: boolean): void {
		this.estaVisto = estaVisto;
	}

	public isEstaAceptado(): boolean {
		return this.estaAceptado;
	}

	public setEstaAceptado(estaAceptado: boolean): void {
		this.estaAceptado = estaAceptado;
	}
}
