import { Asistente } from "./Asistente";
import { Notificacion } from "./Notificacion";

export class AsistenteNotificacion {
	constructor(
		private id: number,
		private notificacion: Notificacion,
		private asistente: Asistente,
		private visto: boolean,
		private fechaVisto: Date
	) {}

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
